/* npm imports: common */
import { call, put } from 'redux-saga/effects';

/* root imports: common */
import { services } from 'config/services';
import { history } from 'config/history';
import { setInProgress, loginOnSuccess, loginOnFail } from 'actions/auth';

export function* loginWorker({ payload }) {
	yield put(setInProgress(true));

	try {
		const user = yield call(services.auth.login, payload);

		yield put(loginOnSuccess(user));
		yield call(history.push, '/');
	} catch (e) {
		yield put(loginOnFail(e.message));
	} finally {
		yield put(setInProgress(false));
	}
}
