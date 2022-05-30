const DB = require('./db.json');
const { saveToDb } = require('./utils');

const getRecordForWorkout = (workoutId) => {
    try {
        const record = DB.records.filter((record) => record.workout === workoutId);
        if (!record) {
            throw {
                status: 400,
                message: `Can't find record for workout id: '${workoutId}'`
            }
        }
        return record;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
};

const getAllRecords = () => {
    try {
        return DB.records;
    } catch (error) {
        throw {
            status: 500,
            message: error
        };
    }
};

const getOneRecord = (recordId) => {
    try {
        const record = DB.records.find((record) => record.id === recordId);
        if (!record) {
            throw {
                status: 400,
                message: `Can't find record with id: '${recordId}'`
            }
        }
        return record;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
};

const createNewRecord = (newRecord) => {
    const isAlreadyAdded = DB.records.findIndex((record) => record.record === newRecord.record && record.workout === newRecord.workout) > -1;
    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `Record: ${newRecord.record} already exists for workout with Id: ${newRecord.workout}`
        }
    }
    try {
        DB.records.push(newRecord);
        saveToDb(DB);
        return newRecord;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
}

const updateOneRecord = (recordId, changes) => {
    try {
        const indexForUpdate = DB.records.findIndex((record) => record.id === recordId);
    
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `Can't find record with id: '${recordId}'`
            }
        }
        const existingRecord = DB.records[indexForUpdate];
    
        const updatedRecord = {
            ...existingRecord,
            ...changes,
        };
        DB.records[indexForUpdate] = updatedRecord;
        saveToDb(DB);
        return updatedRecord;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
    
};

const deleteOneRecord = (recordId) => {
    try {
        const indexForDeletion = DB.records.findIndex((record) => record.id === recordId);
        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `Can't find record with id: '${recordId}'`
            }
        }
        DB.records.splice(indexForDeletion, 1);
        saveToDb(DB);
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
};

module.exports = {
    getRecordForWorkout,
    getAllRecords,
    getOneRecord,
    createNewRecord,
    updateOneRecord,
    deleteOneRecord
}
