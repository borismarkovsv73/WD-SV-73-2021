let firebaseURL = "https://websv732021-default-rtdb.europe-west1.firebasedatabase.app/"

let korisniciURL = firebaseURL + "korisnici.json"

let login = document.getElementById("login")
login.addEventListener("submit", function (x){
    x.preventDefault();
    let userName = document.getElementById("uname").value.trim();
    let password = document.getElementById("pwd").value.trim();

    if (userName == "" || password == ""){
        alert("Fields can't be empty, please input your username and password.")
    } else{
        let usersRequest = new XMLHttpRequest();
        usersRequest.onreadystatechange = function() {
            if (this.readyState == 4){
                if (this.status == 200){
                    console.log(this.responseText);
                    let users = JSON.parse(this.responseText);
                    let loggedIn = false;
                    for (let i in users){
                        let user = users[i]
                        let userName1 = user.korisnickoIme;
                        let password1 = user.lozinka;
                        console.log(userName1, password1);
                        console.log(userName, password);
                        if (userName1 == userName && password1 == password){
                            loggedIn = true;
                            break;
                        } else{
                            loggedIn = false;
                        }
                    }
                    if (loggedIn == true){
                        alert("Login succsessful.")
                    } else {
                        alert("Sorry, your username/password is incorrect!")
                    }
                }
            }
        };
        usersRequest.open("GET", korisniciURL)
        usersRequest.send();
    }
})