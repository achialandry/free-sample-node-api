const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        test: 'perfect!'
    });
});

app.listen(PORT, () => {
    console.log('REST API listening on port: ', PORT);
});