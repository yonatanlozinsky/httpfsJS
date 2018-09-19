const http = require('http'),
      {RequestHandler} = require('./requestHandler');

class FileUploadServer {
    constructor() {
        this.httpServer = http.createServer((request,response)=>{
            RequestHandler.identify(request, response);
        });
    }
    
    listen(port=80){
        this.httpServer.listen(port);
    }
}

exports.FileUploadServer = FileUploadServer;

