import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

function* groupSaga () {
    yield takeEvery('FETCH_GROUP', fetchGroup)

}

//Get group info for groupview
function* fetchGroup(action) {
    try {
        console.log('In fetch group saga action.payload:', action.payload.id)
        const response = yield Axios.get(`/group/${action.payload.id}`);
        console.log('back from group db response.data',response.data);
        yield put({ type: 'SET_GROUP', payload: response.data })
    } catch (error) {
        console.log('error fetching group data', error)
    }
}

export default groupSaga;