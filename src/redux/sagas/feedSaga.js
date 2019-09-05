import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* feedSaga () {
  yield takeEvery('FETCH_YOUR_FEED', getYourFeed)
  yield takeEvery('CLAIM_EVENT', claimEvent)
}

function* getYourFeed () {
  try {
    const response = yield axios.get('/feed/needed');
    yield put ({type: 'SET_YOUR_NEEDED_FEED', payload: response.data});
    // const responseTwo= yield axios.get('/feed/offered');
    // yield put ({type: 'SET_YOUR_OFFERED_FEED', payload: responseTwo.data});
   
  }
  catch(error) {
    console.log('Error with getting your feed from Server/DB', error);
    
  }
}

function* claimEvent (action) {
  console.log('this is action.payload', action.payload)

  try {
    yield axios.put(`/feed/update/${action.payload.id}`, action.payload)
    
    let event_date = {
      event_date: action.payload.event_date
    }
    console.log('this is action.payload.event_date', action.payload.event_date);
    yield put({type: 'FETCH_EVENTS', payload: event_date})

  }
  catch(error) {
    console.log('Error with updating event in the DB', error);
  }
}
export default feedSaga;