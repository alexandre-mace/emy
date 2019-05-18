import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function getAllGiven() {
    return fetch(`${ENTRYPOINT}/food_stuffs?hasBeenGiven=true`)
        .then(response => response.json())
        .catch(e => {
            throw e;
        });
}
