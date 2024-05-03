import niv, { Validator } from 'node-input-validator';
import getMessage from './../helpers/getMessage.js';
import { logMessage } from '../helpers/logger.js';
import "./common_request.js";

export const verifyFirebaseTokenRequest = async (req, res, next) => {
    try {
        let data = {
            country_code: req.body.country_code,
            phone: req.body.phone,
            token: req.body.token,
            firebase_token: req.body.firebase_token,
        }
        const validator = new Validator(data, {
            country_code: "required|string",
            phone: "required|integer|minLength:10|maxLength:12",
            token: "required|string",
            firebase_token: "required|string",
        }, {
            'country_code.required': await getMessage('validation.country_code.required'),
            'country_code.string': await getMessage('validation.country_code.string'),
            'phone.required': await getMessage('validation.phone.required'),
            'phone.string': await getMessage('validation.phone.integer'),
            'phone.minLength': await getMessage('validation.phone.minLength'),
            'phone.maxLength': await getMessage('validation.phone.maxLength'),
            'token.required': await getMessage('validation.token.required'),
            'token.string': await getMessage('validation.token.string'),
            'firebase_token.required': await getMessage('validation.firebase_token.required'),
            'firebase_token.string': await getMessage('validation.firebase_token.string'),
        });
        const matched = await validator.check();
        if (!matched) {
            res.status(422).send({
                status: false,
                message: await getMessage('validation.validation_error'),
                error: validator.errors
            });
        } else {
            next();
        }
    } catch (error) {
        logMessage(error, req);
        res.status(500).send({
            status: false,
            message: await getMessage('common.something_went_wrong'),
        });
    }
}
