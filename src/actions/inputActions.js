export const updateInput = (input) => {
    return {
        type: 'UPDATE_INPUT',
        input
    }
};

export const validateInput = (input) => {
    return {
        type: 'VALIDATE_INPUT',
        input
    }
};

export const addError = (error, showError) => {
    return {
        type: 'ADD_API_ERRORS',
        error,
        showError
    }
};