import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function getOne(userId) {
    return fetch(`${ENTRYPOINT}${userId}`)
        .then(response => response.json())
        .catch(e => {
            throw e;
        });
}