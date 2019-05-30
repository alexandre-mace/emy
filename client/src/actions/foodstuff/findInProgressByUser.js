import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function findInProgressByUser(userId) {
    return fetch(`${ENTRYPOINT}/food_stuff_offers?owner=${userId}&status=accepted`)
        .then(response => response.json())
        .catch(e => {
            throw e;
        });
}