import { createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import weatherReducer from './reducer/weatherReducer';
import alertReducer   from './reducer/alertReducer';

//import practiceReducer from './reducer/pprofileReducer'
import {practice, practicebyid, editPracticeReducer, getToesterNotification, getPracticeLogin} from './reducer/pprofileReducer'
import {providerbyid, getProviderLogin} from './reducer/providerReducer'
import {assignedpractices, userInfo} from './reducer/userReducer'
import { reducer as reduxFormReducer } from 'redux-form';
import { getFollowUpActionDDV } from './reducer/followUpReducer';
const loggerMiddleware = createLogger();

const rootReducer =combineReducers({
    practice: practice,
    weather:weatherReducer,
    assignedpractices: assignedpractices,
    alert: alertReducer,
    practicebyid: practicebyid,
    form: reduxFormReducer, 
    updatePractice: editPracticeReducer,
    toester: getToesterNotification,
    user: userInfo,
    provider: providerbyid,
    providerLogins: getProviderLogin,
    practiceLogin: getPracticeLogin,
    followUpActionDD: getFollowUpActionDDV
    
});


const store= createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk, loggerMiddleware))
    
);

export type RootState= ReturnType<typeof rootReducer>;
export default store;
