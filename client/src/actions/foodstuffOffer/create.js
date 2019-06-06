import { fetch } from '../../utils/dataAccess';

export function create(values) {
    return fetch('/food_stuff_offers', { method: 'POST', body: JSON.stringify(values) })
        .then(response => response.json())
        .catch(e => {
            throw e;
        });}

