import { put, takeEvery, actionChannel } from 'redux-saga/effects';
import axios from 'axios';

function* calendarSaga () {

  yield takeEvery('FETCH_EVENTS', fetchEvents)

}

function* fetchEvents (action) {
  console.log('action.payload is', action.payload);
  try {
    const response = yield axios.get(`/calendar?date=${action.payload.date}`)

    yield put ({type: 'SET_CALENDAR_EVENTS', payload: response.data});
  }
  catch(error) {
    console.log('Error with fetching events from db', error);
    
  }

}

export default calendarSaga;