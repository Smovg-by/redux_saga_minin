import { takeEvery, put, call, fork, spawn, join } from 'redux-saga/effects'

async function swapiGet (pattern) {
  const request = await fetch(`http://swapi.dev/api/${pattern}`)
  const data = request.json()
  return data
}

export function* loadPeople() {
    const people = yield call(swapiGet, 'people')
    console.log('people', people)
    yield put({ type: 'SET_PEOPLE', payload: people.results })
}

export function* loadPlanets() {
    const planets = yield fork(swapiGet, 'planets')
    console.log('planets', planets)
    yield put({ type: 'SET_PLANETS', payload: planets.results })
}

// WORKER SAGA
export function * workerSaga () {
  const task = yield fork(loadPeople)
  yield spawn(loadPlanets)
  const people = yield join(task) // в этом случае  join является блокирующим вызовом
  const store = yield select(store => store)
  console.log('join people', people)
}

// WATCHER SAGA
export function * watchLoadDataSaga () {
  yield takeEvery('LOAD_DATA', workerSaga) // значит: при каждом срабатывании "LOAD_DATA" вызови workerSaga
  // и пока не выполнится "LOAD_DATA" выполнение кода дальше не продолжится
}

// ROOT SAGA
export default function * rootSaga () {
  console.log('Saga is ready!')
  yield fork(watchLoadDataSaga)
}
