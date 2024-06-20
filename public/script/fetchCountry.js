document.addEventListener("DOMContentLoaded", () => {
    console.log("Fetch working");

    const countrySelect = document.getElementById("countries");
    const selectedCountryFromBackend = countrySelect.getAttribute('data-selected-country');

    fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
            let options = "<option selected disabled>Select the Country</option>";
            let countryData = data.map(country => country.name.common);

            countryData.sort();

            countryData.forEach(countryName => {
                options += `<option value="${countryName}">${countryName}</option>`;
            });

            countrySelect.innerHTML = options;

            if (selectedCountryFromBackend) {
                countrySelect.value = selectedCountryFromBackend;
            }
        })
        .catch(error => console.error("Error fetching countries:", error));
});
