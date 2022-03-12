//import { hot } from 'react-hot-loader/root';


import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from 'react';

import Personel from './Pages/PersonelModule/Personel';
import HvListe from './Pages/HareketVarisModule/HvListe'
import HvForm from './Pages/HareketVarisModule/HvForm'
import Layout from './Pages/LayoutModule/Layout'
import IsEmirleri from './Pages/IsEmirModule/IsEmirleri'


class App extends Component {
  constructor() {
    super();
   
  }


  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="personel" element={<Personel/>}/>
          <Route path="hv" element={<HvForm/>}/>
          <Route path="isemirleri" element={<IsEmirleri/>}/>
          </Route>
  
        </Routes>
      </BrowserRouter>
    );
  }
}


export default App;