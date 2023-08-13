import initialReducer from './../reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';

export const rootReducer = combineReducers(Object.assign({}, {
    //login: ActionTypes.login.reducer,

    form: reduxFormReducer,
}, initialReducer));

// const composeEnhancers =
//     typeof window === 'object' &&
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//             // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//         }) : compose;

// const enhancer = composeEnhancers(
//     applyMiddleware(thunk)
// );

// const store = createStore(rootReducer, enhancer);
// export default store;


export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    )
}