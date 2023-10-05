import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'

export default function Home() {
  const [foodcategory, setfoodCategory] = useState([])
  const [foodItem, setFoodItem] = useState([])
  const [search, setSearch] = useState([])
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
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !importent" }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className='d-flex justify-content-center'>
                <input className='form-control me-2' type="search" placeholder='Search' aria-label='Search' value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className='btn btn-outline-success text-white bg-success' type='submit' >Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?momos" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {console.log("foodItemss", foodItem, foodcategory)}
        {
          foodItem.map((data) => {
            return (
              <div className='row mb-3'>

                <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                <hr />
                {
                  foodcategory.filter((item) => (item.CategoryName == data.CategoryName)).map(filterItem => {
                    console.log(filterItem, "[[][][][][][][][][][][][][][]")
                    return (
                      <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>

                        <Card foodItems={filterItem}
                          options={filterItem.options[0]}
                        ></Card>

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
