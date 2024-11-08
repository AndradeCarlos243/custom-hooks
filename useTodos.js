import { useEffect, useReducer } from 'react';
import { todoReducer } from '../Components/useReducer/todoReducer';

export const useTodos = () => { 
    const initialState = [];
    const init = () => JSON.parse(localStorage.getItem('todos')) || [];
    const [ todos, dispatchTodo ] = useReducer( todoReducer, initialState, init );

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    , [todos]);

    const handleNewTodo = (newTodo) => {
        const registerTodo = {
            type: 'add',
            payload: newTodo
        }
        dispatchTodo( registerTodo );
    }

    const handleDeleteToDo = ( id ) => {
        const deleteTodo = {
            type: 'delete',
            payload: id
        };
        dispatchTodo( deleteTodo );
    }

    const handleToggleToDo = ( id ) => {
        const toggleTodo = {
            type: 'toggle',
            payload: id
        };
        dispatchTodo( toggleTodo );
    }

    return {
        todos,
        handleNewTodo,
        handleDeleteToDo,
        handleToggleToDo,
        pendingTotal: todos.filter( todo => !todo.done ).length,
        todosTotal: todos.length
    }
}