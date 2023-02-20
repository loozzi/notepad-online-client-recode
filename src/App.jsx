import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Logout from './components/Common/Logout';
import Private from './components/Common/Private';
import Public from './components/Common/Public';
import Create from './components/Layout/Create';
import Edit from './components/Layout/Edit';
import Home from './components/Layout/Home';
import Login from './components/Layout/Login';
import View from './components/Layout/View';
import Category from './components/Layout/Category';
import All from './components/Layout/All';
import routes from './utils/routes';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={routes.PUBLIC} element={<Public />}>
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.VIEW} element={<View />} />
        </Route>
        <Route path={routes.PUBLIC} element={<Private />}>
          <Route path={routes.HOME} element={<Home />} />
          <Route path={routes.CREATE} element={<Create />} />
          <Route path={routes.EDIT} element={<Edit />} />
          <Route path={routes.CATEGORY} element={<Category />} />
          <Route path={routes.ALL} element={<All />} />
          <Route path={routes.LOGOUT} element={<Logout />} />

          <Route element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
