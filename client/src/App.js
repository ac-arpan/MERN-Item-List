import React,{ useEffect } from 'react';
import { Provider } from 'react-redux'
import store from './store';
import { loadUser } from './actions/authActions'

import { Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import AppNavbar from './components/AppNavbar';
import ShopingList from './components/ShopingList';
import ItemModal from './components/ItemModal';


function App() {

  useEffect( () => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal/>
          <ShopingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
