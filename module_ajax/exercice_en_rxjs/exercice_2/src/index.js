
import { fromEvent, merge } from 'rxjs';
import { ajax } from 'rxjs/ajax';


const auChargement$ = fromEvent(window, "DOMContentLoaded");

auChargement$.subscribe(() => {

    const addressForm = document.getElementById("addressForm");
    const addressButton = document.getElementById("addressButton");
    const addressList = document.getElementById("address-list");
    const search = document.getElementById("search-address");
    const resultList = document.getElementById("result-list");
    const personAddress = document.getElementById("person-address");
    const selectedAddress = document.getElementById("person-address-id");

    // _________________ Search Address ___________________
    const search$ = fromEvent(search, "input");

    search$.subscribe(() => {
        resultList.innerHTML = "";
        // debugger;
        const searchAddress$ = ajax(`http://localhost:8082/addresses/search/${search.value}`);
        searchAddress$.subscribe(result => {
            if (200 === result.status) {
                const searchResults = result.response;

                // debugger
                searchResults.forEach(address => {
                    const listElement = document.createElement("li");
                    listElement.value = address.id;
                    listElement.innerHTML = address.street;
                    listElement.setAttribute("class", "search-results-li");
                    listElement.onclick = () => {
                        selectedAddress.value = address.id;
                        personAddress.innerHTML =
                            address.street + "<br>" +
                            address.zipCode + "<br>" +
                            address.city + "<br>" +
                            address.country;
                    }
                    resultList.appendChild(listElement);
                })
            }
        })
    })


    // debugger
    let zipCode = document.getElementById("zipCode");
    let street = document.getElementById("street");
    let city = document.getElementById("city");
    let country = document.getElementById("country");

    let inputs = [zipCode, street, street, city, country];


    // _______________ Form Validation ________________

    function validForm() {
        addressButton.disabled = (zipCode.value === "" || street.value === "" || city.value == "" || country.value == "");
    }

    // zipCode.oninput = validForm; // natif
    const zipCode$ = fromEvent(zipCode, "input");
    const steet$ = fromEvent(street, "input");
    const city$ = fromEvent(city, "input");
    const country$ = fromEvent(country, "input");

    const allInputs$ = merge(zipCode$, steet$, city$, country$);

    allInputs$.subscribe(validForm);


    // __________________ Form Add Address ____________________

    const formSubmit$ = fromEvent(addressForm, 'submit').subscribe(() => {

        event.preventDefault();

        ajax({
            url: "http://localhost:8082/addresses",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                zipCode: zipCode.value,
                street: street.value,
                city: city.value,
                country: country.value,
            }
        }).subscribe(data => {
            // debugger
            console.log("--Success!", data.response);

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = "";
            }

            // ____________ Auto Add new addres to the options list ______________

            if (200 === data.status) {
                let newAddress = data.response;
                let newOption = document.createElement("option");
                newOption.value = newAddress.id;
                newOption.innerHTML = newAddress.street;
                // Address selector
                addressList.appendChild(newOption);
                window.alert("new address added successfully!");
            }

        })

    });
});


// _____________________ Create User _____________________


auChargement$.subscribe(() => {
    const userForm = document.getElementById("userForm");
    const userButton = document.getElementById("userButton");
    const search = document.getElementById("search-address");

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const birthDate = document.getElementById("birthDate");
    const selectedAddress = document.getElementById("person-address-id");

    const inputs = [firstName, lastName, birthDate];

    function checkForm() {
        // debugger
        userButton.disabled = (firstName.value === "" || lastName.value === "" || birthDate.value === "" || selectedAddress.value === "");
    }

    const firstName$ = fromEvent(firstName, "input");
    const lastName$ = fromEvent(lastName, "input");
    const birthDate$ = fromEvent(birthDate, "input");
    setInterval(() => { // for address check
        checkForm()
    }, 1000)
    const search$ = fromEvent(search, "input");
    // const selectedAddress$ = fromEvent(selectedAddress, "input");

    const allInputs$ = merge(firstName$, lastName$, birthDate$);

    allInputs$.subscribe(checkForm);

    fromEvent(userForm, "submit").subscribe(() => {
        event.preventDefault();
        ajax({
            url: "http://localhost:8082/persons/panda",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                firstName: firstName.value,
                lastName: lastName.value,
                birthDate: birthDate.value,
                address: selectedAddress.value
            }
        }).subscribe(data => {
            // debugger;
            console.log("--Success!", data.response);
            for (let i = 0; i < inputs.length; i++) {
                // debugger
                inputs[i].value = "";
            }
            userButton.disabled = true;

            if (data.status === 200) {
                alert("new person was added successfully!!");
            }
        })

    })

})