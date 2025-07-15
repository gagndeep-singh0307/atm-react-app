import type { RootState } from './store'
import type { UserState } from '../types/userTypes';
import type { UserActions } from '../types/actions';
import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR,
   UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, RESET_USER_STATE } from '../types/actions';

const initialState: UserState = {
  isLoading: false,
  errors: '',
  user: null,
}

const userReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, errors: null };
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload };
    case GET_USER_ERROR:
      return { ...state, isLoading: false, errors: 'User does not exist.' };
    case UPDATE_USER_REQUEST:
      return { ...state, isLoading: true, errors: null };
    case UPDATE_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload };
    case UPDATE_USER_ERROR:
      return { ...state, isLoading: false, errors: 'Failed to update user.' };
    case RESET_USER_STATE:
      return initialState;
    default:
      return state;
  }
};

export const selectUser = (state: RootState) => state.user

export default userReducer;