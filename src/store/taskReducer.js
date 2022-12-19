import * as actionTypes from "./actionTypes";

export function taskReducer(state = [], action) {
    const newArr = [...state];
    switch ( action.type ) {
        case actionTypes.taskUpdated:
            const elementIndex = newArr.findIndex((el) => el.id === action.payload.id);
            newArr[elementIndex] = {...newArr[elementIndex], ...action.payload};
            return newArr;
        case actionTypes.taskDeleted:
            return newArr.filter((el) => el.id !== action.payload.id);
        default:
            return state;
    }
}