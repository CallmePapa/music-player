import React from 'react'
import {Provider} from 'react-redux';
import './static/css/main';
import Routers from './routes/index';
import configureStore from './store/configureStore';
const store = configureStore();

let Root=()=>(
    <Provider store={store}>
        <Routers/>
    </Provider>
);
export  default Root;