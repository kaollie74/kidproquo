import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';


//Post new user's family info to the DB
function* addNewFamily(action) {
    try {
        console.log('in addNewFamily action.payload:', action.payload);
        //This post should post new family data to DB referenceing new user id and payload will have family data
        const response = yield Axios.post(`/family/${action.payload.user_id}`, action.payload);
        yield put({ type: 'FETCH_FAMILY', payload: action.payload.user_id})

    } catch (error) {
        console.log('Error posting new family to DB:', error);
    }
}

function* fetchFamily(action) {
    try{
        console.log(action.payload)
        const response = yield Axios.get(`/family/user/${action.payload}`);
        console.log(response.data);
        yield put({ type: 'SET_FAMILY', payload: response.data})
    } catch(error) {
        console.log('error fetching family data', error)
    }
}

function* familySaga() {
    yield takeEvery('FETCH_FAMILY', fetchFamily)
    yield takeEvery('ADD_NEW_FAMILY', addNewFamily)
}



export default familySaga;