import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function findReceivedByUser(userId) {
    return fetch(`${ENTRYPOINT}/food_stuffs?owner=${userId}&hasBeenGiven=true`)
        .then(response => response.json())
        .catch(e => {
            throw e;
        });
}