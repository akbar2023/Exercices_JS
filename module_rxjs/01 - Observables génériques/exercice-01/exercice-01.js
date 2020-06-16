import {fromEvent} from "rxjs";


window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const element = document.createElement("p");
    element.setAttribute("id", "arrows");
    element.innerHTML = "Hello!!"
    document.body.appendChild(element);


    // document.addEventListener("keydown", function (event) {
    //     // debugger
    //     console.log(event.code);
    // })

    fromEvent(window, "keydown").subscribe(event => {
        console.log(event.code)

        const code = event.code;
        switch (code) {
            case "ArrowDown":
                element.innerHTML = "&darr;"
                break;
            case "ArrowUp":
                element.innerHTML = "&uarr;"
                break;
            case "ArrowLeft":
                element.innerHTML = "&larr;"
                break;
            case "ArrowRight":
                element.innerHTML = "&rarr;"
                break;
            default:
                console.log(code);

        }
    })

})


