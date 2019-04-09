
const initState = {loading: false, finishedPosting: false}

const lessonReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_LESSON':
            console.log(`Created lesson ${action.lesson}`);
            
            return state
        case 'CREATE_LESSON_ERROR':
            console.log(`Create Lesson Error: ${action.err}`)
            return state
        case 'STARTED_POSTING':
            return {...state, loading: true}
        case 'FINISHED_POSTING':
            return {...state, loading: false, finishedPosting: true}
        default: 
            return state
            
    }
    
}

export default lessonReducer