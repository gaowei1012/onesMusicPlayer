import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import {middleware} from '../../navigation/AppNavigation';
import logger from 'redux-logger';

const middlewares = [middleware, thunk, logger];

export default createStore(reducers, applyMiddleware(...middlewares));
