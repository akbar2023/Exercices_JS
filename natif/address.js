
        let lastElementId;

        window.addEventListener("DOMContentLoaded", function () {
            const zoneDeMiseAJour = window.document.getElementById("addressArea");
            const HTMLSelectElements = window.document.getElementsByTagName("select");
            const addresses = window.document.getElementById("data");

            const urlId = `http://localhost:8084/addresses/`;
            const xhr = new XMLHttpRequest();
            xhr.open("GET", urlId);
            xhr.addEventListener("load", function () {
                const lesIds = JSON.parse(xhr.responseText);
                console.log(lesIds);
                // debugger;
                lesIds.forEach(element => {
                    console.log(element.id);
                    lastElement = element.id;
                    let option = document.createElement("option");
                    option.value = element.id;
                    option.innerHTML = `Adresse n° ${element.id}`;
                    HTMLSelectElements[0].appendChild(option);
                    let address = document.createElement("div");
                    address.innerHTML = element.id;
                    address.setAttribute("class", "addressData");
                    addresses.appendChild(address);
                });
            })
            xhr.send();






            HTMLSelectElements[0].addEventListener("change", function () {
                console.log("Change detected !");
                const selectedValue = this.options[this.options.selectedIndex].value;
                if (!isNaN(selectedValue)) {
                    // debugger;
                    console.log("Preparation de la requête");
                    const url = `http://localhost:8084/addresses/${selectedValue}`;
                    const xhr = new XMLHttpRequest();
                    xhr.open("GET", url);
                    console.log("Déclaration du comportement à la récéption du résultat");
                    xhr.addEventListener("load", function () {
                        if (200 === xhr.status) {
                            const address = JSON.parse(xhr.responseText);
                            zoneDeMiseAJour.innerHTML = `<div>Street: ${address.street}</div>`;
                            zoneDeMiseAJour.innerHTML += `<div>City: ${address.city}</div>`;
                            zoneDeMiseAJour.innerHTML += `<div>Zip Code: ${address.zipCode}</div>`;
                            zoneDeMiseAJour.innerHTML += `<div>Country: ${address.country}</div>`;
                        }
                    });
                    console.log("Envoi de la requête");
                    xhr.send();
                } else {
                    zoneDeMiseAJour.innerHTML = "";
                }
            });

            const HTMLFormElement = window.document.getElementsByTagName("form")[0];
            HTMLFormElement.addEventListener("submit", function (submitEvent) {
                submitEvent.preventDefault();
                const HTMLInputElements = window.document.getElementsByTagName("input");
                const street = HTMLInputElements[0].value;
                const zipCode = HTMLInputElements[1].value;
                const city = HTMLInputElements[2].value;
                const country = HTMLInputElements[3].value;

                const url = "http://localhost:8082/addresses";
                const body = {
                    street: street,
                    zipCode: zipCode,
                    city: city,
                    country: country
                }

                const xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                xhr.addEventListener("load", function () {
                    // if (200 === this.status) {
                    //     const data = JSON.parse(this.responseText);
                    //     if ("OK" === data.status) {
                    //         const HTMLOptionElement = window.document.createElement("option");
                    //         HTMLOptionElement.value = HTMLSelectElements[0].options.length - 1
                    //         HTMLOptionElement.innerHTML = `Address ${parseInt(HTMLOptionElement.value) + 1}`;
                    //         HTMLSelectElements[0].appendChild(HTMLOptionElement);
                    //     }
                    // }
                    const HTMLOptionElement = window.document.createElement("option");
                    // HTMLOptionElement.value = HTMLSelectElements[0].options.length;
                    HTMLOptionElement.value = ++lastElementId;
                    HTMLOptionElement.innerHTML = `Address n° ${parseInt(HTMLOptionElement.value)}`;
                    HTMLSelectElements[0].appendChild(HTMLOptionElement);
                });
                xhr.setRequestHeader("Content-Type", "application/json");
                console.log(xhr);
                xhr.send(JSON.stringify(body));
            });
        });
