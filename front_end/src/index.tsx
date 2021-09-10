import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './store'
import  './App.css'
import "antd/dist/antd.css";
import { ConfigProvider  } from 'antd';
import frFR from 'antd/lib/locale/en_US';
import * as serviceWorker from './components/helper/serviceWorker';

import { ToastProvider, useToasts } from 'react-toast-notifications';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
  <ToastProvider>
    <ConfigProvider locale={frFR} >
    <App />
  </ConfigProvider>
    </ToastProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();