import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function findGivenByUser(userId) {
    return fetch(`${ENTRYPOINT}/food_stuffs?provider=${userId}&hasBeenGiven=true`)
        .then(response => response.json())
        .catch(e => {
            throw e;
        });
}