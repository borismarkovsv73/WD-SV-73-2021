let firebaseURL = "https://websv732021-default-rtdb.europe-west1.firebasedatabase.app/"

let korisnikURL = firebaseURL + "korisnici/-MNQoCqEXydVTdCNV47C.json" 

let kor = document.getElementById("editKorisnik")

var uname = document.getElementById("uname")
var email = document.getElementById("email");
var pname = document.getElementById("name");
var lname = document.getElementById("lname");
var bday = document.getElementById("birthdaytime")
var add = document.getElementById("add");
var phone = document.getElementById("phone");

let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function () {
    if (this.readyState == 4) { 
        if (this.status == 200) { 
            console.log(this.responseText);
            let korisnik = JSON.parse(this.responseText);
            console.log(korisnik)
            let target = document.getElementById("inside");
            let template = `
                <div id="wrap">
                <section id="left_play" style='background-image:url(../assets/pfp.jpg);height:50vh'></section>
                <section id="right" style="height:50vh">
                    <h2>${korisnik.ime} ${korisnik.prezime}</h2><br>
                    <h3><span class="about_play">Information about the user<span></h3>
                    <p>Email: ${korisnik.email}<br>Korisnicko ime: ${korisnik.korisnickoIme}<br>Telefon: ${korisnik.telefon}<br>Adresa: ${korisnik.adresa}<br>Datum Rodjenja: ${korisnik.datumRodjenja}</p>
                </section>
                </div>
                `;
            target.innerHTML = template;
            document.getElementById("uname").value= korisnik.korisnickoIme;
            document.getElementById("email").value= korisnik.email;
            document.getElementById("name").value= korisnik.ime;
            document.getElementById("lname").value= korisnik.prezime;
            document.getElementById("birthdaytime").value= korisnik.datumRodjenja;
            document.getElementById("add").value = korisnik.adresa;
            document.getElementById("phone").value= korisnik.telefon;
        }
    }
};

getRequest.open("GET", korisnikURL)
getRequest.send()

function toggle() {
    let x = document.getElementById("editKorisnik")
    if (x.style.display == "none"){
        x.style.display = "block";
    } else{
        x.style.display = "none";
    }
}

kor.addEventListener("submit", function validate(e){
    e.preventDefault()
    let validEdit = false
    if (uname.value == "" || email.value == "" || pname.value == "" || lname.value == "" || bday.value == "" || add.value == "" || phone.value == "")  {
        alert("Niste popunili sva polja, molimo Vas popunite sva polja.");
    } else {
        alert("Uspesna izmena");
        validEdit = true;
    }
    if (validEdit == true){
        let user = {}
        let uname = document.querySelector("#uname").value.trim()
        user.korisnickoIme = uname;
        let email = document.querySelector("#email").value.trim()
        user.email = email;
        let ime = document.querySelector("#name").value.trim()
        user.ime = ime;
        let prezime = document.querySelector("#lname").value.trim()
        user.prezime = prezime;
        let bday = document.querySelector("#birthdaytime").value.trim()
        user.datumRodjenja = bday;
        let adresa = document.querySelector("#add").value.trim()
        user.adresa = adresa;
        let phone = document.querySelector("#phone").value.trim()
        user.telefon = phone;

        let putRequest = new XMLHttpRequest();

        putRequest.onreadystatechange = function (e) {
            if (this.readyState == 4){
                if (this.status == 200){
                    console.log(user);
                    window.location.href = "korisnik2.html";
                }
                else{
                    alert("Greska pri izmeni");
                }
            }
        };
// koristio sam PATCH request ovde jer PUT obrise stvari koje se nisu updateovale, ne zelim da admin updatuje ocene jer nema smisla da on koriguje ocene
        putRequest.open("PATCH", korisnikURL)
        putRequest.send(JSON.stringify(user));
    }
});

remove.addEventListener('click', function(e){
    var result = confirm("Want to delete?");
    if (result) {
        alert("This user is about to get deleted.");

        let deleteRequest = new XMLHttpRequest();
    
        deleteRequest.onreadystatechange = function(e) {
            if (this.readyState == 4){
                if (this.status == 200){
                    console.log("deleted");
                    window.location.href = "../index.html";
                } else{
                    alert("Greska pri brisanju.")
                }
            }
        };   
        deleteRequest.open("DELETE", korisnikURL)
        deleteRequest.send() 
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
  