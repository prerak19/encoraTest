
const initialstate = {
    notes: [
        { id: 1, title: "Country", body: "Country Details" },
    ]
};

const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case 'GET_NOTES':
            return {
                ...state
            };
        case 'ADD_NOTES':
            return {
                ...state,
                notes: state.notes.concat(action.payload)
            };
        case 'EDIT_NOTES':
            return {
                ...state,
                notes: state.notes.map(
                    (content, i) => content.id === action.payload.id ? { ...content, title: action.payload.title, body: action.payload.body, id: action.payload.id }
                        : content)
            };
        case 'DELETE_NOTES':
            return {
                ...state,
                notes: state.notes.filter(item => item.id !== action.payload)
            };
        default:
            return state;
    }
};

export default reducer;   