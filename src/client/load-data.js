import superagent from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';

const requestAgent = superagentPromisePlugin.patch(superagent);

function buttonClickHandler() {
    requestAgent
        .get('/health')
        .then(data => {
            button.innerHTML = 'Жмя и работает!'
        })
        .catch(error => {
            console.log(error);
        })
}

export default buttonClickHandler;