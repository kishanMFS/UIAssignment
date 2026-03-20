export type projectType = {
    id: string,
    projectName: string,
    description: string,
    filesCount: number,
    jobsCount: number,
    createdDate: string,
    projectFiles: [],
    projectJobs: []
};

type actionType = 
        { type: "GET_PROJECT", payload: string }
    |   { type: "ADD_PROJECT", payload: projectType }
    |   { type: "DELETE_PROJECT", payload: string };

export function initialProject () {
    return JSON.parse(localStorage.getItem('projects') || '[]');
}

export function projectReducer(currentState: projectType[], action: actionType) {
    switch (action.type) {
        case 'GET_PROJECT':
            return currentState;
        case 'ADD_PROJECT':
            return [...currentState, action.payload];
        case 'DELETE_PROJECT':
            return currentState.filter((project: projectType) => project.id !== action.payload);
        default:
            return currentState;
    }
}

// export default projectReducer