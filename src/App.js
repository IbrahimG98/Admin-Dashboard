import logo from './logo.svg';
import React,{useEffect} from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import MainList from './components/MainList';
import {getPosts} from "./actions/mainlist";
import Form from './components/form/form';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getPosts());
  },[dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<MainList/>} />
      <Route path='/new' element={<Form/>} />
      <Route path='/edit/:id' element={<Form/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
