import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* feedSaga () {
  yield takeEvery('FETCH_YOUR_FEED', getYourFeed)
}

function* getYourFeed () {
  try {
    const response = yield axios.get('/feed');
    yield put ({type: 'SET_YOUR_FEED'})
  }
  catch(error) {
    console.log('Error with getting your feed from Server/DB', error);
    
  }
}
export default feedSaga;