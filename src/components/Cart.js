import { useEffect, useState } from 'react';
import './Content.css';
import Button from '@mui/material/Button';
import discounts from '../api_mock/discounts.json';

const Cart = ({ listCart, setListCart }) => {
  const [text, setText] = useState('');
  const sum = listCart.reduce((acc, curr) => acc + (curr.total * curr.price), 0);
  const [grandTotal, setGrandTotal] = useState({
    "amountFinal" : 0 ,
    "discountFinal" : 0 
  });
  
  useEffect(() => { 
    setGrandTotal({"amountFinal" : 0 , "discountFinal" : 0 })

  }, [listCart])



  const promocode = (event) => {
    setText(event.target.value);
  
  };


  return <div className="card d-col-6 t-col-6 m-col-6">
    <h2>CART</h2>
    {listCart.length > 0 ? listCart.map((item, index) => {
      return (
        <div className="component-cart-content" key={index}>

          <div className="content-cart-text">{item.title}</div>
          <Button variant="contained" color="error" onClick={() => {

            let temp = [...listCart];
            const getIndexId = temp.findIndex(x => x.id == item.id);
            if (getIndexId >= 0) {
              temp[getIndexId].total = (temp[getIndexId].total || 0) -1;
              if(temp[getIndexId].total == 0){
                temp.splice(getIndexId, 1);
              }
            }
        setListCart(temp)
        localStorage.setItem('myList', JSON.stringify(temp))
          }}>-</Button>

          <div className="content-cart-text">{item.total}</div>
          <Button variant="contained" color="success" onClick={() => {

            let temp = [...listCart];
            const getIndexId = temp.findIndex(x => x.id == item.id);
            if (getIndexId >= 0) {
              temp[getIndexId].total = (temp[getIndexId].total || 0) + 1;
            } else {
              temp = [...temp, { ...item, total: 1 }]
            }
            setListCart(temp)
            localStorage.setItem('myList', JSON.stringify(temp))
          }}>+</Button>

        </div>



      


      )
    }) : null}

    <div className="cart-footer">
      <div className="content-total">total</div>
      <div className="content-total-no"> {sum} THB</div>
    </div>

    <div className="cart-footer">
      <div className="content-total">discount</div>
      <div className="content-total"><input
        type="text"
        onKeyUp={promocode}
        placeholder="Enter Code..."
      /></div>
       <div className="content-total"><Button  variant="outlined" onClick={() => {
            
           let discountFilter =  discounts.find(d=> d.code == text);
           if(discountFilter){
              let grandFinal = 0 ; 
              let discountFinal = 0 ; 
              if("percentage" == discountFilter.type){
                discountFinal = (sum * discountFilter.discount ) / 100 ;
                grandFinal = sum  - discountFinal ; 
              }else{
                discountFinal = discountFilter.discount;
                grandFinal = sum - discountFilter.discount
              }

              setGrandTotal( {"amountFinal" : grandFinal , "discountFinal" : discountFinal });
           }
        }} >ใช้ Code</Button></div>
      <div className="content-total-no"> {grandTotal.discountFinal} THB</div>
    </div>


    <div className="cart-footer">
      <div className="content-total">Grand Total</div>
      <div className="content-total-no">{grandTotal.amountFinal}  THB</div>
    </div>

    
  </div>
};

export default Cart;
