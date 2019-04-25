import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function getToConfirm(user) {
    return fetch(`${ENTRYPOINT}/food_stuffs?provider=${user['@id']}&isAwaiting=true`)
        .then(response => response.json())
        .then(foodstuffsToConfirm => foodstuffsToConfirm)
        .catch(e => {
            throw e;
        });
}