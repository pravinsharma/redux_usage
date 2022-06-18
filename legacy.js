const redux = require('redux');

console.log('in app...');

const ACTION_TYPE = Object.freeze({
	INCREMENT: Symbol("INCREMENT"),
	DECREMENT: Symbol("DECREMENT"),
});

const initialState = {
    payload: 0
};

const incAction = (cnt) => {
    return {
        type: ACTION_TYPE.INCREMENT,
        count: cnt
    }
};

const decAction = (cnt) => {
    return {
        type: ACTION_TYPE.DECREMENT,
        count: cnt
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPE.INCREMENT:
            return {
                ...state,
                payload: state.payload + action.count
            };
        case ACTION_TYPE.DECREMENT:
            return {
                ...state,
                payload: state.payload - action.count
            };
        default:
            return state;
    }
}

const store = redux.createStore(reducer);

const unsubscribe = store.subscribe(() => console.log(store.getState()));

console.log("initial store: ", store.getState());

store.dispatch(incAction(2));
store.dispatch(incAction(10));
store.dispatch(decAction(8));

unsubscribe();



