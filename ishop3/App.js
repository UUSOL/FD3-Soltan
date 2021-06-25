"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import DisplayGoodsBlock from './components/DisplayGoodsBlock.jsx';

let goodsArr=require('./goods.json');

ReactDOM.render(
  <DisplayGoodsBlock 
    companyName="Abibas"
    goods={goodsArr}
  />
  , document.getElementById('container') 
);