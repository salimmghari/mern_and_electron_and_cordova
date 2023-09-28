import React from 'react';
import {
  HashRouter, 
  Routes, 
  Route
} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/app/store';
import Home from './screens/Home';
import Auth from './screens/Auth';
import './index.css';


interface AppProps {
  children?: any
}


const App = (props: AppProps): JSX.Element => (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </HashRouter>
  </Provider>
);


export default App;
