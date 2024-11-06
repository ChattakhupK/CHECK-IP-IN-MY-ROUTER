const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "http://localhost:5173", // frontend ที่รันที่ http://localhost:5174 เชื่อมต่อ
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const ping = require("ping");
const nodeData = [
  { id: 1, label: "PC 1", status: "UP", ip: "192.168.0.197" },
  { id: 2, label: "PHONE 2", status: "UP", ip: "192.168.0.196" },
  { id: 3, label: "None", status: "UP", ip: "192.168.0.000" },
  { id: 4, label: "None", status: "UP", ip: "192.168.0.000" },
];

const pingAndupdate = () => {
  Object.values(nodeData).forEach((node) => {
    ping.sys.probe(node.ip, (isAlive) => {
      const updatedStatus = isAlive ? "UP" : "DOWN";

      io.emit("nodeStatus", {
        id: node.id,
        status: updatedStatus,
        ip: node.ip,
        label: node.label,
      });
    });
  });
};

pingAndupdate();
setInterval(pingAndupdate, 3000);

// io.on("connection", (socket) => {
//   console.log("user connection");

//   socket.on("disconnect", () => {
//     console.log("user diconnect");
//   });

//   socket.emit("m", "welcome");
// });

app.get("/api", (req, res) => {
  console.log("Hello API");
  res.send("hello api dev");
});

server.listen(5000, () => console.log(`server is running on port 5000`));
