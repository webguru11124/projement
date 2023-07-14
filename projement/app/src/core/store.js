import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import projectsReducer, {
    STATE_KEY as PROJECTS_KEY,
} from 'projects/ducks/projects';

/**
 * Combine the reducers from ducks to the Redux store.
 */
const rootReducer = combineReducers({
    [PROJECTS_KEY]: projectsReducer,
});

/**
 * Create & configure the Redux store.
 * @param {object} [initialState]
 * @param {import('redux').Reducer} [reducer]
 *      Defaults to the root reducer including all ducks. This could be
 *      overridden in tests, for example, to only test specific reducers.
 */
export const configureStore = (
    initialState = undefined,
    reducer = rootReducer,
) => {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(reducer, initialState, composedEnhancers);

    return store;
};
