import { handleActions } from 'redux-actions';
import { IAuth } from 'types/user';
import { AuthActions } from "./actions";

const initialState = null;

export const authReducer = handleActions<IAuth | null, IAuth>({
    [AuthActions.Type.AUTH_SUCCESS]: (state, action) => action.payload,
}, initialState);