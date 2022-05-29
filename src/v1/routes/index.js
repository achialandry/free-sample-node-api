const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
    const { baseUrl } = req;
    res.json({
        baseUrl
    });
});

module.exports = router;