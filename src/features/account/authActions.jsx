import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'

export const fixIssues = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log('starting fix.')

        firestore.collection('users').get().then(query => {
            console.log(query)
            query.forEach((doc) => {
                let docData = doc.data();
                console.log(docData);
                console.log(doc.id)
                if (doc.id.length === 20){
                    console.log('NEED TO DELETE ' + doc.id)
                    firestore.collection('users').doc(doc.id).delete().then(() => {
                        console.log(doc.id + ' Deleted!')
                    })
                }

                // let currentUser = {};
                // currentUser.name = docData.name;
                // currentUser.email = docData.email;
                // currentUser.uid = docData.uid;

                // firebase.firestore().collection('users').doc(currentUser.uid).set(currentUser)

                // console.log(`Updated user ${currentUser.uid}`)


            })

        })

    }
    
}

export const signIn = (creds) => {
    return async(dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        dispatch({type: 'LOGIN_STARTED'})

        await firebase.auth().signInWithEmailAndPassword(
            creds.email, creds.password
        ).then(() => {
            
            dispatch( {type: 'LOGIN_SUCCESS'})


        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err})
            console.log(err)
            dispatch(snackbar.show({
                message: err.message,
                action: 'Close',
                variant: 'error',
                handleAction: () => {/* do something... */} 
              }))
        });
    }
}

export const createAccount = (newUser) => {
    return async(dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        dispatch({type: 'SIGNUP_START'})

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            firebase.auth().currentUser.updateProfile({
                displayName: newUser.firstName + ' ' + newUser.lastName
            })

            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                uid: resp.user.uid,
                email: resp.user.email,
                name: newUser.firstName + ' ' + newUser.lastName
            })
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch((err) => {
            dispatch({
                type: 'SIGNUP_ERROR', err: err
            })
            dispatch(snackbar.show({
                message: err.message,
                action: 'Close',
                variant: 'error',
                handleAction: () => {/* do something... */} 
              }))
        })

    }
}
