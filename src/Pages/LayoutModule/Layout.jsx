import React, { Component } from 'react'
import { BrowserRouter, Routes, Route,Link,Outlet } from "react-router-dom";

export default class Layout extends Component {
  render() {
    return (
      <div>
         <nav>
        <ul>
          <li>
            <Link to="/">Dash</Link>
          </li>
          <li>
            <Link to="/personel">Pers</Link>
          </li>
          <li>
            <Link to="/hv">Hv</Link>
          </li>

          <li>
            <Link to="/isemirleri">emirler</Link>
          </li>

          
        </ul>
      </nav>

      <Outlet />


      </div>
    )
  }
}
