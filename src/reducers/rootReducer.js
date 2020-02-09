const initState = {
    input: '',
    error: '',
    showButton: false,
    showError: false,
    result: null,
    showOverlay: false
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

        if(typeof action.input !== "undefined") {
            if (!action.input.match(/^[A-Za-z]+$/)) {
                showButton = false;
                error = "Type letters only please.";
                showError = true;
            } else if (!action.input.match(/^.{0,10}$/)) {
                showButton = false;
                error = "Type up to 10 letters please.";
                showError = true;
            }
        }
        if (action.input === ''){
            error = '';
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

    if (action.type === 'SHOW_OVERLAY') {
        return {
            ...state,
            showOverlay: action.showOverlay,
        }
    }
    return state;
};

export default rootReducer;