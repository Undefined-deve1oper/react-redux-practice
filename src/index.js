import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
    createTask,
    changeTitle,
    completeTask, deleteTask,
    getTasks,
    getTasksLoadingStatus,
    loadTasks,
} from "./store/task";
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "./store/store";
import { getError } from "./store/errors";

const store = configureStore();

const App = () => {
    const state = useSelector( getTasks() );
    const isLoading = useSelector( getTasksLoadingStatus() );
    const error = useSelector( getError() );
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( loadTasks() );
    }, [] );

    if ( isLoading ) {
        return <h1>Loading...</h1>;
    }
    if ( error ) {
        return <p>{ error }</p>
    }

    return (
        <>
            <h1>App</h1>
            <button onClick={ () => dispatch(createTask({title: "new post", completed: false})) }>Add Task</button>
            <ul>
                { state.map( ( el ) => (
                    <li key={ el.id }>
                        <p>{ el.title }</p>
                        <p>{ `Completed: ${ el.completed }` }</p>
                        <button onClick={ () => dispatch( completeTask( el.id ) ) }>Complete</button>
                        <button onClick={ () => dispatch( changeTitle( el.id )) }>change title</button>
                        <button onClick={ () => dispatch(deleteTask( el.id )) }>delete task</button>
                        <hr/>
                    </li>
                ) ) }
            </ul>
        </>
    )
}

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
    <React.StrictMode>
        <Provider store={ store }>
            <App/>
        </Provider>
    </React.StrictMode>
);