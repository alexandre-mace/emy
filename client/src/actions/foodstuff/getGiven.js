import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function getGiven(user) {
    return fetch(`${ENTRYPOINT}/food_stuffs?provider=${user['@id']}&hasBeenGiven=true`)
        .then(response => response.json())
        .catch(e => {
            throw e;
        });
}