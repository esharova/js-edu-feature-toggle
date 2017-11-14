import 'spectre.css/dist/spectre.min.css';
import './style.css';

function createElement(tagName, text) {
    let element = document.createElement(tagName);
    element.innerText = text;
    return element;
}

let el = createElement('h2', 'Клиентский JS работает!');
document.querySelector('.container').append(el);
