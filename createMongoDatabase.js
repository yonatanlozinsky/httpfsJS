let MongoClient = require('mongodb').MongoClient,
url = "mongodb://localhost:27017";

MongoClient.connect(url, (err, db)=> {
    if (err) throw err;
    var dbo = db.db("fileDB");
    dbo.createCollection("files", (err, res)=> {
      if (err) throw err;
      console.log("Made it!");
      db.close();
    });
  });