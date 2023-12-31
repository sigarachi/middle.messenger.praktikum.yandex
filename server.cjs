const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();

const { Server } = require("socket.io");
const io = new Server();

io.on('connection', (socket) => {
    console.log('a user connected');
});


app.use(express.static(path.resolve(__dirname, 'dist'), {extensions: ["js"]}));

app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`)
})
