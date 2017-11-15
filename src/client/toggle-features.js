import superagent from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';

const requestAgent = superagentPromisePlugin.patch(superagent);

function toggleFeature(featureId, newStatus) { // Promise
    /// requestAgent...
}

function toggleFeatureHandler(event) {
    let target = event.target;

    if (target.classList.contains('form-icon')) {
        if (target.previousElementSibling.checked) {
            // снимаем фичу
        } else {
            // устанавливает фичу
        }
    }
}

export default toggleFeatureHandler;
