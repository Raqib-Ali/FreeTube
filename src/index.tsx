import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/admin' element={<AdminPanel/>}></Route>
      <Route path='/admin-login' element={<AdminLogin/>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
