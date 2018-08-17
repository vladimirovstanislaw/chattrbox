var http=require('http');
var fs = require('fs');
var extract = require('./extract');
var path = require('path');
var mime =require('mime');
var ws = require('./websockets-server');

var handleError = function (err,res) {
	var johny = path.resolve(__dirname,'app','404.html');
	fs.readFile(johny,function (err, data) {
		res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
		res.end(data);
	});

};

var server = http.createServer(function (req,res) {
	var filePath = extract(req.url);
	fs.readFile(filePath , function(err, data){
		if(err)
		{
			handleError(err,res);
			return;//<=выход из анонимной функции (типа бреак)
		} else {
		var vaska=mime.getType(filePath.split('.').pop());
		console.log(vaska);
		res.writeHead(200, {'Content-Type': vaska});
		res.end(data);
	}
	});
});

server.listen(3000);

/*
push to GIT
	cd C:/Projects/chattrbox
git add .
git commit -m "sixth commit"
git remote add origin git@github.com:vladimirovstanislaw/chattrbox.git
git push -u origin master


turn to GIT-version [reset local changes][[PULL]]
git reset --hard HEAD
git clean -xffd
git pull

vaska inda house
*/
