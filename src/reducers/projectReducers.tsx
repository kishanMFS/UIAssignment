
function projectReducer(state: any, action: any) {
    switch (action.type) {
        case 'ADD_PROJECT':
            return [...state, action.payload];
        case 'DELETE_PROJECT':
            return state.filter((project: any) => project.id !== action.payload);
        default:
            return state;
    }
}

export default projectReducer