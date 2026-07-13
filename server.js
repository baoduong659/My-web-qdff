const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Cấu hình để server hiểu file HTML của bạn
app.use(express.static(__dirname));

// Lắng nghe kết nối
io.on('connection', (socket) => {
    console.log('Một thiết bị đã kết nối:', socket.id);

    // Khi nhận được dữ liệu update từ 1 máy, gửi cho tất cả các máy còn lại
    socket.on('updateData', (data) => {
        console.log('Dữ liệu mới nhận được:', data);
        io.emit('updateData', data); // Gửi broadcast
    });

    socket.on('disconnect', () => {
        console.log('Thiết bị đã ngắt kết nối:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server đang hoạt động tại cổng ${PORT}`);
});
