let searchInput = document.getElementById("searchInput");
let resultCountries = document.getElementById("resultCountries");
let spinner = document.getElementById("spinner");

let searchval = "";
let countriesList = [];

function createAndAppendCountry(country) {
    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11" , "col-md-5" , "mr-auto" , "ml-auto" , "d-flex" , "flex-row");
    resultCountries.appendChild(countryEl);
    
    let countryImg = document.createElement("img");
    countryImg.src = country.flag;
    countryImg.classList.add("country-flag" , "mt-auto" , "mb-auto");
    countryEl.appendChild(countryImg);
    
    let textEl = document.createElement("div");
    textEl.classList.add("d-flex" , "flex-column" , "ml-4");
    countryEl.appendChild(textEl);
    
    let countryName = document.createElement("p");
    countryName.textContent = country.name;
    countryName.classList.add("country-name");
    textEl.appendChild(countryName);
    
    let countryPopu = document.createElement("p");
    countryPopu.textContent = country.population;
    countryPopu.classList.add("country-population");
    textEl.appendChild(countryPopu);
}

function displayCountriesList() {
    resultCountries.textContent = "";
    for (let country of countriesList) {
        let countryName = country.name;

        if (countryName.toLowerCase().includes(searchval.toLowerCase())) {
            createAndAppendCountry(country);
        }
    }
}

function getCountries() {

    let url = "https://apis.ccbp.in/countries-data";

    let options = {
        method: "GET"
    };

    spinner.classList.toggle("d-none");

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            countriesList = jsonData;
            spinner.classList.toggle("d-none");
            displayCountriesList();

        });
}

function onSearching(event){
    searchval = event.target.value;
    displayCountriesList();
}

getCountries();
searchInput.addEventListener("keyup", onSearching);
