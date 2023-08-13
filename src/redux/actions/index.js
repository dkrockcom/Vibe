export let actionType = {
    LOGGED_USER: 'LOGGED_USER',
    LOADING: 'LOADING',
    MENU: 'MENU',
    cpModal: 'cpModal',
    tabVisible: 'tabVisible',
    cameraRecord: 'cameraRecord',
    selectedCamera: 'selectedCamera'
};

export let loggedUser = (value, dispose) => {
    return {
        type: actionType.LOGGED_USER,
        value,
        dispose
    };
}

export let loading = (value) => {
    return {
        type: actionType.LOADING,
        value
    };
}

export let tabVisible = (value) => {
    return {
        type: actionType.tabVisible,
        value
    };
}

export let cameraRecord = (value) => {
    return {
        type: actionType.cameraRecord,
        value
    };
}

export let selectedCamera = (value) => {
    return {
        type: actionType.selectedCamera,
        value
    };
}