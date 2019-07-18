import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'; 
import logo from './logo.svg';
import Dashboard from './container/Dashboard';
import rootReducer from './redux/reducer';

const store = createStore(rootReducer)

const App = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
