import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function getReceived(user) {
    return fetch(`${ENTRYPOINT}/food_stuffs?owner=${user['@id']}&hasBeenGiven=true`)
        .then(response => response.json())
        .catch(e => {
            throw e;
        });
}