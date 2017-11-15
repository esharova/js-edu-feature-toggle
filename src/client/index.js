import 'spectre.css/dist/spectre.min.css';
import './style.css';

import buttonClickHandler from './load-data';

function createElement(tagName, text) {
    let element = document.createElement(tagName);
    element.innerText = text;
    return element;
}

button.addEventListener('click', buttonClickHandler);