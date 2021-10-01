import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import rootSaga from "./sagas";

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(reducer,

    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(sagaMiddleWare)
    )
);

sagaMiddleWare.run(rootSaga);

export default store