const fs = require('fs'),
      Path = require('path'),
      fileIO = require('./fileIO');



class RequestHandler{

    static identify (request, response){
        
        if (request.method === "GET"){
            const joinPath = Path.join(__dirname,request.url);

            if (request.url === "/"){ //index page
                response.writeHead(200, {'Content-Type':'text/html'});
                
                const joinPath = Path.join(__dirname,'static/index.html');
                fileIO.readStaticFile(joinPath)
                .then(result=>response.end(result))
                .catch(error=>console.log(error));
            }

            else if (request.url.startsWith("/static")){ //static files  
                fileIO.readStaticFile(joinPath)
                .then(result=>{
                    response.writeHead(200, {'Content-Type':'text/html'});
                    response.end(result);
                })
                
                .catch(error=>{
                    response.writeHead(404, {'Content-Type':'text/plain'});
                    response.write("Page was not found yo");
                    response.end();
                });
            }

            else {
                response.writeHead(404,"Page not found",{'Content-Type':'text/plain'});
                response.write("Page was not found yo");
                response.end();
            }
        }
    }

}

exports.RequestHandler = RequestHandler;