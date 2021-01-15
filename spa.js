let profil = {
    "gomb":document.getElementById("karakter_gomb"),
    "oldal":document.getElementById("profil_oldal")
}

let kaland = {
    "gomb": document.getElementById("kaland_gomb"),
    "oldal": document.getElementById("kaland_oldal")
}

function init(){
    switch_to_profil();
}

function switch_to_tortenet(){
    kaland.oldal.style.display = "block";
    kaland.gomb.style.display = "none";
    profil.oldal.style.display = "none";
    profil.gomb.style.display = "inline";
}
function switch_to_profil(){
    kaland.oldal.style.display = "none";
    kaland.gomb.style.display = "inline";
    profil.oldal.style.display = "block";
    profil.gomb.style.display = "none";
}

init();