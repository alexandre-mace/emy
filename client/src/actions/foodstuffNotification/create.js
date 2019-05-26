import { fetch } from '../../utils/dataAccess';

export function create(values) {
    fetch('/food_stuff_notifications', { method: 'POST', body: JSON.stringify(values) })
        .then(response => {
            return response.json()
        })
        .catch(e => {
            throw e;
        });}

