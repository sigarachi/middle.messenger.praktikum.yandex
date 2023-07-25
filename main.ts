
import {matchRoute} from './src'

const contentMain = document.getElementById('app');

function handleLocation() {
    const pathName = window.location.pathname;
    contentMain.innerHTML = "";
    const htmlTemplate = matchRoute(pathName);
    contentMain.innerHTML = htmlTemplate();
}
function init() {
    window.addEventListener("popstate", handleLocation);
    window.addEventListener("load", handleLocation);
}

init();
