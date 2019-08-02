/* npm imports: common */
import { call, put } from 'redux-saga/effects';

/* root imports: common */
import { services } from 'config/services';
import { setInProgress, createTaskOnSuccess, createTaskOnFail } from 'actions/tasks';

export function* createWorker({ payload }) {
	yield put(setInProgress(true));

	try {
		const task = yield call(services.api.tasks.create, payload);

		yield put(createTaskOnSuccess(task));
	} catch (e) {
		yield put(createTaskOnFail(e.message));
	} finally {
		yield put(setInProgress(false));
	}
}
