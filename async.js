const redux = require('redux');
const axios = require('axios').default;
const thunk = require('redux-thunk').default;

const TODO_REQUEST = Object.freeze({
    START: Object('START'),
    END: Object('END'),
    ERROR: Object('ERROR')
});

const initialState = {
    loading: false,
    todos: [],
    errMsg: ''
};

const todoFetchStart = () => {
    return {
        type: TODO_REQUEST.START
    }
}

const todoFetchEnd = (todos) => {
    return {
        type: TODO_REQUEST.END,
        payload: todos
    }
}

const todoFetchError = (err) => {
    return {
        type: TODO_REQUEST.ERROR,
        payload: err
    }
}

const fetchTodos = () => {
    return (dispatch) => {
        dispatch(todoFetchStart());

        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                const todos = response.data; //.map(m => m.userId);
                // console.log(todos);
                
                dispatch(todoFetchEnd(todos));
            })
            .catch(err => {
                // console.log(err);

                dispatch(todoFetchError(err.message));
            });
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case TODO_REQUEST.START:
            // console.log("loading...");
            return {
                loading: true,
                todos: [],
                errMsg: ''
            };
        case TODO_REQUEST.END:
            // console.log("loaded...", action);
            return {
                loading: false,
                todos: action.payload,
                errMsg: ''
            };
        case TODO_REQUEST.ERROR:
            return {
                loading: false,
                todos: [],
                errMsg: action.payload
            };
        default:
            return state;
    }
}

const store = redux.createStore(reducer, redux.applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchTodos());

