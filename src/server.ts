import app from './app';
import { config } from './config/config';
import { Server } from "socket.io";
import http from "http";

//config socket.io
const server = http.createServer(app);

// Cấu hình Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Cho phép truy cập từ mọi nguồn gốc (thay đổi nếu cần)
        methods: ["GET", "POST"],
    },
});

// Sự kiện khi một client kết nối
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Lắng nghe sự kiện "send_message" từ client
    socket.on("send_message", (data) => {

        console.log("Message received:", data);

        // Gửi tin nhắn đến tất cả client khác
        io.emit("receive_message", data);
    });

    // Sự kiện khi client ngắt kết nối
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})