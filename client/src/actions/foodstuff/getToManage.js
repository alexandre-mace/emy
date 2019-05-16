import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function getToManage(user) {
    return fetch(`${ENTRYPOINT}/food_stuffs?provider=${user['@id']}&isAwaiting=false&hasBeenGiven=false`)
        .then(response => response.json())
        .catch(e => {
            throw e;
        });
}