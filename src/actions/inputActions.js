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