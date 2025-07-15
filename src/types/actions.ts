import type { UserData } from '../types/userTypes';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const USER_WITHDRAW_REQUEST = 'USER_WITHDRAW_REQUEST';
export const USER_DEPOSIT_REQUEST = 'USER_DEPOSIT_REQUEST';
export const RESET_USER_STATE = 'RESET_USER_STATE';

export interface GetUserRequestAction {
  type: typeof GET_USER_REQUEST;
  payload: { pin: string; };
}
export interface GetUserSuccessAction {
  type: typeof GET_USER_SUCCESS;
  payload: UserData;
}
export interface GetUserErrorAction {
  type: typeof GET_USER_ERROR;
  payload: string | null;
}

export interface UpdateUserRequestAction {
  type: typeof UPDATE_USER_REQUEST;
  payload: { userId: string; balance: number; };
}
export interface UpdateUserSuccessAction {
  type: typeof UPDATE_USER_SUCCESS;
  payload: UserData;
}
export interface UpdateUserErrorAction {
  type: typeof UPDATE_USER_ERROR;
  payload: { error: string };
}

export interface ResetUserStateAction {
  type: typeof RESET_USER_STATE;
}

export type UserActions =
  | GetUserRequestAction
  | GetUserSuccessAction
  | GetUserErrorAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserErrorAction
  | ResetUserStateAction;

export const getUserRequest = (pin: string): GetUserRequestAction => ({
  type: GET_USER_REQUEST,
  payload: { pin },
});
export const getUserSuccess = (user: UserData): GetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  payload: user,
});
export const getUserError = (error: string | null): GetUserErrorAction => ({
  type: GET_USER_ERROR,
  payload: error,
});
export const updateUserRequest = (userId: string, balance: number): UpdateUserRequestAction => ({
  type: UPDATE_USER_REQUEST,
  payload: { userId, balance },
});
export const updateUserSuccess = (user: UserData): UpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});
export const updateUserError = (error: string): UpdateUserErrorAction => ({
  type: UPDATE_USER_ERROR,
  payload: { error },
});
export const resetUserState = (): ResetUserStateAction => ({
  type: RESET_USER_STATE,
});