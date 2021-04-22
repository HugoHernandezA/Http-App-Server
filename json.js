const http = require("http");

const HOST = 'localhost';
const PORT = 8000;

const requestListener = function (request, response) {
    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);
    response.end(`{"message": "This is a JSON response"}`);
};

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});