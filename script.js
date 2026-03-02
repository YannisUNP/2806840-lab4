fetch(`https://restcountries.com/v3.1/name/Italy`);
const button = document.getElementById("search-btn");
const input = document.getElementById("country-input");
const spinner = document.getElementById("loading-spinner");
const error = document.getElementById("error-message");
const info = document.getElementById("country-id");

button.addEventListener("click", function(){
    let countryName = input.value;
    loadData(countryName);
})
input.addEventListener("keydown", function(event){
    if(event.key === 'Enter'){
        button.click();
    }
})
async function loadData(countryName){
    try{
        showSpinner();
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const country = await response.json();

        if (!country.ok) {
            error.textContent = "Input an actual country pleaseee";
        }else{
            error.textContent = "";
        }
        console.log(country);
        info.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">`;
        console.log(country);
    }catch(e){
        error.textContent = "Input an actual country pleaseee";
    } finally{
        hideSpinner();
    }
}
function showSpinner(){
    spinner.style.display = "block";
}
function hideSpinner() {
    spinner.style.display = "none";
}
