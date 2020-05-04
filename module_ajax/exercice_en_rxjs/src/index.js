
import { fromEvent, merge } from 'rxjs';
import { ajax } from 'rxjs/ajax';


const auChargement$ = fromEvent(window, "DOMContentLoaded");

auChargement$.subscribe(() => {

    const addressForm = document.getElementById("addressForm");
    const addressButton = document.getElementById("addressButton");
    const addressList = document.getElementById("address-list");

    // _________________ DOM Initial Data Load ____________________


    const getAddresses = ajax("http://localhost:8082/addresses");

    getAddresses.subscribe(data => {
        // console.log(data);
        // debugger;
        let addresses = data.response;

        if (data.status == 200) {
            addresses.forEach(address => {
                let option = document.createElement("option");
                option.value = address.id;
                option.innerHTML = address.street;
                // Address selector
                addressList.appendChild(option);
            });
        }
    });

    // debugger
    let zipCode = document.getElementById("zipCode");
    let street = document.getElementById("street");
    let city = document.getElementById("city");
    let country = document.getElementById("country");

    let inputs = [zipCode, street, street, city, country];


    // _______________ Form Validation ________________

    function notDisable() {
        addressButton.disabled = (zipCode.value === "" || street.value === "" || city.value == "" || country.value == "");
    }

    // zipCode.oninput = notDisable; // natif
    const zipCode$ = fromEvent(zipCode, "input");
    const steet$ = fromEvent(street, "input");
    const city$ = fromEvent(city, "input");
    const country$ = fromEvent(country, "input");

    const allInputs$ = merge(zipCode$, steet$, city$, country$);

    allInputs$.subscribe(notDisable);


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

            for(let i = 0; i < inputs.length; i++) {
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
                window.alert("new address added successfully!")
            }

        })

    });
});


// _____________________ Create User _____________________


auChargement$.subscribe(() => {

    const userForm = document.getElementById("userForm");
    const userButton = document.getElementById("userButton");

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let birthDate = document.getElementById("birthDate");
    let selectedAddress = document.getElementById("address-list");

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
            debugger;
            console.log("--Success!", data.response);
        })
        
    })

})