const DB = require('./db.json');
const { saveToDb } = require('./utils');

const getAllWorkouts = (filterParams) => {
    try {
        let workouts = DB.workouts;
        const { mode } = filterParams;
        if (mode) {
            return DB.workouts.filter((workout) => workout.mode.toLowerCase().includes(mode))
        }
        return workouts;
    } catch (error) {
        throw {
            status: 500,
            message: error
        };
    }
};

const getOneWorkout = (workoutId) => {
    try {
        const workout = DB.workouts.find((workout) => workout.id === workoutId);
        if (!workout) {
            throw {
                status: 400,
                message: `Can't find workout with id: '${workoutId}'`
            }
        }
        return workout;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
};

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `Workout with the name: ${newWorkout.name} already exists.`
        }
    }
    try {
        DB.workouts.push(newWorkout);
        saveToDb(DB);
        return newWorkout;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
}

const updateOneWorkout = (workoutId, changes) => {
    try {
        const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId);
    
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `Can't find workout with id: '${workoutId}'`
            }
        }
        const existingWorkout = DB.workouts[indexForUpdate];
    
        const updatedWorkout = {
            ...existingWorkout,
            ...changes,
            updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
        };
        DB.workouts[indexForUpdate] = updatedWorkout;
        saveToDb(DB);
        return updatedWorkout;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
    
};

const deleteOneWorkout = (workoutId) => {
    try {
        const indexForDeletion = DB.workouts.findIndex((workout) => workout.id === workoutId);
        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `Can't find workout with id: '${workoutId}'`
            }
        }
        DB.workouts.splice(indexForDeletion, 1);
        saveToDb(DB);
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};