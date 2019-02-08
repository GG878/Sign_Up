var socket = io();
function getDate() {
    var date = new Date();
    var y = date.getFullYear()
    var day = date.getDate()
    var month = date.getMonth();
    var months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct"," Nov","Dec"];
    var currentMonth = months[month];;
    var h = addZero(date.getHours());
    var m = addZero(date.getMinutes());
    var s = addZero(date.getSeconds());
    var date = y + " " + currentMonth + ' ' + day+ "  " + h + ":" + m + ":" + s;
    return date;
}
function addZero(i) {// adding zero to date
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}function randomNumber() {
    return Math.round(Math.random() * 250)
}

function rgbColor(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}
window.onload = function () {
    var search = document.getElementById("Search");
    search.onclick = search_print;
    function search_print() {
        var searchResult = document.getElementById("search");
        var Err = document.getElementById("err");

        var Name = document.getElementById("Name");
        var Lname = document.getElementById("Lname");
        var PhNum = document.getElementById("PhoneNumber");
        var FvColor = document.getElementById("FavoriteColor");
        var PsId = document.getElementById("PsID");
        var Mail = document.getElementById("Mail");
        var Password = document.getElementById("Password");
        var DateBirth = document.getElementById("Date");
        var Adress = document.getElementById("Adress");
        var CrDate = document.getElementById("CrDate");
        var HBimg = document.getElementById("HBimg");


        socket.emit("read", searchResult.value);
        socket.on("print", function (Data) {
            if (Data == null) {
                Err.innerHTML = searchResult.value + " is not found , pleaze  <a href='http://localhost:2000'>Register</a>";
                HBimg.innerText = ''
            }
            else {
                Name.innerText = Data["Name"];
                Lname.innerText = Data["Lname"];
                PhNum.innerText = Data["Phone Number"];
                FvColor.innerText = Data["Background color"];
                PsId.innerText = Data["Passport ID"];
                Mail.innerText = Data["Mail"];
                Password.innerText = Data["Password"];
                DateBirth.innerText = Data["Date"];
                Adress.innerText = Data["adress"];
                CrDate.innerText = Data["Date of creating"];

                FvColor.style.color = Data["Background color"];
                document.body.style.backgroundColor = rgbColor(randomNumber(), randomNumber(), randomNumber());
                var mydate = new Date(Data["Date"]);
                var day = mydate.getDate();
                var mounth = mydate.getMonth();
                var CurrentDay = new Date().getDate();
                var CurentMounth = new Date().getMonth();
                if (day == CurrentDay && mounth == CurentMounth) {
                    console.log("Happy Birthday");                                                                                                             //
                    HBimg.innerHTML = "<p>Happy Birthday Dear " + Data["Name"].toUpperCase() + "</p> <img src='HB.jpg' title='Click to stop music'><br><audio autoplay src='HB.mp3'> Your browser does not support the <code>audio</code> element. </audio>";
                    var elem = document.querySelector("audio");
                    var Img = document.querySelector("img");
                    Img.onclick = function(){
                        if(elem.paused){
                            elem.play();

                        }
                        else{
                            elem.pause();
                        }

                    }    

                    HBimg.style.color = Data["Background color"];

                }
                else {
                    HBimg.innerText = ""
                }



                console.log(Data);


                Err.innerHTML = ""
            }
        })

    }
}
