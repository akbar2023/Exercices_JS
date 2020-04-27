
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { delay } from 'rxjs/operators';


const auChargement = fromEvent(window, "DOMContentLoaded");

auChargement.subscribe(() => {

    const form = document.getElementById("addressForm");
    const button = document.getElementById("button");
    // button.setAttribute("disabled", true);
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

    debugger
    if("" === form.zipCode) {
        button.setAttribute("disabled", true);
    }

    // __________________ Form Add ____________________

    //const formSubmit = fromEvent(button, 'click');
    const formSubmit = fromEvent(form, 'submit').subscribe((event) => {

        event.preventDefault();
        let zipCode = document.getElementById("zipCode");
        let street = document.getElementById("street");
        let city = document.getElementById("city");
        let country = document.getElementById("country");


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
        }).subscribe(info => {
            // debugger
            console.log("--Success!", info.response);
            zipCode.value = "";
            street.value = "";
            city.value = "";
            country.value = "";

            // ____________ Auto Add new addres to the options ______________

            if (200 == info.status) {
                // debugger;
            let newAddress = info.response;
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
