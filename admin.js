let firebaseUrl = "https://websv732021-default-rtdb.europe-west1.firebasedatabase.app/";

let korisniciURL = firebaseUrl + "korisnici.json";

let korisniciRequest = new XMLHttpRequest();

korisniciRequest.onreadystatechange = function () {
    if (this.readyState == 4) { 
        if (this.status == 200) { 
            console.log(this.responseText);
            let korisnici = JSON.parse(this.responseText);
            console.log(korisnici);
            let target = document.getElementById("korisniciTabela");
            let a = 1
            for (let i in korisnici) {
//ovaj mali deo koda sluzi samo da ne prikaze novoregistrovane korisnike jer ne postoji stranica za njih, iako ti korisnici postoje na bazi i moze se ulogovati na njih
                if (a == 6){
                    break
                }
                let korisnik = korisnici[i];
                let template = `
                <tr>
                    <td><a href='korisnici/korisnik${a}.html'>${korisnik.korisnickoIme}</a></td>
                    <td>${korisnik.email}</td>
                    <td>${korisnik.ime}</td>
                    <td>${korisnik.prezime}</td>
                    <td>${korisnik.datumRodjenja}</td>
                    <td>${korisnik.adresa}</td>
                    <td>${korisnik.telefon}</td>
                </tr>
                `;
                target.innerHTML += template; 
                a += 1
            }
        }
    }
};

korisniciRequest.open("GET", korisniciURL);
korisniciRequest.send();