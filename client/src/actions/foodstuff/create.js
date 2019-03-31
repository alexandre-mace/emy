import { SubmissionError } from 'redux-form';
import { fetch } from '../../utils/dataAccess';

export function error(error) {
    return { type: 'FOODSTUFF_CREATE_ERROR', error };
}

export function loading(loading) {
    return { type: 'FOODSTUFF_CREATE_LOADING', loading };
}

export function success(created) {
    return { type: 'FOODSTUFF_CREATE_SUCCESS', created };
}

function imageFetch(values) {
    const body = new FormData();
    body.append('file', values['image']);
    fetch('http://localhost:8080/images', { body, method: 'POST' })
        .then(
            response => {
                response.json().then(
                    response => {
                        values['image'] = '/images/' + response.id
                    }
                )
            }
        )
}

function foodstuffFetch(values, dispatch) {
    return fetch('/food_stuffs', { method: 'POST', body: JSON.stringify(values) })
        .then(response => {
            dispatch(loading(false));

            return response.json();
        })
        .then(retrieved => dispatch(success(retrieved)))
        .catch(e => {
            dispatch(loading(false));

            if (e instanceof SubmissionError) {
                dispatch(error(e.errors._error));
                throw e;
            }
            dispatch(error(e.message));
        });
}

export function create(values) {
    return dispatch => {
        dispatch(loading(true));
        if(values.hasOwnProperty('image') && values['image'] instanceof File) {
            imageFetch(values)
                .then (
                response => {
                    foodstuffFetch(values, dispatch);
                })
        } else {
            foodstuffFetch(values);
        }
    };
}

export function reset() {
    return dispatch => {
        dispatch(loading(false));
        dispatch(error(null));
    };
}
