import { logMessage } from "./../helpers/logger.js";
import getMessage from "./../helpers/getMessage.js"
import * as authService from "./../services/auth_service.js"

export const verifyFirebaseToken = async (req, res) => {
    try {
        const result = await authService.verifyFirebaseToken(req, res, 'user');
        res.status(201).send({
            status: true,
            message: await getMessage('auth.otp_verified_success'),
            data: result
        });
    } catch (error) {
        logMessage(error, req);
        res.status(500).send({
            status: false,
            message: await getMessage('common.something_went_wrong'),
        });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        await authService.deleteAccount(req);
    } catch (error) {
        logMessage(error, req);
        res.status(500).send({
            status: false,
            message: await getMessage('common.something_went_wrong'),
        });
    }
}

export const logOut = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
                status: false,
                message: await getMessage('auth.no_token_provided'),
            });
        }
        await authService.logOut(token);
        res.status(200).send({
            status: true,
            message: await getMessage('auth.logout_success'),
        });
    } catch (error) {
        logMessage(error, req);
        res.status(500).send({
            status: false,
            message: await getMessage('common.something_went_wrong'),
        });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(400).json({
                success: false,
                message: await getMessage('auth.no_token_provided'),
            });
        }
        const result = await authService.refreshToken(token);
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(500).send({
            status: false,
            message: await getMessage('common.something_went_wrong'),
        });
    }
}