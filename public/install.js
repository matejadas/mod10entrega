'use strict'

// VARIABLES
let deferredInstallPrompt = null;
const installButton = document.getElementById("instalar");

// FUNCIONES
function installPWA(ev) {
    // Preguntamos al usuario si desea instalar la aplicación
    deferredInstallPrompt.prompt();

    // Volvemos a ocultar el botón
    ev.srcElement.setAttribute("hidden", true);

    // Esta parte nos permitiría rastrear la acción del usuario y hacer algo más si fuera necesario
    deferredInstallPrompt.userChoice.then((choice) => {
        if(choice.outcome === "accepted") {
            console.log("Instalación aceptada");
        } else {
            console.log("Instalación rechazada");
        }
        deferredInstallPrompt = null;
    })
}

function saveBeforeInstallPromptEvent(ev) {
    // Nos guardamos el evento
    deferredInstallPrompt = ev;

    // Mostramos el botón
    installButton.removeAttribute("hidden");
}

// Cuando la aplicación ya ha sido instalada
function logAppInstalled(ev) {
    console.log("Aplicación instalada");
}

// EVENTOS

// En el click del botón llamamos al método installPWA
installButton.addEventListener("click", installPWA);

window.addEventListener("beforeinstallprompt", saveBeforeInstallPromptEvent);

window.addEventListener("appinstalled", logAppInstalled);