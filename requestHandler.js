const fs = require('fs'),
      Path = require('path'),
      fileIO = require('./fileIO');



class RequestHandler{
/**
 * Identifies different types of requests and maps methods to them.
 * @param {IncomingMessage} request request object from http server
 * @param {ServerResponse} response response object from http server
 */
    static identify (request, response){

        if (request.method === "GET"){
            const joinPath = Path.join(__dirname,request.url);

            if (request.url === "/"){ //index page
                response.writeHead(200, {'Content-Type':'text/html'});
                
                const joinPath = Path.join(__dirname,'static/index.html');
                fileIO.readStaticFile(joinPath,response);
            }

            else if (request.url.startsWith("/static/")){ //static files  
                fileIO.readStaticFile(joinPath,response);
            }

            else {
                response.writeHead(404,"Page not found",{'Content-Type':'text/plain'});
                response.write("Page was not found yo");
                response.end();
            }
        }

        else if (request.method === "POST"){
            if (request.url==="/upload"){ //handle uploading
                (async (request)=>{
                    let body=[]; //push chunks to body

                    request.on("data",chunk=>{
                        console.log("chunklen:"+chunk.length.toString());
                        body.push(chunk);
                });

                await request.on("end",()=>{
                    console.log("end happened");
                    body=Buffer.concat(body).toString(); //added buffer
                    console.log(body.length);
                    console.log(body.slice(0,500));
                });

                return body;

            })(request)
                .then((body)=>{
                    response.writeHead("201",
                    {'Content-Type':'text/plain'});
                    response.write("middle");
                    response.end("FINISHED");
                })
                .catch((err)=>console.log(err));
            }
        }
    }
}

exports.RequestHandler = RequestHandler;