import { actionType } from '../actions';

const defaultValue = {
    loggedUser: {
        user: null,
        roles: [],
        isAdmin: false
    }
}

let loggedUser = function (state = defaultValue.loggedUser, action) {
    switch (action.type) {
        case actionType.LOGGED_USER:
            if (action.dispose) {
                return defaultValue.loggedUser;
            }
            state = Object.assign({}, state, action.value);
            return state;
        default:
            return state;
    }
}

let loading = function (state = { isLoad: false }, action) {
    switch (action.type) {
        case actionType.LOADING:
            state = Object.assign({}, state, action.value);
            return state;
        default:
            return state;
    }
}

let tabVisible = function (state = { isVisible: false }, action) {
    switch (action.type) {
        case actionType.tabVisible:
            state = Object.assign({}, state, action.value);
            return state;
        default:
            return state;
    }
}

let cameraRecord = function (state = { camData: [] }, action) {
    switch (action.type) {
        case actionType.cameraRecord:
            state = Object.assign({}, state, action.value);
            return state;
        default:
            return state;
    }
}

let selectedCamera = function (state = { camera: {} }, action) {
    switch (action.type) {
        case actionType.selectedCamera:
            state = Object.assign({}, state, action.value);
            return state;
        default:
            return state;
    }
}

export default {
    loggedUser: loggedUser,
    loading: loading,
    tabVisible: tabVisible,
    cameraRecord: cameraRecord,
    selectedCamera: selectedCamera
};