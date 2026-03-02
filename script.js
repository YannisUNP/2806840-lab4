const button = document.getElementById("search-btn");
const input = document.getElementById("country-input");
const spinner = document.getElementById("loading-spinner");
const error = document.getElementById("error-message");
const info = document.getElementById("country-info");
const border = document.getElementById("bordering-countries");

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
        const data = await response.json();

        console.log(data[0]);
        
        const country = data[0];

        info.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">`;

        const borderData = country.borders;
        if(!borderData){
            border.innerHTML = "No bordering countries";
        }

        border.innerHTML = "<h3>Bordering Countries:<h3>";
        borderData.forEach(async (code) => {
            try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
            const data = await response.json();
            const borderCountry = data[0];

            border.innerHTML += `
                <img src="${borderCountry.flags.svg}" 
                    alt="${borderCountry.name.common} flag"
                    width="60">
                <p>${borderCountry.name.common}</p>
            `;

            } catch (err) {
                console.error(err);
            }
        });
        
    }catch(e){
        error.textContent = "Input an actual country pleaseee";
        error.classList.remove("hidden");
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
