import 'spectre.css/dist/spectre.min.css';
import './style.css';

import buttonClickHandler from './load-data';

function createElement(tagName, text) {
    let element = document.createElement(tagName);
    element.innerText = text;
    return element;
}

function clickHandler() {

}

let el = createElement('h2', 'Клиентский JS работает!');
document.querySelector('.container').append(el);


button.addEventListener('click', buttonClickHandler);