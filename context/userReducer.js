const userReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOAD_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'USER_LOAD_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case 'USER_LOAD_FAIL':
            return {
                ...state,
                loadError: action.payload,
                loading: false,
            };
        case 'USER_LOGIN_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'USER_LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case 'USER_LOGIN_FAIL':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'USER_LOGOUT_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'USER_LOGOUT_SUCCESS':
            return {
                ...state,
                user: null,
                loading: false,
            };
        case 'USER_LOGOUT_FAIL':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'USER_REGISTER_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'USER_REGISTER_SUCCESS':
            return {
                ...state,
                success: action.payload,
                loading: false,
            };
        case 'USER_REGISTER_FAIL':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'USER_CHANGE_PASSWORD_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'USER_CHANGE_PASSWORD_SUCCESS':
            return {
                ...state,
                changePasswordSuccess: action.payload,
                loading: false,
            };
        case 'USER_CHANGE_PASSWORD_FAIL':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'USER_EDIT_PROFILE_REQUEST':
            return {
                ...state,
                loading: true,
                success: false,
            };
        case 'USER_EDIT_PROFILE_SUCCESS':
            return {
                ...state,
                user: action.payload,
                success: true,
                loading: false,
            };
        case 'USER_EDIT_PROFILE_FAIL':
            return {
                ...state,
                error: action.payload,
                success: false,
            };
        case 'USER_EDIT_AVATAR_REQUEST':
            return {
                ...state,
                loading: true,
                successAvatar: false,
            };
        case 'USER_EDIT_AVATAR_SUCCESS':
            return {
                ...state,
                user: action.payload,
                successAvatar: true,
                loading: false,
            };
        case 'USER_EDIT_AVATAR_FAIL':
            return {
                ...state,
                error: action.payload,
                successAvatar: false,
                loading: false,
            };
        case 'USER_REMOVE_AVATAR_REQUEST':
            return {
                ...state,
                loading: true,
                successAvatar: false,
            };
        case 'USER_REMOVE_AVATAR_SUCCESS':
            return {
                ...state,
                user: action.payload,
                successAvatar: true,
                loading: false,
            };
        case 'USER_REMOVE_AVATAR_FAIL':
            return {
                ...state,
                error: action.payload,
                successAvatar: false,
                loading: false,
            };
        default:
            return { ...state };
    }
};

export default userReducer;
