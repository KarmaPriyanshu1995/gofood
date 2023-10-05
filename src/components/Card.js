import React, { useCallback, useEffect, useRef, useState } from 'react'
import pizza from '../assets/images/pizza.jpeg'
import { useCart, useDispatchCart } from './contexReducer'
export default function Card(props) {
  let dispatch = useDispatchCart();
  let options = props.options;
  console.log("prossps", props)
  const priceRef = useRef()
  let priceoptions = Object.keys(options)
  let data = useCart()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  console.log("dataaaaa", data)
  // const handleAddToCart = async (props) => {
  //   await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price:finalPrice, qty: qty, size: size })
  //   console.log("[][][][][][]", props,data)
  // }
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id ===props.foodItems._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id:props.foodItems._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id:props.foodItems._id, name: props.foodItems.name, price:finalPrice, qty: qty, size: size })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id:props.foodItems._id, name: props.foodItems.name, price:finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }
  let finalPrice =qty*parseInt(options[size])
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <div className="card ml-3 mb-3" style={{ "width": "16rem", "maxHeight": "30rem" }}>
      <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
      <div className="card-body">
        <h5 className="card-title">{props.foodItems.name}</h5>
        <p className="card-text">This is some important text .</p>
        <div className='container w-100'>
          <select className='m-2 h-100 bg-success text-white' onChange={(e) => setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option className='text-white' key={i + 1} value={i + 1}>{i + 1}</option>
              )
            })}
          </select>
          <select className='m-2 h-100 bg-success text-white' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
            {priceoptions.map((data) => {
              console.log(data, "data")
              return <option value={data} key={data} className='text-white'>{data}</option>
            })}

          </select>
          <div className='d-inline h-100 fs-5 '>
          ₹{finalPrice}/-
          </div>
        </div>
        <hr></hr>
        <button className={`btn btn-success justify-center ms-2`} onClick={() => handleAddToCart(props)}>Add to cart</button>
      </div>
    </div>
  )
}
