var socket = io();
function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePassword(password) {
    let va = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return va.test(password);
}
var button = document.getElementById("button");

var name = document.getElementById("name");

var Lname = document.getElementById("Lname");
var mail = document.getElementById("mail");
var password = document.getElementById("password");
var PhoneNumber = document.getElementById("PhoneNumber");
var date = document.getElementById("date");
var BkColor = document.getElementById("BkColor");
var PsId = document.getElementById("PsId");
var adress = document.getElementById("address");

var MailStatus = document.getElementById("MailStatus");


var urlParams;
(window.onpopstate = function () {
    var match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
})();
if (Object.keys(urlParams).length != 0) {
    var Person_Name = urlParams["n"];
    socket.emit("Edit this user", Person_Name);
    socket.on("Fill blanks", function (data) {
        // console.log(data["Name"]);

        name.value = data["Name"];
        Lname.value = data["Lname"];
        mail.value = data["Mail"];
        password.value = data["Password"];
        PhoneNumber.value = data["Phone number"];
        date.value = data["Date"];
        BkColor.value = data["Background color"];
        PsId.value = data["Passport ID"];
        adress.value = data["adress"];

    })
}
else {

}

button.onclick = print;
function print() {
    // var name = document.getElementById("name");
    console.log(name.value);

    var Lname = document.getElementById("Lname");
    var mail = document.getElementById("mail");
    var password = document.getElementById("password");
    var PhoneNumber = document.getElementById("PhoneNumber");
    var date = document.getElementById("date");
    var BkColor = document.getElementById("BkColor");
    var PsId = document.getElementById("PsId");
    var adress = document.getElementById("address");

    var MailStatus = document.getElementById("MailStatus")
    var results = [];



    if (name.value == "") {
        alert("please enter the Name");
        return
    }
    if (mail.value == "") {
        alert("please enter the mail");
        return
    }
    if (password.value == "") {
        alert("please enter the Password");
        return
    }


    if (!validateEmail(mail.value)) {
        MailStatus.innerText = mail.value + " is not valid :("
        return
    }
    else {
        MailStatus.innerText = "";
    }
    // if (!validatePassword(password.value))
    // {
    //     passwordStatus.innerText = password.value + " is not valid :("
    //     return
    // }
    // else{
    //     passwordStatus.innerText = "";
    // }
    document.body.style.backgroundColor = BkColor.value;
    console.log(name.value);

    results.push(name.value, Lname.value, PhoneNumber.value, BkColor.value, PsId.value.toUpperCase(), mail.value, password.value, date.value, adress.value)
    socket.emit("print", results)


}