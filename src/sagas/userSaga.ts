import { put, takeLatest } from 'redux-saga/effects';
import type { UserData } from '../types/userTypes';
import type { GetUserRequestAction, UpdateUserRequestAction } from '../types/actions';
import { getUserSuccess, getUserError, updateUserSuccess, updateUserError,
   GET_USER_REQUEST, UPDATE_USER_REQUEST } from '../types/actions';
import type { AxiosResponse } from 'axios';
import apiClient from '../api/apiClient';
import { ApiEndpoints } from '../types/constants';
  
function* getUserSaga(action: GetUserRequestAction) {
    const pin = action.payload.pin;
    try {
      const uri =  apiClient.getUri({ url: `${ApiEndpoints.ACCOUNT_DETAILS}/${pin}` });
      const response: AxiosResponse<UserData> = yield apiClient.get(
        `${ApiEndpoints.ACCOUNT_DETAILS}/${pin}`
      );
      yield put(getUserSuccess(response.data));
    } catch (error: any) {
      yield put(getUserError(error || 'Failed to fetch user data'));
    }
  }

  function* handleUpdateUser(action: UpdateUserRequestAction) {
    try {
      const { userId, balance } = action.payload;
      const response: AxiosResponse<UserData> = yield apiClient.patch(
        `${ApiEndpoints.ACCOUNT_DETAILS}/${userId}`,
        { balance }
      );
      yield put(updateUserSuccess(response.data));
    } catch (error: any) {
      yield put(updateUserError(error || 'Failed to update user'));
    }
  }

export function* watchUserSaga() {
    yield takeLatest(GET_USER_REQUEST, getUserSaga);
    yield takeLatest(UPDATE_USER_REQUEST, handleUpdateUser);
}