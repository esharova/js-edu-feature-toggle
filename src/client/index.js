import 'spectre.css/dist/spectre.min.css';
import './style.css';

import buttonClickHandler from './load-data';
import toggleFeatureHandler from './toggle-features';

function createElement(tagName, text) {
    let element = document.createElement(tagName);
    element.innerText = text;
    return element;
}

let featuresTable = document.getElementById('features-table');

featuresTable.addEventListener('click', toggleFeatureHandler);
