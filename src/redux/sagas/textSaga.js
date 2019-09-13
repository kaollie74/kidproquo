import { takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

function* sendText(action) {
    try {
        yield Axios.post('/api/text', action.payload);

    } catch (error) {
        console.log('Error with Sending Text:', error);
    }
}
function* sendCancelText(action) {
    try {
        yield Axios.post('/api/text/cancel', action.payload);

    } catch (error) {
        console.log('Error with Sending cancel Text:', error);
    }
}

function* textSaga() {
    yield takeEvery('SEND_TEXT', sendText);
    yield takeEvery('SEND_CANCEL_TEXT', sendCancelText);

}

export default textSaga;