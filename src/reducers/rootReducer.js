const initState = {
    input: '',
    error: '',
    inputIsValid: true,
    showButton: false,
    showError: false,
    result: null,
};

const rootReducer = (state = initState, action) => {
    if (action.type === 'UPDATE_INPUT') {
        return {
            ...state,
            input: action.input,
        }
    }

    if (action.type === 'VALIDATE_INPUT') {
        let error;
        let showButton = true;
        let showError;

        if(!action.input){
            showButton = false;
            showError = true;
        }
        if(typeof action.input !== "undefined") {
            error = '';
            if (!action.input.match(/^[A-Za-z]+$/)) {
                showButton = false;
                error = "Only letters";
                showError = true;
            } else if (!action.input.match(/^.{0,10}$/)) {
                showButton = false;
                error = "max 10 letters";
                showError = true;
            }
        }
        return {
            ...state,
            input: action.input,
            error: error,
            showButton: showButton,
            showError: showError,
        }
    }

    if (action.type === 'ADD_API_ERRORS') {
        return {
            ...state,
            error: action.error,
            showError: action.showError
        }
    }

    if (action.type === 'ADD_API_RESULT') {
        return {
            ...state,
            result: action.result,
        }
    }
    return state;
};

export default rootReducer;