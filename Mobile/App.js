"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import MobileCompany from './Components/MobileCompany.jsx';


let clientsArr = require('./clients.json');

ReactDOM.render(
  <MobileCompany 
    companyName="Velcom"
    clientsArr={clientsArr}
  />, 
    document.getElementById('container') 
);