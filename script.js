// form validation --->
function validates(){
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    // formconfirm function call
    formconfirm(username,password,callback);
}
// formconfirm function definition
function formconfirm(username,password,callback){
    var msg = document.getElementById("msg");
    if (username == "admin" && password == "12345"){
        msg.innerHTML = "Logged In Successfully!!!";
        // callback function call
        callback();
    }
    else{
        msg.innerHTML = "Invalid LogIn!!!";
    }
}
// callback function definition
function callback(){
    var direct = document.getElementById("loginform");
    direct.setAttribute("action","home.html");
}


// ToDo List --->
function ajax(){
    var table = document.createElement("table");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            var response = JSON.parse(this.responseText);
            var col = [];
            // creates columns of table
            for (var i = 0; i < response.length; i++) {
                for (var key in response[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }
            // creates rows of table
            var tr = table.insertRow(-1);
            for (var i = 0; i<col.length; i++) {
                var th = document.createElement("th");
                th.innerHTML = col[i];
                tr.appendChild(th);
            }
            // insert row values
            for(var i=0;i<response.length;i++){
                tr = table.insertRow(-1);
                // creates column values
                for (var j = 0; j<col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    if(j == 0){
                        tabCell.innerHTML = response[i].userId;
                    }
                    else if(j == 1){
                        tabCell.innerHTML = response[i].id;
                    }
                    else if(j == 2){
                        tabCell.innerHTML = response[i].title;
                    }
                    else{
                        var check = response[i].completed;
                        // marks already completed tasks
                        if(check == true){
                            var x = document.createElement("INPUT");
                            x.setAttribute("type", "checkbox");
                            tabCell.appendChild(x);
                            x.setAttribute("checked", "checked");
                            x.setAttribute("disabled", "true");
                        }
                        // tasks to be completed
                        else{
                            var x = document.createElement("INPUT");
                            x.setAttribute("type", "checkbox");
                            x.setAttribute("onclick","myfun(this.checked)");
                            tabCell.appendChild(x);
                        }
                    }
                }
            }
        }
    }
    // creates table
    var divContainer = document.getElementById("list-todo");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    // retrieve daily tasks
    xhttp.open("GET","https://jsonplaceholder.typicode.com/todos",true);
    xhttp.send();
}


// completed tasks validation --->
var tick = 0;
function myfun(y){
    // promise
    var promise = new Promise(function (resolve){
        if(y == true){
            tick++;
            if(tick == 5){
                // alert("Congrats! 5 Tasks have been Successfully Completed...");
                resolve();
            }
        }
        else{
            tick--;
        }
        // else{
        // reject();
        // }
    });
    promise
    .then(function(){
        alert("Congrats! 5 Tasks have been Successfully Completed...");
    })
    // .catch(function(){
    //     console.log("Not finished");
    // })
}





// basic demo

// checkbox validation --->
// var tick = 0;
// function myfun(checkbox){
//     if(checkbox.checked){
//         // alert("check");
//         tick++;
//         if(tick == 5){
//             alert("Congrats! 5 Tasks have been Successfully Completed...");
//         }
//     }
// }

// todo list --->
// function ajax(){
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function (){
//         if(this.readyState == 4 && this.status == 200){
//             var response = JSON.parse(this.responseText);
//             var output ="";
//             for(var i=0;i<response.length;i++){
//                 output +="<li>"+response[i].title+"</li>";
//             }
//             document.getElementById("list-todo").innerHTML = output;
//         }
//     }
//     xhttp.open("GET","https://jsonplaceholder.typicode.com/todos",true);
//     xhttp.send();
// }

// login validation --->
// $("#login").click(function (){
//     var username = $(".user").val();
//     var password = $(".pass").val();
//     if (username == "admin" && password == "12345"){
//         $("#msg").html("<h3>Logged in successfully!!!</h3>");
//         $("#loginform").attr("action","home.html");
//     }
//     else{
//         $("#msg").html("<h3>Invalid Login!!!</h3>");
//     }
// });