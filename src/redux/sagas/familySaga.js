import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';


//Post new user's family info to the DB
function* addNewFamily(action) {
    try {

        console.log('in addNewFamily action.payload:', action.payload);

        //This post should post new family data to DB referenceing new user id and payload will have family data
        const response = yield Axios.post(`/family/${action.payload.user_id}`, action.payload);
        console.log('addNewFamily back from server response:', response.data);
        yield put({ type: 'SET_NEW_FAMILY', payload: response.data })

    } catch (error) {

        console.log('Error posting new family to DB:', error);
       
    }
}

function* familySaga() {

    yield takeEvery('ADD_NEW_FAMILY', addNewFamily)

}



export default familySaga;