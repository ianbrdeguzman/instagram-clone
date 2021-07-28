const passwordReducer = (state, action) => {
    switch (action.type) {
        case 'PASSWORD_CHANGE_REQUEST':
            return {
                ...state,
                loading: true,
                success: null,
                error: null,
            };
        case 'PASSWORD_CHANGE_SUCCESS':
            return {
                ...state,
                success: action.payload,
                loading: false,
            };
        case 'PASSWORD_CHANGE_FAIL':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'PASSWORD_FORGOT_REQUEST':
            return {
                ...state,
                loading: true,
                success: null,
                error: null,
            };
        case 'PASSWORD_FORGOT_SUCCESS':
            return {
                ...state,
                success: true,
                data: action.payload,
                loading: false,
            };
        case 'PASSWORD_FORGOT_FAIL':
            return {
                ...state,
                success: false,
                error: action.payload,
                loading: false,
            };
        case 'PASSWORD_RESET_REQUEST':
            return {
                ...state,
                loading: true,
                success: null,
                error: null,
            };
        case 'PASSWORD_RESET_SUCCESS':
            return {
                ...state,
                success: true,
                data: action.payload,
                loading: false,
            };
        case 'PASSWORD_RESET_FAIL':
            return {
                ...state,
                success: false,
                error: action.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};

export default passwordReducer;
