import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function findAllByUser(userId) {
    return fetch(`${ENTRYPOINT}/food_stuff_offers?owner=${userId}&status=waiting`)
        .then(response => response.json())
        .catch(e => {
            throw e;
        });
}