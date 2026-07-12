const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen(process.env.PORT || 3000);
