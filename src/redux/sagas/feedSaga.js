import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';

function* feedSaga () {
  yield takeEvery('FETCH_YOUR_FEED', getYourFeed)
  yield takeEvery('CLAIM_EVENT', claimEvent)
  yield takeEvery('ADD_REQUEST', addRequest)
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
    console.log(event_date)
    console.log('this is action.payload.event_date', action.payload.event_date)
    yield put({type: 'FETCH_EVENTS', payload: event_date})
    yield put(Swal.fire({
      position: 'center',
      type: 'success',
      title: `You have claimed the ${action.payload.last_name1}'s request for ${action.payload.event_time_start} - ${action.payload.event_time_end} on ${action.payload.event_date}`,
      showConfirmButton: false,
      timer: 4000,
    }))
  }
  catch(error) {
    console.log('Error with updating event in the DB', error);
  }
}

function* addRequest (action) {
  console.log('IN FEED SAGA: this is action.payload', action.payload)
  try {
    yield axios.post(`/feed/addRequest`, action.payload)
    console.log('in ADD REQUEST - FEEDSAGA with:', action.payload);
    yield put({type: 'FETCH_EVENTS', payload: action.payload})
    yield put(Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Request Created!',
      showConfirmButton: false,
      timer: 1500,
    }))
  }
  catch(error) {
    console.log('Error with adding request to the DB', error);
  }
}

export default feedSaga;