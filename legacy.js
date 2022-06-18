const redux = require('redux');

console.log('in app...');

const INC_ACTION_TYPE = Object.freeze({
	INCREMENT: Symbol("INCREMENT"),
	DECREMENT: Symbol("DECREMENT"),
});

const initialIncState = {
    payload: 0
};

const incAction = (cnt) => {
    return {
        type: INC_ACTION_TYPE.INCREMENT,
        count: cnt
    }
};

const decAction = (cnt) => {
    return {
        type: INC_ACTION_TYPE.DECREMENT,
        count: cnt
    }
};

const incReducer = (state = initialIncState, action) => {
    switch(action.type) {
        case INC_ACTION_TYPE.INCREMENT:
            return {
                ...state,
                payload: state.payload + action.count
            };
        case INC_ACTION_TYPE.DECREMENT:
            return {
                ...state,
                payload: state.payload - action.count
            };
        default:
            return state;
    }
};

// createStore is for a single reducer
// const store = redux.createStore(IncReducer);

const MULT_ACTION_TYPE = Object.freeze({
	MULTIPLIER: Symbol("MULTIPLIER"),
	DIVIDER: Symbol("DIVIDER"),
});

const initialMultState = {
    payload: 1
};

const multAction = (cnt) => {
    return {
        type: MULT_ACTION_TYPE.MULTIPLIER,
        count: cnt
    }
};

const divAction = (cnt) => {
    return {
        type: MULT_ACTION_TYPE.DIVIDER,
        count: cnt
    }
};

const multReducer = (state = initialMultState, action) => {
    switch(action.type) {
        case MULT_ACTION_TYPE.MULTIPLIER:
            return {
                ...state,
                payload: state.payload * action.count
            };
        case MULT_ACTION_TYPE.DIVIDER:
            return {
                ...state,
                payload: state.payload / action.count
            };
        default:
            return state;
    }
}

// for multiple reducer use CombineReducers and then feed that rootReducer to createStore
const rootReducer = redux.combineReducers({incReducer, multReducer});

const store = redux.createStore(rootReducer);

const unsubscribe = store.subscribe(() => console.log(store.getState()));

console.log("initial store: ", store.getState());

store.dispatch(incAction(2));
store.dispatch(incAction(10));
store.dispatch(decAction(8));
store.dispatch(decAction(4));

// dispatching actions using action creator helper
const actions = redux.bindActionCreators({incAction, decAction, multAction, divAction}, store.dispatch);

actions.incAction(2);
actions.incAction(10);
actions.decAction(8);
actions.decAction(4);

actions.multAction(10);
actions.multAction(3);
actions.divAction(10);
actions.divAction(3);

unsubscribe();



