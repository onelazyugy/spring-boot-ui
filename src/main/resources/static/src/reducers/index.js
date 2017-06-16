import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import login from './loginReducer';

const rootReducer = combineReducers({
    login,
    routing: routerReducer
});

export default rootReducer;
