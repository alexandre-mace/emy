import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function list() {
    return fetch(`${ENTRYPOINT}/users?order[points]=desc`)
        .then(response => response.json())
        .then(users => users)
        .catch(e => {
            throw e;
        });
}