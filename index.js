var http = require("http");
var net = require("net");
var WebSocket = require("ws");
var fs = require("fs");

var PORT = process.env.PORT || 8686;
var clients = new Set();
var lastContext;

if (!process.argv[2]) {
  console.log("Please provide a UNIX Sock file.");
  process.exit();
}

// remove sock if it exists
if (fs.existsSync(process.argv[2])) {
  fs.unlinkSync(process.argv[2]);
}

function createUniqueID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
}

var sockServer = net.createServer((con) => {
  con.on("error", (e) => {
    console.log("sock error", e);
  });
  con.on("data", (chunk) => {
    lastContext = chunk;
    clients.forEach((client) => {
      client.send(chunk.toString());
    });
  });
});

var server = http.createServer().listen(PORT);

var socketServer = new WebSocket.Server({
  noServer: true,
  path: "/",
});

socketServer.on("connection", (websocket, request) => {
  websocket.id = createUniqueID();
  websocket.on("close", () => clients.delete(websocket));
  if (lastContext) {
    websocket.send(lastContext.toString());
  }
  clients.add(websocket);
});

server.on("upgrade", (request, socket, head) => {
  socketServer.handleUpgrade(request, socket, head, (websocket) => {
    socketServer.emit("connection", websocket, request);
  });
});

sockServer.listen(process.argv[2]);
