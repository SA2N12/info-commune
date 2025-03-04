async function callDepartements(){
    let query = await fetch("https://geo.api.gouv.fr/departements");
    let response = await query.json();
    let select = document.querySelector('#dep');

    for (let i=0; i < response.length; i++){
        let option = document.createElement('option');
        option.value = response[i].code;
        option.text = response[i].code + " " + response[i].nom;
        select.appendChild(option);
    }

    select.addEventListener('change', async ()=>{
        let selectedDepartement = select.options[select.selectedIndex].value;
        await callCities(selectedDepartement);
    })
}

async function callCities(departementCode){
    let queryCommune = await fetch(`https://geo.api.gouv.fr/departements/${departementCode}/communes`);
    let responseCommune = await queryCommune.json();
    let select = document.querySelector('#cities');
    let city = document.querySelector('#city');

    select.innerHTML= '';
    for (let i=0; i < responseCommune.length; i++){
        let option = document.createElement('option');
        option.value = responseCommune[i].code;
        option.text = responseCommune[i].nom;
        select.appendChild(option);
    }

    select.addEventListener('change', async ()=>{
        let selectedCity = select.options[select.selectedIndex].value;
        await callCityInfo(selectedCity);
    })
}

async function callCityInfo(cityCode){
    let query = await fetch(`https://geo.api.gouv.fr/communes/${cityCode}`);
    let response = await query.json();
    let infoCity = document.querySelector("#info-city")

    infoCity.innerHTML = "nom : " + response.nom + "<br>population : " + response.population + " habitants" + "<br> code postal : " + response.codesPostaux[0];
}

callDepartements();