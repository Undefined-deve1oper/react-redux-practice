import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    changeTitle,
    completeTask,
    createTask,
    deleteTask,
    getTasks,
    getTasksLoadingStatus,
    loadTasks
} from "./store/task";
import { getError } from "./store/errors";
import { Button, Stack, ButtonGroup, Paper, Typography, AppBar, Toolbar, Container } from "@mui/material";

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
            <AppBar position="static">
                <Toolbar>
                    <Typography variant={"h5"} component={"h3"}>App</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Button
                    variant="outlined"
                    onClick={ () => dispatch(
                        createTask( { title: "new post", completed: false } )
                    ) }
                    sx={{mt: 3, mb: 3}}
                >
                    Add Task
                </Button>
                <Stack direction="row" gap="30px" flexWrap="wrap" justifyContent="center" alignItems="stretch">
                    { state.map( ( el ) => (
                        <Paper sx={{flex: "1 1 40%", padding: "15px 30px"}} key={ el.id }>
                            <Typography variant="h6" color="primary" component="h3">{ el.title }</Typography>
                            <Typography variant="h5" color="error" component="h3" sx={{margin: "5px 0px 20px"}}>{ `Completed: ${ el.completed }` }</Typography>
                            <ButtonGroup variant="contained" color="secondary">
                                <Button variant="outlined" onClick={ () => dispatch( completeTask( el.id ) ) }>Complete</Button>
                                <Button variant="outlined" onClick={ () => dispatch( changeTitle( el.id ) ) }>change
                                                                                                              title</Button>
                                <Button variant="outlined" onClick={ () => dispatch( deleteTask( el.id ) ) }>delete
                                                                                                             task</Button>
                            </ButtonGroup>
                        </Paper>
                    ) ) }
                </Stack>
            </Container>
        </>
    )
}

export default App;