import { useState } from 'react'
import './App.css'
import foodItems from './foodItems.json'
import OrderCalculator from './OrderCalculator' 

function App() {
  const [order] = useState(new OrderCalculator(foodItems.menu))
  const [total,setTotal] = useState(0)
  const [discount,setDiscount] = useState(0)
  const [quantity, setQuantity] = useState({}); 
  const [checked,setChecked] = useState(false)

  const increaseOrder = (id)=>{
    order.increaseOrder(id)
    setQuantity(item=>({
      ...item,
      [id]: (item[id] || 0 ) + 1
    }))
    setDiscount(order.calTotalDiscount())
    setTotal(order.calTotal())
  }

  const decreaseOrder = (id)=>{
    order.decreaseOrder(id)
    setQuantity(item=>({
      ...item,
      [id] :  Math.max((item[id] || 0 ) - 1 , 0)
    }))
    setDiscount(order.calTotalDiscount())
    setTotal(order.calTotal())
  }

  const handleCheckMember = (hasMember) =>{
      order.checkMember(hasMember)
      setChecked(hasMember)
      setDiscount(order.calTotalDiscount())
      setTotal(order.calTotal())
  }


  return (
    <div className="container">
      <div>
         <h2>Menu Set</h2>
        <div>
          {order.orderWithQuantity().map(item=>{
            return(
              <ul key={item.id}>
                <li className='menu-list'>
                  <h4>{item.name} </h4>  
                  <span>{item.price} THB</span>
                  <div className='button-box'>
                      <button onClick={()=>decreaseOrder(item.id)} className='m-r-1 p-5px'>-</button>
                      <button className='m-r-1 p-5px'>{item.quantity}</button>
                      <button onClick={()=>increaseOrder(item.id)} className='p-5px'>+</button>
                  </div>
                </li>
                
              </ul>
            )
            
          })}
        </div>
      </div>
      <div className="total-box">
        <div className='member-box'>
            <h4>Do you have a member card</h4>
            <div>
              <button onClick={()=>handleCheckMember(true)}className='p-5px m-r-1'>Yes</button>
              <button onClick={()=>handleCheckMember(false)}className='p-5px'>No</button>
            </div>
           
        </div>
        <div className='font-500'>
          <div >Use a member card to discount 10% of total:  <span>{checked ? "Yes" : "No"}</span></div>
          <div>Discount  : <span>{discount} THB</span></div>
          <div>Total before discount  : <span>{total} THB</span></div>
          
        </div>
        <h3>Total  : <span>{total - discount} THB</span></h3>
       
      </div>
    </div>
  )
}

export default App
