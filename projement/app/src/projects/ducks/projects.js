import { combineReducers } from 'redux';

/**
 * State key for the projects' duck. This should be used to access the duck's
 * state whenever needed. For example, `state[STATE_KEY].projects`.
 */
export const STATE_KEY = 'projects';

// Actions

const RECEIVE_PROJECTS = `${STATE_KEY}/RECEIVE_PROJECTS`;
const RECEIVE_PROJECT = `${STATE_KEY}/RECEIVE_PROJECT`;
const RECEIVE_UPDATED_PROJECT = `${STATE_KEY}/RECEIVE_UPDATED_PROJECT`;
const SET_PAGE_META_DATA = `${STATE_KEY}/TOTAL_ITEM`;
const SET_PAGE = `${STATE_KEY}/SET_CURRENT_PAGE`;
const SET_LOADING = `${STATE_KEY}/SET_LOADING`;
// Reducers

const projectsReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_PROJECTS:
            return action.projects;
        case RECEIVE_UPDATED_PROJECT:
            return state.map(project =>
                project.id === action.project.id ? action.project : project,
            );
        case RECEIVE_PROJECT:
            return state
                .filter(project => project.id !== action.project.id)
                .concat(action.project);
        default:
            return state;
    }
};

const isLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case SET_LOADING:
            return action.isLoading;
        case RECEIVE_PROJECTS:
            return false;

        default:
            return state;
    }
};

const pageReducer = (state = { currentPage: 1, pageSize: 11 }, action) => {
    switch (action.type) {
        case SET_PAGE_META_DATA:
            return { ...state, ...action };
        case SET_PAGE:
            return { ...state, currentPage: action.page };
        default:
            return state;
    }
};

export default combineReducers({
    projects: projectsReducer,
    isLoading: isLoadingReducer,
    page: pageReducer,
});

// Action creators

const receiveProjects = projects => ({
    type: RECEIVE_PROJECTS,
    projects,
});

const receiveProject = project => ({
    type: RECEIVE_PROJECT,
    project,
});
const setPageState = page => ({
    type: SET_PAGE_META_DATA,
    ...page,
});

const setCurrentPage = page => ({
    type: SET_PAGE,
    page,
});

const receiveUpdatedProject = project => ({
    type: RECEIVE_UPDATED_PROJECT,
    project,
});

const setIsLoading = isLoading => ({ type: SET_LOADING, isLoading });

/**
 * Thunk to fetch the list of projects and save them to the store.
 */

export const fetchProjects = (page, pageSize) => async dispatch => {
    dispatch(setIsLoading(true));

    dispatch(setCurrentPage(page));

    let response;
    try {
        response = await fetch(
            `/api/projects?page=${page}&page_size=${pageSize}`,
        ).then(res => res.json());
    } catch (e) {
        return console.error(e);
    }
    dispatch(
        setPageState({
            count: response.count,
            next: response.next,
            pageSize: pageSize,
            previous: response.previous,
        }),
    );
    dispatch(receiveProjects(response?.results ?? []));
    return response;
};

export const fetchProject = id => async dispatch => {
    dispatch(setIsLoading(true));
    let response;
    try {
        response = await fetch(`/api/projects/${id}`).then(res => res.json());
    } catch (e) {
        return console.error(e);
    }
    dispatch(receiveProject(response));
    return response;
};
/**
 * Update the project with the given values.
 */
export const updateProject = (projectId, projectValues) => async dispatch => {
    let response;
    try {
        response = await fetch(`/api/projects/${projectId}/add_actual/`, {
            method: 'PUT',
            body: JSON.stringify(projectValues),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': DJ_CONST.csrfToken,
            },
        });
    } catch (e) {
        return console.error(e);
    }

    const json = await response.json();
    if (response.status === 400) {
        // We got some validation errors
        throw json;
    }

    dispatch(receiveUpdatedProject(json));

    return response;
};

// Selectors

export const getProjects = state => state[STATE_KEY].projects;
export const getIsLoading = state => state[STATE_KEY].isLoading;
export const getPage = state => state[STATE_KEY].page;
