import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import moment from "moment/moment";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:5000/myorderdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });

    // await res.map((data)=>{
    //    console.log(data)
    // })
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {console.log("orderData", orderData)}
          <span>{moment(orderData?.order_date).format('DD-MM-YYYY HH:mm:ss')}</span>
          {orderData &&
            orderData?.order_data?.map((item) => (
              <div className='col-12 col-md-6 col-lg-3' >
              <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                  <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                  <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <div className='container w-100 p-0' style={{ height: "38px" }}>
                          <span className='m-1'>{item.qty}</span>
                          <span className='m-1'>{item.size}</span>
                          {/* <span className='m-1'>{data}</span> */}
                          <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                              ₹{item.price}/-
                          </div>
                      </div>
                  </div>
              </div>

          </div>
            ))}


        </div>
      </div>

      <Footer />
    </div>
  );
}
