const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http); // Khởi tạo Socket.io

app.use(express.static(__dirname)); // Cho phép server gửi file index.html đi

// Khi có người truy cập web
io.on('connection', (socket) => {
    console.log('Một thành viên đã vào xem web');

    // Lắng nghe lệnh cập nhật điểm từ bạn
    socket.on('updateScore', (data) => {
        console.log('Đang cập nhật điểm mới...');
        // Phát dữ liệu mới đến TẤT CẢ mọi người đang mở web
        io.emit('dataChanged', data); 
    });
});

http.listen(process.env.PORT || 3000);
