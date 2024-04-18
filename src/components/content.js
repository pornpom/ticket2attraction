import Cart from "./Cart";
import Tickets from "./Tickets";
import './Content.css';
import { useEffect, useState } from "react";



const Content = () => {
  const [listCart, setListCart] = useState(JSON.parse(localStorage.getItem('myList')) || []);
  return <div className="detail-grind">
    <Tickets listCart={listCart} setListCart={setListCart} />
    <Cart listCart={listCart} setListCart={setListCart} />
  </div>;
};

export default Content;
