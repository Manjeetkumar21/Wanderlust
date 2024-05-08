
document.addEventListener("DOMContentLoaded", ()=> {
    console.log("Fetch working")
    const country = document.getElementById("countries");

    // Fetch countries from REST Countries API
    fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
            let option = "<option selected disabled>Select the Country</option>";
            let countryData = data.filter((country)=>{
                return country.name.common
            })

            let countryDataUpdate = new Array();
            for(i=0; i<250; i++){
                countryDataUpdate[i] = countryData[i].name.common;
            }

            
            countryDataUpdate.sort();

            for(i=0; i<countryDataUpdate.length; i++){
                
                option+= `<option value='${countryDataUpdate[i]}'>${countryDataUpdate[i]}</option>`;
                
            }

            country.innerHTML = option;
        })
        .catch(error => console.error("Error fetching countries:", error));
});



