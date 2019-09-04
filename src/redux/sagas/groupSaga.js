import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* groupSaga () {
    yield takeEvery('FETCH_GROUP', fetchGroup);
}

function* fetchGroup() {
    try {
        const response = yield axios.get('/group');
        yield put ({type: 'SET_GROUP', payload: response.data});
    } catch (error) {
        console.log('Error getting group.', error);
        alert('Could not get Group at this time. Try again later.');
    }
}

export default groupSaga;