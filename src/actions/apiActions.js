export const addApiError = (error, showError) => {
    return {
        type: 'ADD_API_ERRORS',
        error,
        showError
    }
};

export const addApiResult = (result) => {
    return {
        type: 'ADD_API_RESULT',
        result,
    }
};