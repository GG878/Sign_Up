var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var path = "C:/Users/Toshiba/Desktop/JavaScript/programs/Sign_Up/base/";


app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('search.html');
});
server.listen(3000);
io.on("connection", function (socket) {
    socket.on("read", function (name) {
        fs.readFile(path + name + ".json", 'utf8', function (err, data) {
            if (err) {
                socket.emit("print", data);
            }
            else{
                var Data = JSON.parse(data);
                socket.emit("print", Data)
            }
        })
    })
})