export function getNotes() {
    return dispatch => {
        return dispatch({
            type: 'GET_NOTES'
        });
    }
};

export function addNotes(data) {
    return dispatch => {
        return dispatch({
            type: 'ADD_NOTES',
            payload: data,
            rc: 0,
        });
    }
};

export function editNotes(data) {
    return dispatch => {
        return dispatch({
            type: 'EDIT_NOTES',
            payload: data,
            rc: 0,
        });
    }
};

export function deleteNotes(noteId) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_NOTES',
            payload: noteId,
            rc: 0,
        });
    }
};