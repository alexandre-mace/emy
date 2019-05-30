import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function findAwaiting(userId) {
    return fetch(`${ENTRYPOINT}/food_stuff_offers?askingUser=${userId}&status=waiting`)
        .then(response => response.json())
        .catch(e => {
            throw e;
        });
}