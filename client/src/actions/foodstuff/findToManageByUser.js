import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function findToManageByUser(userId) {
    return fetch(`${ENTRYPOINT}/food_stuffs?provider=${userId}&isAwaiting=false&hasBeenGiven=false`)
        .then(response => response.json())
        .catch(e => {
            throw e;
        });
}