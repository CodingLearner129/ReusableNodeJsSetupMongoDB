import * as modelService from "./../services/model_service.js";
import { verifyToken } from "./../services/auth_service.js";
import getMessage from './../helpers/getMessage.js';
import { logMessage } from "./../helpers/logger.js";
import * as redis from './../helpers/redis.js';
import db from "../config/db.js";

export const authenticationMiddleware = async (req, res, next, model) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).send({
                status: false,
                message: await getMessage('auth.no_token_provided'),
            });
        } else {
            if (await redis.get(`blackListed-${token}`)) {
                return res.status(401).send({
                    status: false,
                    message: await getMessage('auth.session_expired'),
                });
            } else {
                const decoded = await verifyToken(token);
                const getModel = await modelService.getOneById(db[model], decoded.id);
                if (getModel != null) {
                    req.user_id = getModel.id
                    next();
                } else {
                    return res.status(404).send({
                        status: false,
                        message: await getMessage('auth.account_not_exist'),
                    });
                }
            }
        }
    } catch (error) {
        logMessage(req, error);
        return res.status(401).send({
            status: false,
            message: await getMessage('auth.session_expired'),
        });
    }
}