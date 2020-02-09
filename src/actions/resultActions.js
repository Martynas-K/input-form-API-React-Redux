export const addResult = (result) => {
    return {
        type: 'ADD_API_RESULT',
        result,
    }
};

export const addOverlay = (showOverlay) => {
    return {
        type: 'SHOW_OVERLAY',
        showOverlay,
    }
};