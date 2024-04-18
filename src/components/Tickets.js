
import './Content.css';
import React, { useState, useEffect } from 'react';
import tickets from '../api_mock/tickets.json';
import image from "../assets/tickets/siam.jpeg"
import Button from '@mui/material/Button';

const Tickets = ({ listCart, setListCart }) => {


  const addTicket = (item) => {
    let temp = [...listCart];
    const getIndexId = temp.findIndex(x => x.id == item.id);
    if (getIndexId >= 0) {
      temp[getIndexId].total = (temp[getIndexId].total || 0) + 1;
    } else {
      temp = [...temp, { ...item, total: 1 }]
    }
    setListCart(temp)
    localStorage.setItem('myList', JSON.stringify(temp))
  };


  return (
    <div className="card d-col-6 t-col-6 m-col-6">
      <h2>TICKETS</h2>
      {tickets.map(item => (
        <div className="component-content" >
          <img src={image} className="image-logo" />
          <div className="content-text">{item.title}</div>
          <div className="content-text">{item.price} THB</div>
          <div className="content-text">  <Button onClick={() => addTicket(item)} variant="outlined">Add</Button></div>

        </div>

      ))}
    </div>
  );
};


export default Tickets;


