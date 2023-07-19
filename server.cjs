'use strict'
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const PORT = 3000;
const app = express();
const router = express.Router();

app.use(express.static(path.resolve(__dirname, 'dist'), {extensions: ["js"]}));
app.set('view engine', 'pug');

router.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})

app.use('/.netlify/functions/server', router);

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`)
})

module.exports = app;
module.exports.handler = serverless(app);
