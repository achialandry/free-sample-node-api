const fs = require('fs');

const saveToDb = (db) => {
    fs.writeFileSync('./src/db/db.json', JSON.stringify(db, null, 2), {
        encoding: 'utf-8'
    });
};

module.exports = { 
    saveToDb
};
