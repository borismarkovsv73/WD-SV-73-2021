let firebaseUrl = "https://websv732021-default-rtdb.europe-west1.firebasedatabase.app/";

let pozoristaUrl = firebaseUrl + "pozorista.json";

let pozoristaRequest = new XMLHttpRequest();

pozoristaRequest.onreadystatechange = function () {
    if (this.readyState == 4) { 
        if (this.status == 200) { 
            console.log(this.responseText);
            let pozorista = JSON.parse(this.responseText);
            console.log(pozorista);
            let target = document.getElementById("theaters");
            let a = 1
            for (let i in pozorista) {
                let pozoriste = pozorista[i];
                let template = `<div class="theater">
                                        <div class="pic" style="background-image:url(${pozoriste.slika})"></div>
                                        <h3>${pozoriste.naziv}</h3>
                                        <h4>${pozoriste.adresa}<br>Broj Predstava: ${pozoriste.brojPredstava}</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porttitor odio sit amet erat accumsan, eget eleifend est fermentum. Mauris non tristique nisl, nec lacinia quam. Proin quis dolor vitae diam fringilla vestibulum.</p>
                                        <button><a href="theaters/theater${a}.html">Show More</a></button>
                                </div>`;
                target.innerHTML += template; 
                a += 1
            }
            target.innerHTML += `
            <div class="theater">
            <div class="pic" style="background-image:url(https://media.istockphoto.com/vectors/geometric-banner-megaphone-with-coming-soon-bubble-loudspeaker-modern-vector-id1181378326?k=20&m=1181378326&s=612x612&w=0&h=FUstjwTm6ZOYSHkusiHSsPHUV7kSGDnmRF18QDy-AO8=)"></div>
                <h3>MORE COMING SOON</h3>
                <h4>Adresa: TBA<br>Broj Predstava: TBA</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porttitor odio sit amet erat accumsan, eget eleifend est fermentum. Mauris non tristique nisl, nec lacinia quam. Proin quis dolor vitae diam fringilla vestibulum.</p>
                <button><a>COMING SOON</a></button>
            </div>
            `;
        }
    }
};

pozoristaRequest.open("GET", firebaseUrl + "pozorista.json");
pozoristaRequest.send();