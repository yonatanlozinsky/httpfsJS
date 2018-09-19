const serverModule = require('./httpServer');

const server = new serverModule.FileUploadServer();
server.listen(80);