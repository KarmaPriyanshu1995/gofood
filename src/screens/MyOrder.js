import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/myorderdata", {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>
                {orderData !== {} ? Array(orderData).map(data => {
  console.log('dataaaaaaaaa', data)
  return (
    data.orderData ?
      data.orderData.order_data.slice(0).reverse().map((item) => {
        console.log('item', item)
        if (Array.isArray(item)) {
          return item.map((arrayData) => {
            return (
              <div>
                {arrayData.Order_date ? (
                  <div className='m-auto mt-5'>
                    {data = arrayData.Order_date}
                    <hr />
                  </div>
                ) : (
                  <div className='col-12 col-md-6 col-lg-3'>
                    {/* Rest of your card rendering code */}
                  </div>
                )}
              </div>
            )
          });
        } else {
          // Handle the case where item is not an array
          return null; // or any other appropriate action
        }
      }) : ""
  )
}) : ""}


                </div>


            </div>

            <Footer />
        </div>
    )
}