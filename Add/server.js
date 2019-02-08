var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;
function addZero(i) {// adding zero to date
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function getDate() {
    var date = new Date();
    var y = date.getFullYear()
    var day = date.getDate()
    var month = date.getMonth();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", " Nov", "Dec"];
    var currentMonth = months[month];;
    var h = addZero(date.getHours());
    var m = addZero(date.getMinutes());
    var s = addZero(date.getSeconds());
    var date = y + " " + currentMonth + ' ' + day + "  " + h + ":" + m + ":" + s;
    return date;
}
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('add.html');
});



server.listen(2000);
io.on("connection", function (socket) {

    socket.on("print", function (results) {
        var NameJSON = JSON.stringify(results[0]);
        var LnameJSON = JSON.stringify(results[1]);
        var PhoneNumberJSON = JSON.stringify(results[2]);
        var BkColorJSON = JSON.stringify(results[3]);
        var PsIdJSON = JSON.stringify(results[4]);
        var MailJSON = JSON.stringify(results[5]);
        var PasswordJSON = JSON.stringify(results[6]);
        var dateJSON = JSON.stringify(results[7])
        var adressJSON = JSON.stringify(results[8])
        var path = "C:/Users/Toshiba/Desktop/JavaScript/programs/Sign_Up/base/"
        mkdirp(getDirName(path), function (err) {
            if (err) return cb(err);
            fs.readFile(path + "All_Users.json", 'utf8', function (err, data) {
                if (err) { console.log(err); }
                let Names = JSON.parse(data) //return array
                Names.push(results[0])
                console.log(Names);
                let NamesJSON = JSON.stringify(Names);
                fs.writeFile(path + "All_Users.json", NamesJSON, function (err) {
                    if (err) { console.log(err); }
                })
            })
            fs.writeFile(path + results[0] + ".json", '{\n\n ' + '"Name":' + NameJSON + ',\n' + '"Lname":' + LnameJSON + ',\n' + '"Phone Number":' + PhoneNumberJSON + ',\n' + '"Background color":' + BkColorJSON + ',\n' + '"Passport ID":' + PsIdJSON + ',\n' + '"Mail":' + MailJSON + ',\n' + '"Password":' + PasswordJSON + ',\n' + '"Date":' + dateJSON + ',\n' + '"adress":' + adressJSON + ',\n' + '"Date of creating":"' + getDate() + '"' + "\n\n}", function (err) { console.log(err); })

        });

    });



})



