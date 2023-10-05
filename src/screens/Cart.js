import React from 'react'
import { useCart, useDispatchCart } from '../components/contexReducer'
import Delete from '@material-ui/icons/Delete'

export default function Cart() {
    let data =useCart();
    let dispatch = useDispatchCart();
    if(data.length === 0){
        return(
            <div>
                <div className='m-5 w-100 text-center fs-3 text-white'>Cart is Empty ... </div>
            </div>
        )
    }
    let totalPrice = data.reduce((total,food)=>total+food.price,0)
  return (
    <div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
<table className='table table-hover'>
    <thead className='text-success fs-4'>
        <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Option</th>
            <th scope='col'>Amount</th>
            <th scope='col'>#</th>
        </tr>

    </thead>
    <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' className='text-white'>{index + 1}</th>
                <td className='text-white'>{food.name}</td>
                <td className='text-white'>{food.qty}</td>
                <td className='text-white'>{food.size}</td>
                <td className='text-white'>{food.price}</td>
                <td ><button type="button" className="btn p-0"><Delete className='bg-danger'onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
</table>
<div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 '  > Check Out </button>
        </div>
        </div>
    </div>
  )
}
