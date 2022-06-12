let firebaseURL = "https://websv732021-default-rtdb.europe-west1.firebasedatabase.app/"

let korisniciURL = firebaseURL + "korisnici.json"

let userID = getParamValue("id")

let register = document.getElementById("register")
var uname = document.getElementById("uname");
var pwd = document.getElementById("pwd");
var formatPasswrod = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
var pname = document.getElementById("name");
var lname = document.getElementById("lname");
var email = document.getElementById("email");
var formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var birthdaytime = document.getElementById("birthdaytime");
var phone = document.getElementById("phone");
var formatPhone = /[0-9]{9}/;
var add = document.getElementById("add")
register.addEventListener("submit", function validate(e){
    e.preventDefault()
    let validRegistration = false
    if (uname.value == "" || pwd.value == "" || pname.value == "" || lname.value == "" || email.value == "" || birthdaytime.value == "" || phone.value == "" || add.value == "")  {
        alert("Niste popunili sva polja, molimo Vas popunite sva polja.");
    } else if (!pwd.value.match(formatPasswrod)){
        alert("Lozinka mora da sadrzi cifru, veliko slovo, malo slovo i biti dugacka bar 8 karaktera.")
        pwd.value = "";
    } else if (!email.value.match(formatEmail)) {
        alert("Email adresa nije vazeca.")
        email.value = "";
    } else if(!phone.value.match(formatPhone)){
        alert("Validan broj telefona sadrzi bar 9 cifara.")
        phone.value == "";
    } else {
        alert("Uspesna registracija.")
        validRegistration = true
    }
    if (validRegistration == true){
        let user = {}
        let adresa = document.querySelector("#add").value.trim()
        user.adresa = adresa;
        let birthdaytime = document.querySelector("#birthdaytime").value.trim()
        user.datumRodjenja = birthdaytime;
        let email = document.querySelector("#email").value.trim()
        user.email = email;
        let pname = document.querySelector("#name").value.trim()
        user.ime = pname;
        let pwd = document.querySelector("#pwd").value.trim()
        user.lozinka = pwd;
        let lname = document.querySelector("#lname").value.trim()
        user.prezime = lname;
        let phone = document.querySelector("#phone").value.trim()
        user.telefon = phone;
        let uname = document.querySelector("#uname").value.trim()
        user.korisnickoIme = uname;

        let postRequest = new XMLHttpRequest();

        postRequest.onreadystatechange = function (e) {
            if (this.readyState == 4){
                if (this.status == 200){
                    console.log(user);
                    window.location.href = "index.html";
                }
                else{
                    alert("Greska pri registrovanju.");
                }
            }
        };
        postRequest.open("POST", firebaseURL + "/korisnici" + ".json" )
        postRequest.send(JSON.stringify(user));
    }
});

function getParamValue(name) {
    let location = decodeURI(window.location.toString());
    let index = location.indexOf("?") + 1;
    let subs = location.substring(index, location.length);
    let splitted = subs.split("&");
  
    for (i = 0; i < splitted.length; i++) {
      let s = splitted[i].split("=");
      let pName = s[0];
      let pValue = s[1];
      if (pName == name) {
        return pValue;
      }
    }
  }
  