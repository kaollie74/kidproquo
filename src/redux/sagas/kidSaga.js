import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* kidSaga () {
  yield takeEvery('ADD_NEW_KID', addNewKid)
}


function* addNewKid (action) {
  try {
    
  yield axios.post('/kid/addKid', action.payload)

  }
  catch(error){
    console.log('Error with posting KID to DB', error)
  }
}
export default kidSaga;