import jwt from 'jsonwebtoken';
import { promisify } from "util";
import mongoose from 'mongoose';
import db from "./../config/db.js";
import getMessage from "../helpers/getMessage.js";
import { logMessage } from "../helpers/logger.js";
import * as modelService from "./model_service.js";
import * as redis from "./../helpers/redis.js";
import { config } from '../config/config.js';
import { UserLogInDTO } from '../dto/user.js';
import { response } from '../helpers/response.js';

const signToken = async (data, expiresIn) => {
    return jwt.sign(data, config.jwt_encryption, { expiresIn });
};

export const verifyToken = async (token) => {
    try {
        return await promisify(jwt.verify)(token, config.jwt_encryption);
    } catch (error) {
        throw error;
    }
};

export const verifyFirebaseToken = async (req, res, model) => {
    const transaction = await mongoose.startSession();
    transaction.startTransaction();
    try {
        const { country_code, phone, token, firebase_token } = req.body;
        const getModel = await modelService.getOne(db[model], {
            country_code,
            phone
        }, req);
        if (getModel && getModel.deleted_at === 0) {
            getModel.accessToken = await signToken({ id: getModel._id }, config.jwt_expiration);
            const refreshToken = await signToken({ id: getModel._id }, `${config.jwt_refresh_expiration}d`);
            await redis.set(getModel.accessToken, refreshToken, 60 * 60 * 24 * config.jwt_refresh_expiration);
            await transaction.commitTransaction();
            return new UserLogInDTO(getModel);
        } else {
            const createModel = await modelService.createOne(db[model], {
                country_code,
                phone
            }, req);
            createModel.accessToken = await signToken({ id: createModel._id }, config.jwt_expiration);
            const refreshToken = await signToken({ id: createModel._id }, `${config.jwt_refresh_expiration}d`);
            await redis.set(createModel.accessToken, refreshToken, 60 * 60 * 24 * config.jwt_refresh_expiration);
            await transaction.commitTransaction();
            return new UserLogInDTO(createModel);
        }
    } catch (error) {
        await transaction.abortTransaction();
        throw error;
    }
}

export const refreshToken = async (token) => {
    try {
        if (await redis.get(`blackListed-${token}`)) {
            return response(401, {
                status: false,
                message: await getMessage('auth.session_expired'),
            });
        } else {
            const refreshToken = await redis.get(token);
            if (!refreshToken) {
                return response(400, {
                    success: false,
                    message: await getMessage('auth.no_refresh_token_provided'),
                });
            }
            const decoded = await verifyToken(refreshToken);
            if (decoded) {
                const accessToken = signToken({ id: decoded.id }, config.jwt_expiration);
                await redis.del(token);
                await redis.set(accessToken, refreshToken, 60 * 60 * 24 * config.jwt_refresh_expiration);
                return response(200, {
                    status: true,
                    message: await getMessage('auth.token_refreshed'),
                    data: {
                        accessToken
                    }
                });
            } else {
                await redis.del(token);
                return response(401, {
                    status: false,
                    message: await getMessage('auth.no_token_provided'),
                });
            }
        }
    } catch (error) {
        throw error;
    }
}

export const logOut = async (token) => {
    try {
        await redis.set(`blackListed-${token}`, 60 * 60 * 24 * config.jwt_refresh_expiration);
        await redis.del(token);
        return true;
    } catch (error) {
        throw error;
    }
}
