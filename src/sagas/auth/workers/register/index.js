/* npm imports: common */
import { call, put } from 'redux-saga/effects';

/* root imports: common */
import { services } from 'config/services';
import { history } from 'config/history';
import { setInProgress, registerOnSuccess, registerOnFail } from 'actions/auth';

export function* registerWorker({ payload }) {
	yield put(setInProgress(true));

	try {
		const user = yield call(services.auth.register, payload);

		yield put(registerOnSuccess(user));
		yield call(history.push, '/');
	} catch (e) {
		yield put(registerOnFail(e.message));
	} finally {
		yield put(setInProgress(false));
	}
}
