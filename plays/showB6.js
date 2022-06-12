let firebaseURL = "https://websv732021-default-rtdb.europe-west1.firebasedatabase.app/"

let predstavaURL = firebaseURL + "predstave/-MNVEu6iMr2EFlQO6TW61/-MNQftJa4rskH-dBqE9Z5.json" 
let predstaveURL = firebaseURL + "predstave/-MNVEu6iMr2EFlQO6TW61.json"

let showID = getParamValue("id")

let show = document.getElementById("editShow")

var remove = document.getElementById("delete")
var title = document.getElementById("name");
var code = document.getElementById("code");
var disc = document.getElementById("disc");
var longdisc = document.getElementById("longdisc")
var length = document.getElementById("len");
var genre = document.getElementById("gen");
var price = document.getElementById("price");
var nopep = document.getElementById("nopep");
var img = document.getElementById("img")

let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function () {
    if (this.readyState == 4) { 
        if (this.status == 200) { 
            console.log(this.responseText);
            let predstava = JSON.parse(this.responseText);
            console.log(predstava)
            let target = document.getElementById("inside");
            let template = `
                <div id="wrap">
                <section id="left_play" style='background-image:url(${predstava.slika})'></section>
                <section id="right">
                    <h2>${predstava.naziv}<span class="playcode">${predstava.kod}</span></h2><br>
                    <h3><span class="about_play">"${predstava.kratakOpis}"</span></h3>
                    <p>${predstava.opis}</p>
                    <h3><span class="about_play">Information about the play<span></h3>
                    <p>Length: ${predstava.trajanje}min<br>Genre: ${predstava.zanr}<br>Ticket Price: ${predstava.cena}<br>Number of Seats: ${predstava.maxOsobe}<br>Average Rating: <i class="fa-solid fa-star"></i> ${predstava.ocena}</p>
                </section>
                </div>
                `;
            target.innerHTML = template;
            document.getElementById("name").value= predstava.naziv;
            document.getElementById("code").value= predstava.kod;
            document.getElementById("disc").value= predstava.kratakOpis;
            document.getElementById("len").value= predstava.trajanje;
            document.getElementById("gen").value= predstava.zanr;
            document.getElementById("longdisc").value = predstava.opis
            document.getElementById("price").value= predstava.cena;
            document.getElementById("nopep").value= predstava.maxOsobe;
            document.getElementById("img").value= predstava.slika;
        }
    }
};

getRequest.open("GET", predstavaURL)
getRequest.send()

function toggle() {
    let x = document.getElementById("editShow")
    if (x.style.display == "none"){
        x.style.display = "block";
    } else{
        x.style.display = "none";
    }
}

show.addEventListener("submit", function validate(e){
    e.preventDefault()
    let validEdit = false
    if (title.value == "" || code.value == "" || disc.value == "" || length.value == "" || genre.value == "" || price.value == "" || nopep.value == "" || img.value == "")  {
        alert("Niste popunili sva polja, molimo Vas popunite sva polja.");
    } else {
        alert("Uspesna izmena");
        validEdit = true;
    }
    if (validEdit == true){
        let show = {}
        let naziv = document.querySelector("#name").value.trim()
        show.naziv = naziv;
        let kod = document.querySelector("#code").value.trim()
        show.kod = kod;
        let kratakOpis = document.querySelector("#disc").value.trim()
        show.kratakOpis = kratakOpis;
        let trajanje = document.querySelector("#len").value.trim()
        show.trajanje = trajanje;
        let zanr = document.querySelector("#gen").value.trim()
        show.zanr = zanr;
        let longdisc = document.querySelector("#longdisc").value.trim()
        show.opis = longdisc
        let slika = document.querySelector("#img").value.trim()
        show.slika = slika;
        let cena = document.querySelector("#price").value.trim()
        show.cena = cena;
        let maxOsobe = document.querySelector("#nopep").value.trim()
        show.maxOsobe = maxOsobe;

        let putRequest = new XMLHttpRequest();

        putRequest.onreadystatechange = function (e) {
            if (this.readyState == 4){
                if (this.status == 200){
                    console.log(show);
                    window.location.href = "showB6.html";
                }
                else{
                    alert("Greska pri izmeni");
                }
            }
        };
// koristio sam PATCH request ovde jer PUT obrise stvari koje se nisu updateovale, ne zelim da admin updatuje ocene jer nema smisla da on koriguje ocene
        putRequest.open("PATCH", predstavaURL)
        putRequest.send(JSON.stringify(show));
    }
});

remove.addEventListener('click', function(e){
    var result = confirm("Want to delete?");
    if (result) {
        alert("This play is about to get deleted.");

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
        deleteRequest.open("DELETE", predstavaURL)
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
  