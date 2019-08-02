/* npm imports: common */
import { call, select, put } from 'redux-saga/effects';

/* root imports: common */
import { services } from 'config/services';
import { setThemeInProgress } from 'actions/theme';
import { updateUserOnSuccess, updateUserOnFail } from 'actions/user';

export function* switchWorker({ payload }) {
	yield put(setThemeInProgress(true));

	try {
		const getCurrentUser = state => state.auth.user;
		const currentUser = yield select(getCurrentUser);

		if (!currentUser) throw new Error('no user found');

		const updatedUser = yield call(services.api.users.update, currentUser._id, {
			theme: payload,
		});

		yield put(updateUserOnSuccess(updatedUser));
	} catch (e) {
		yield put(updateUserOnFail(e.message));
	} finally {
		yield put(setThemeInProgress(false));
	}
}
