const http = require("http");
const fs = require('fs');
const url = require('url');
const os = require('os');

const HOST = 'localhost';
const PORT = 8000;

const books = JSON.stringify([
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);

const serverData = JSON.stringify([
    { hostname: os.hostname(), cpus: os.cpus(), architecture: os.arch(), uptime: os.uptime(), userInfo: os.userInfo(), freeMemory: os.freemem() },
]);

const requestListener = function (request, response) {
    response.setHeader("Content-Type", "application/json");

    //QUERY PARAMETERS PARA LEER ARCHIVO
    const queryObject = url.parse(request.url,true).query;
    const fileName = `../SERVERS/${queryObject["file"]}`
    const file = fs.readFile(fileName, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('USTED SE ENCUENTRA LEYENDO EL ARCHIVO: ' + fileName);
        console.log(data)
    });

    //RUTEADOR USANDO SWITCH
    switch (request.url) {
        case "/file-viewer":
            response.writeHead(200);
            response.end(file);
            break
        case "/books":
            response.writeHead(200);
            response.end(books);
            break
        case "/server-status":
            response.writeHead(200);
            response.end(serverData);
            break
        default:
            response.writeHead(200);
            response.end(JSON.stringify({Welcome:"Welcome to my server!"}));
    };
};


const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});