const redux = require('redux');
const immer = require('immer');  // for easing state updation
const logger = require('redux-logger').createLogger();

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
    SET_REMAINDER: Symbol("SET_REMAINDER")
});

const initialMultState = {
    payload: 1,
    extra: {  // deliberate nested json
        remainder: 0
    }
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

const setRemainderAction = (rem) => {
    return {
        type: MULT_ACTION_TYPE.SET_REMAINDER,
        remainder: rem
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
                payload: Math.floor(state.payload / action.count),
                extra: {
                    ...state.extra,
                    remainder: state.payload % action.count
                }
            };
        case MULT_ACTION_TYPE.SET_REMAINDER:
            /* return {
                ...state,
                extra: {
                    ...state.extra,
                    remainder: action.remainder
                }
            }; */
            // use immer helper to make changes to store which translates as above
            return immer.produce(state, (draft) => {
                draft.extra.remainder = action.remainder
            });
        default:
            return state;
    }
}

// for multiple reducer use CombineReducers and then feed that rootReducer to createStore
const rootReducer = redux.combineReducers({incReducer, multReducer});

// use middleware log to handle all logs
const store = redux.createStore(rootReducer, redux.applyMiddleware(logger));

// comment out console logs for middleware logger to take care of it
// const unsubscribe = store.subscribe(() => console.log(store.getState()));
const unsubscribe = store.subscribe(() => {});

store.dispatch(incAction(2));
store.dispatch(incAction(10));
store.dispatch(decAction(8));
store.dispatch(decAction(4));

// dispatching actions using action creator helper
const actions = redux.bindActionCreators({incAction, decAction, multAction, divAction, setRemainderAction}, store.dispatch);

console.log("*******Using bindActions...");

actions.incAction(2);
actions.incAction(10);
actions.decAction(8);
actions.decAction(4);

console.log("*******Using multActions...");
actions.multAction(10);
actions.multAction(3);
actions.divAction(12);
actions.setRemainderAction(4);

unsubscribe();



