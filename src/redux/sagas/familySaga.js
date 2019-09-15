import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';
import Swal from 'sweetalert2';


//Post new user's family info to the DB
function* addNewFamily(action) {
    try {
        console.log('in addNewFamily action.payload:', action.payload);
        //This post should post new family data to DB referenceing new user id and payload will have family data
        const response = yield Axios.post(`/family/${action.payload.user_id}`, action.payload);
        yield put({ type: 'FETCH_FAMILY', payload: action.payload.user_id})

    } catch (error) {
        console.log('Error posting new family to DB:', error);
    }
}

function* clickFetchFamily(action) {
    try{
        console.log(action.payload)
        const response = yield Axios.get(`/family/user/${action.payload}`);
        console.log(response.data);
        yield put({ type: 'SET_CLICK_FAMILY', payload: response.data})
    } catch(error) {
        console.log('error fetching family data', error)
    }
}



function* fetchFamily(action) {
    try{
        console.log(action.payload)
        const response = yield Axios.get(`/family/user/${action.payload}`);
        console.log(response.data);
        yield put({ type: 'SET_FAMILY', payload: response.data})
    } catch(error) {
        console.log('error fetching family data', error)
    }
}

function* updateFamily(action){
    try{
        yield Axios.put(`/family/update/${action.payload.family_id}`, action.payload);
        yield put ({type: 'FETCH_FAMILY', payload: action.payload.user_id})
        
        yield put(Swal.fire({
            position: 'center',
            type: 'success',
            title: `Your profile has been updated`,
            showConfirmButton: false,
            timer: 1500
          }))
        
    }
    catch(error){
        console.log('Error with UPDATE family in the DB', error)
    }
}

//Get kid info
function* fetchKids(action) {
    try {
        console.log(action.payload)
        const response = yield Axios.get(`/kid/${action.payload}`);
        console.log(response.data);
        yield put({ type: 'SET_KID', payload: response.data })
    } catch (error) {
        console.log('error fetching kid data', error)
    }
}

function* fetchUserFamily(action) {
    try{
        console.log(action.payload)
        const response = yield Axios.get(`/family/userFamily`, action.payload);
        console.log(response.data);
        yield put({ type: 'SET_USER_FAMILY', payload: response.data})
    } catch(error) {
        console.log('error fetching users family data', error)
    }
}

function* familySaga() {
    yield takeEvery('CLICK_FETCH_FAMILY', clickFetchFamily)
    yield takeEvery('FETCH_FAMILY', fetchFamily)
    yield takeEvery('FETCH_KIDS', fetchKids)
    yield takeEvery('ADD_NEW_FAMILY', addNewFamily)
    yield takeEvery('UPDATE_FAMILY', updateFamily)
    yield takeEvery('FETCH_USER_FAMILY', fetchUserFamily)
}



export default familySaga;