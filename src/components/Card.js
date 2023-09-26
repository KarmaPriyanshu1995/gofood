import React from 'react'
import pizza from '../assets/images/pizza.jpeg'
export default function Card() {
  return (
    <div className="card ml-3" style={{"width": "18rem","maxHeight":"360px"}}>
    <img src={pizza} className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">This is some important text .</p>
      <div className='container w-100'>
  <select className='m-2 h-100 bg-success text-white'>
      {Array.from(Array(6),(e,i)=>{
          return(
              <option  className='text-white' key={i+1} value={i+1}>{i+1}</option>
          )
      })}
  </select>
  <select className='m-2 h-100 bg-success rounded text-white'>
     <option value="half" className='text-white'>Half</option>
     <option value="full" className='text-white'>Full</option>
  </select>
  <div className='d-inline h-100 fs-5 '>
      Total Price
  </div>
      </div>
    </div>
  </div>
  )
}
