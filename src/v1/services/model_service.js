import { logMessage } from "../helpers/logger.js";

export const createOne = async (Model, data, req) => {
    try {
        return await Model.create(data);
    } catch (error) {
        logMessage(error, req);
        throw error;
    }
};

export const getOne = async (Model, data, req = {}) => {
    try {
        return await Model.findOne(data);
    } catch (error) {
        logMessage(error, req);
        throw error;
    }
};

export const getOneById = async (Model, id, req) => {
    try {
        return await Model.findById(id);
    } catch (error) {
        logMessage(error, req);
        throw error;
    }
};
