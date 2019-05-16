import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function list() {
    return fetch(`${ENTRYPOINT}/users?order[points]=desc`)
        .then(response => response.json())
        .catch(e => {
            throw e;
        });
}