var express = require("express");
var http = require("http");
var path = require("path");
var app = express();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.use('/', express.static(path.join(__dirname, 'static')));

app.get('/:time', function(req, res){
    var time = req.params.time;
    var parts = time.replace(',', '').split(' ');
    var date;
    if (parts.length > 1){
        date = new Date(parts[2] + '-' + (months.indexOf(parts[0]) + 1) + '-' + parts[1]);
    }else{
        date = new Date(parseInt(time, 10) * 1000);
    }
    console.log(time, date.getTime(), typeof date.getTime());
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    if (isNaN(date.getTime()) || !date){
        res.end(JSON.stringify({
            "unix": null,
            "natural": null
        }));
    }else{
        res.end(JSON.stringify({
            "unix": date.getTime() / 1000,
            "natural": months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        }));
    }
});

http.createServer(app).listen(8080, function(){
  console.log('App listening on port 8080!');
});
