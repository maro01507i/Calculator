var querystring = require("querystring"),
    fs = require("fs"),
   /* formidable = require("formidable"),*/
	util = require('util');

function start(res) {
  console.log("Request handler 'start' was called.");
	var content;
	/*fs.readFile('../index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
    });*/
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(content);
		
	res.writeHead(200, {"Content-Type": "text/xml", "Cache-Control": "no-cache"});
	console.log("***Response: '" + content +"'");
	res.write(content);
	res.end(); 
   /* response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);*/
    //res.end();
}

function calcular(res, req) {
	console.log("Request handler 'upload' was called.");

	fs.readFile('../calculador.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
    });
 /* console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = process.cwd();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    /* Possible error on Windows systems:
       tried to rename to an already existing file */
    /*fs.rename(files.upload.path, "test.png", function(err) {
      if (err) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "test.png");
      }
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
	//response.end(util.inspect({fields: fields, files: files}));
  });*/
}

function contacto(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;