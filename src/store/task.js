const TASK_UPDATED = "task/updated";
const TASK_DELETED = "task/deleted";

export function taskCompleted(id) {
    return {
        type: TASK_UPDATED,
        payload: { id: id, completed: true }
    };
}
export function titleChanged(id) {
    return {
        type: TASK_UPDATED,
        payload: { id: id, title: `New title for ${ id }` }
    };
}
export function taskDeleted(id) {
    return {
        type: TASK_DELETED,
        payload: { id: id }
    };
}

function taskReducer( state = [], action) {
    const newArr = [...state];
    switch ( action.type ) {
        case TASK_UPDATED:
            const elementIndex = newArr.findIndex((el) => el.id === action.payload.id);
            newArr[elementIndex] = {...newArr[elementIndex], ...action.payload};
            return newArr;
        case TASK_DELETED:
            return newArr.filter((el) => el.id !== action.payload.id);
        default:
            return state;
    }
}

export default taskReducer;