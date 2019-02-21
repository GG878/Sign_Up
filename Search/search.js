
var socket = io();
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
function setCursorByID(id, cursorStyle) {
    var elem;
    if (document.getElementById &&
        (elem = document.getElementById(id))) {
        if (elem.style) elem.style.cursor = cursorStyle;
    }
}
function addTable(Print_title) {
    var myTableBody = document.getElementById("myDynamicTable");
    var tr = document.createElement('TR');
    tr.classList.add("Default");

    myTableBody.appendChild(tr);

    for (let i in Print_title) {
        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(Print_title[i]));
        if (Print_title[i] == Print_title["Background color"]) {
            td.style.color = Print_title[i];

        }
        tr.appendChild(td);
    }
    // Delete button
    var Del_Button = document.createElement("button");
    var t = document.createTextNode("Delete");
    var i_element = document.createElement("i");
    i_element.classList.add("fas", "fa-trash-alt")
    Del_Button.appendChild(i_element)
    Del_Button.setAttribute("id", "Del_" + Print_title["Name"])
    Del_Button.type = "submit";
    Del_Button.classList.add("btn", "btn-danger");
    Del_Button.appendChild(t);

    Del_Button.setAttribute("onclick", "Del_User(this," + "'" + Print_title["Name"] + "')");
    //Edit button
    var Edit_Btn = document.createElement("a");
    Edit_Btn.href = "#";

    var Edit_Btn_title = document.createTextNode("Edit")
    var Edit_i_element = document.createElement("i");
    Edit_i_element.classList.add("fas", "fa-user-edit");
    Edit_Btn.appendChild(Edit_i_element);
    Edit_Btn.setAttribute("id", "Edit_" + Print_title["Name"]);
    Edit_Btn.type = "submit";
    Edit_Btn.classList.add("btn", "btn-light");
    Edit_Btn.appendChild(Edit_Btn_title);

    Edit_Btn.setAttribute("onclick", "Edit_User('" + Print_title["Name"] + "')")





    tr.appendChild(Del_Button);
    tr.appendChild(Edit_Btn);
}
function Del_User(btn, User_Name) {
    var Access = prompt("Are you sure to delete " + User_Name + "\n y for yes\n n for no");
    Access = Access.toLowerCase();
    if (Access == "y") {
        btn.parentNode.parentNode.removeChild(btn.parentNode);
        socket.emit("delete this user", User_Name);
        socket.on("User has deleted", function () {
            alert(User_Name + " has deleted ")
        })


    }
    else if (Access == "n") {
        alert(User_Name + " has not deleted")
    }
    else {
        alert("Please try again")
    }
}
function Edit_User(User_Name) {
    var Access = prompt("Are you sure to edit " + User_Name + "\n y for yes\n n for no");
    var Edit_Btn = document.getElementById("Edit_"+User_Name);
    Access = Access.toLowerCase();
    if (Access == "y") {
        console.log("aa");
        Edit_Btn.href = "http://localhost:2000/add.html?n=" + User_Name;

        // socket.emit("edit user",User_Name);

    }
    else if (Access == "n") {
        alert(User_Name + " has not edited")
    }
    else {
        alert("Please try again")
    }

}
function addZero(i) {// adding zero to date
    if (i < 10) {
        i = "0" + i;
    }
    return i;
} function randomNumber() {
    return Math.round(Math.random() * 250)
}

function rgbColor(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}
window.onload = function () {
    var search = document.getElementById("Search");
    var All_Users_btn = document.getElementById("All_Users_btn");
    var HBimg = document.getElementById("HBimg");
    var myTableBody = document.getElementById("myDynamicTable");
    
    
    

    var HasNotPrinted = true;
    search.onclick = search_print;
    All_Users_btn.onclick = All_Users_print;




    function All_Users_print() {
        if (HasNotPrinted) {
            HBimg.innerText = ""
            setCursorByID("All_Users_btn", "not-allowed")
            HasNotPrinted = false;
            socket.emit("print All Users");
            var myTableBody = document.getElementById("myDynamicTable");
            var DefaultTr = document.getElementsByClassName("Default");
            for (let i = 0; i < DefaultTr.length; i++) {
                myTableBody.removeChild(DefaultTr[i]);
            }

            socket.on("Print User", function (User_data) {
                addTable(User_data);
            })
        }
        else {
            console.log("Button has blocked");

        }


    }
    myTableBody.onload = function () {
        var btn = document.getElementById("Del_Gor");
        console.log(btn);

    }
    function search_print() {
        var Err = document.getElementById("err");
        var searchResult = document.getElementById("search");

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
                    Img.onclick = function () {
                        if (elem.paused) {
                            elem.play();

                        }
                        else {
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
