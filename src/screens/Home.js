import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'

export default function Home() {
  const [foodcategory, setfoodCategory] = useState([])
  const [foodItem, setFoodItem] = useState([])

  const lodingData = async () => {
    const response = await fetch("http://localhost:5000/category", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    setfoodCategory(json.data)

  }
  useEffect(() => {
    lodingData()
  }, [])

  const lodingfoodcateData = async () => {
    const response = await fetch("http://localhost:5000/foodcategory", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    setFoodItem(json.data)

  }
  useEffect(() => {
    lodingData()
    lodingfoodcateData()
  }, [])
  return (
    <div>
      <div><Navbar /></div>
      <div>
        <Carousal />
      </div>
      <div className='container'>
        {
          foodItem.map((data) => {
            return (
              <div className='row mb-3'>

              <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
             <hr/>
              {
foodcategory.filter((item)=>item.CategoryName == data.CategoryName).map(filterItem=>{
  return(
    <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
     
      <Card foodName={filterItem.name}
      options={filterItem.options}
      imgSrc={filterItem.img}></Card>
     
      </div>
  )
})
              }
              </div>
            )
          })
        }
        {/* <Card/> */}
      </div>
      <div><Footer /></div>
    </div>
  )
}
