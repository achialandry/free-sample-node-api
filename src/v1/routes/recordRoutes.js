const express = require('express');
const apicache = require('apicache');

const recordController = require('../../controllers/recordController');

const cache = apicache.middleware;
const router = express.Router();

router.get('/', cache('2 minutes'), recordController.getAllRecords);

router.get('/:recordId', recordController.getOneRecord);

router.post('/', recordController.createNewRecord);

router.patch('/:recordId', recordController.updateOneRecord);

router.delete('/:recordId', recordController.deleteOneRecord);

module.exports = router;
