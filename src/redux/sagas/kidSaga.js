import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';



function* kidSaga () {
  yield takeEvery('ADD_NEW_KID', addNewKid)
}


function* addNewKid (action) {
  try {
    
  yield axios.post('/kid/addKid', action.payload)
  
  yield put(Swal.fire({
    position: 'center',
    type: 'success',
    title: `${action.payload.first_name} ${action.payload.last_name} has been added to your family`,
    showConfirmButton: false,
    timer: 1500
  }))

  }
  catch(error){
    console.log('Error with posting KID to DB', error)
  }
}
export default kidSaga;