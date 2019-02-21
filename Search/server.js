var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var path = "C:/Users/Toshiba/Desktop/JavaScript/programs/Sign_Up/base/";
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;


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
            else {
                let Data = JSON.parse(data);

                if (Data["Status"] == 0) {
                    delete Data["Status"];
                    socket.emit("print", Data)
                }
                else if (Data["Status"] == 1) {
                    socket.emit("print", null);
                }

            }
        })
    })
    socket.on("print All Users", function () {
        console.log("emit");

        fs.readFile(path + "All_Users.json", "utf8", function (err, Names) {
            if (err) {
                console.log(err);

            }
            else {
                let NamesArr = JSON.parse(Names)
                for (let i in NamesArr) {
                    fs.readFile(path + NamesArr[i] + ".json", "utf8", function (err, data) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            let Data = JSON.parse(data)

                            if (Data["Status"] == 0) {
                                delete Data["Status"]
                                socket.emit("Print User", Data);
                            }
                            else if (Data["Status"] == 1) {

                            }
                        }
                    })
                }
            }
        })
    })
    socket.on("delete this user", function (User_name) {
        fs.readFile(path + User_name + ".json", "utf8", function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                let Data = JSON.parse(data)
                Data["Status"] = 1;
                Data = JSON.stringify(Data)
                mkdirp(getDirName(path), function (err) {
                    if (err) return cb(err);
                    fs.writeFile(path + User_name + ".json",Data)
                    socket.emit("User has deleted")

                })
            }
        })
    })
    // socket.on("edit user",function(User_name){
        
    // })


})
