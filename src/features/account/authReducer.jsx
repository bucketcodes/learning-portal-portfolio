
const initState = {
    authError: null,
    loading: null,
    loggedIn: null,
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('There was a login error!')
            return {...state, authError: action.err, loading: false}
        case 'LOGIN_SUCCESS':
            console.log('Logged in');

            return {...state, loggedIn: true}
            
        case 'LOGIN_STARTED':
            console.log('Logging in...');
            return {...state, loading: true}
        case 'SIGNUP_SUCCESS':
            console.log('Signup Success')
            return {...state, authError: null, loggedIn: true, loading: false}
        case 'SIGNUP_ERROR':
            console.log('Signup Error')
            return {...state, authError: action.err.message, loading: false}
        case 'SIGNUP_STARTED':
            console.log('Creating Account... Please wait')
            return {...state, authError: null, loading: true}
        default: 
            return state;
    }
}

export default authReducer