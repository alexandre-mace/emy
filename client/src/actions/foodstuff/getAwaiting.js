import {
    fetch,
} from '../../utils/dataAccess';
import { ENTRYPOINT } from '../../config/entrypoint';

export function getAwaiting(user) {
        return fetch(`${ENTRYPOINT}/food_stuffs?askingToOwn=${user['@id']}&isAwaiting=true`)
            .then(response => response.json())
            .then(foodstuffsAwaiting => foodstuffsAwaiting)
            .catch(e => {
                throw e;
            });
    }
