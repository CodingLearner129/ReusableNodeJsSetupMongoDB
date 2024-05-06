import niv, { Validator } from 'node-input-validator';
import db from './../config/db.js';
import * as modelService from "./../services/model_service.js";

niv.extend('unique', async function ({ value, args }) {
    try {
        const where = args.length > 1 ? { email: value, _id: { $ne: args[1] } } : { email: value };
        let emailExists = await modelService.getOne(db[args[0]], where);
        return !emailExists;
    } catch (error) {
        return false;
    }
});
