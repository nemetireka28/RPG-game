let stats = {
    "penz": 100,
    "szajmeret": 5,
    "mellekmerete": 5,
    "botox": 5,
}

let available_points = 0;

let level = 0;

let leveldescription = [
    ["Egy átlagos szép fiatal lány vagy!", "0.jpg"],
    ["Még jó úton jársz, de lassan le kéne állni azokkal a műtétekkel!","1.jpg"],
    ["Na jó ez már kezd sok lenni...","2.jpg"],
    ["Itt a vége, inkább keress egy pszichológust!", "3.jpg"]
];

let profile_stats = {
    "kepek": document.getElementById("kepek"),
    "leiras": document.getElementById("leiras"),
    "penz": document.getElementById("profil_penz"),
    "szajmeret": document.getElementById("profil_szajmeret"),
    "mellekmerete": document.getElementById("profil_mellekmerete"),
    "botox": document.getElementById("profil_botox"),
    "kovetkezo_szint": document.getElementById("kovi_szint")
}

function refreshProfileStats(){
    profile_stats.kepek.src = leveldescription[level][1]
    profile_stats.penz.innerHTML = stats.penz;
    profile_stats.szajmeret.innerHTML = stats.szajmeret;
    profile_stats.mellekmerete.innerHTML = stats.mellekmerete;
    profile_stats.botox.innerHTML = stats.botox;
    profile_stats.leiras.innerHTML = leveldescription[level][0];
    profile_stats.kovetkezo_szint.innerHTML = 10;
    gombok();
}

refreshProfileStats();

function update_szajmeret(){
    if(available_points > 0){
        available_points--;
        stats.szajmeret += 5;
        refreshProfileStats();
    }
}
function update_mellmeret(){
    if(available_points > 0){
        available_points--;
        stats.mellekmerete += 5;
        refreshProfileStats();
    }
}
function update_botox(){
    if(available_points > 0){
        available_points--;
        stats.botox += 5;
        refreshProfileStats();
    }
}

function gombok(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function kovetkezo_szint(){
    if(level < leveldescription.length - 1){
        available_points += 5;
        level++;
        refreshProfileStats();
    }
}

/* ADVENTURE */

let tortenet = document.getElementById("tortenet");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function sugardaddy(){
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.szajmeret;

    if(sebzes_eselye <= 0) sebzes_eselye = 1;

    if(szazalek >= sebzes_eselye){
        // story.innerHTML += "Megsebződtél (-1 élet)<br>";
        // stats.life -= 1;
        harc("Másik picsa", 5, 100);
        refreshProfileStats();
    }else{
        tortenet.innerHTML += "Meg van a pénz! (+100)<br>";
        stats.penz += 100;
        refreshProfileStats();
    }
}

function harc(e_nev, e_fajdalom, e_penz){
    tortenet.innerHTML += "Munka közben megtámadott téged egy " + e_nev + "!<br>";

    let counter = 0;
    let enemy_attack = true;

    do {
        counter++;
        if(enemy_attack){
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 - stats.botox;
            if(sebzes_eselye <= 0) sebzes_eselye = 1;

            if(szazalek >= sebzes_eselye){
                tortenet.innerHTML += "A picsa megpróbálja kilyukasztani az új melled! (-"+e_fajdalom+" nagyság)<br>";
                stats.mellekmerete -= e_fajdalom;
                refreshProfileStats();
            }else{
                tortenet.innerHTML += "Sikeresen hárítottál!<br>";
            }
            
        }else{
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 + stats.szajmeret;
            if(sebzes_eselye >= 100) sebzes_eselye = 99;
            if(szazalek >= sebzes_eselye){
                tortenet.innerHTML += "Megmutattad a kis lotyónak! ("+e_nev+" -"+stats.penz+" pénz)<br>";
                e_penz -= stats.penz;
                tortenet.innerHTML += e_nev + "-nek maradt " + e_penz;
                refreshProfileStats();
            }else{
                tortenet.innerHTML += "Nem tudtál visszavágni a ribinek!<br>";
            }
        }

        enemy_attack = !enemy_attack;
        
    } while (counter <=  10);
}