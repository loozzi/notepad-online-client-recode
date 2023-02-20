import { call, put, takeLatest } from 'redux-saga/effects';
import { homeActions } from './HomeSlice';
import noteApi from '../../../api/noteApi';

function* fetchData() {
  try {
    const resData = yield call(noteApi.getAll, {
      page: 1,
      limit: 5,
    });

    if (resData.code === 200) {
      const payload = {
        totalNotes: resData.elements.totalNotes,
        notes: resData.elements.notes,
      };
      yield put(homeActions.fetchDataSuccess(payload));
    } else {
      yield put(homeActions.fetchDataFailed());
    }
  } catch (e) {
    console.error(e);
  }
}

export default function* homeSaga() {
  yield takeLatest(homeActions.fetchData.type, fetchData);
}
