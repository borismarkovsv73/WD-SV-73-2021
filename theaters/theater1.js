let firebaseURL = "https://websv732021-default-rtdb.europe-west1.firebasedatabase.app/"
let pozoristeURL = firebaseURL + "pozorista/-MNQftJa4rskH-dBqE9Z.json"
let predstaveURL = firebaseURL + "predstave/-MNVEu6iMr2EFlQO6TW61.json"

let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function () {
    if (this.readyState == 4) { 
        if (this.status == 200) { 
            console.log(this.responseText);
            let pozoriste = JSON.parse(this.responseText);
            console.log(pozoriste)
            let target = document.getElementById("inside");
            let template = `
            <div class="pic" style="background-image:url(${pozoriste.slika})"></div>
            <h3>${pozoriste.naziv}</h3>
            <h4>${pozoriste.adresa}<br>Broj Predstava:${pozoriste.brojPredstava}</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porttitor odio sit amet erat accumsan, eget eleifend est fermentum. Mauris non tristique nisl, nec lacinia quam. Proin quis dolor vitae diam fringilla vestibulum.</p>
            `;
            target.innerHTML = template;
        }
    }
};

getRequest.open("GET", pozoristeURL)
getRequest.send()

let playsRequest = new XMLHttpRequest();

playsRequest.onreadystatechange = function () {
    if (this.readyState == 4) { 
        if (this.status == 200) { 
            let predstave = JSON.parse(this.responseText);
            let target = document.getElementById("shows");
            let a = 1
            for (let i in predstave) {
                let predstava = predstave[i];
                let template = `
                <li><a href="../plays/showB${a}.html"><i class="fa-solid fa-star"></i> ${predstava.naziv} <br><span class="extra_info">${predstava.kratakOpis}</span></a></li>
                `;
                target.innerHTML += template; 
                a += 1
            }
        }
    }
};

playsRequest.open("GET", predstaveURL)
playsRequest.send()