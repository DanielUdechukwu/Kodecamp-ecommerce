import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "../api/axios";
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import Cancel from "../assets/x-circle.svg"

const Main = () => {
  const [isLoading, setIsLoading] =  useState(false)
  const [product, setProduct] = useState([])
  const {cart, setCart} = useGlobalContext()
  const [toggleSingleItem, setToggleSingleItem] = useState(true)
  // const [currentItem, setCurrentItem] = useState([])
  const [itemData, setItemData] = useState({})
  const notify = () => toast.success("Added to cart")

  const getProducts = async () => {
    // console.log("Products")
    
    try{
      setIsLoading(true)
      const res = await axios.get('/products')
      // const products = res.data
      if (res.status === 200) {
        setIsLoading(false)
        setProduct(res.data)
        console.log(product)
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const addToCart = (id) => {
    console.log(id)
    setCart(prevState => [...prevState, product[id - 1]])
    notify()
    // alert("Added to cart")
  }

  const SinglePage = (id) => {
    console.log("Clicked for page")
    setItemData({
      name: product[id - 1].title,
      description: product[id - 1].description,
      price: product[id - 1].price,
      category: product[id - 1].category,
      image: product[id - 1].image,
      rating: product[id - 1].rating.rate
    })
    // console.log(id)
    setToggleSingleItem(!toggleSingleItem)
  }

  const CloseSinglePage = () => {
    setToggleSingleItem(!toggleSingleItem)
  }

  return(
    <div className="relative">
      <ToastContainer position="top-center" autoClose={500} />
      { isLoading ? <p className="text-center">Loading</p> : 
        <div className="bg-white font-Inter">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Available Items</h2>
            {/* <button className="bg-gray-200 hover:bg-gray-400 p-2 rounded">Check Cart</button> */}
    
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {product.map((items) => {
                const {id, title, price, description, category, image, rating} = items;
                
                return(
                  <div key={id} className="border border-1 rounded-lg p-4 cursor-pointer">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-60" onClick={() => SinglePage(id)}>
                      <img
                        src={image}
                        alt={description}
                        className="h-full w-full object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-8">
                      <div className="clamper">
                        <h3 className="text-sm text-gray-700 clamp">
                          <a href="#">
                            {title}
                          </a>
                        </h3>
                      </div>
                      <p className="text-sm pt-2 font-semibold text-gray-900">${price}</p>
                    </div>
                    <button onClick={() => addToCart(id)} className="bg-gray-300 hover:bg-gray-400 rounded py-2 px-4 mt-4 text-xs font-semibold transition ease-in-out">Add to Cart</button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      }

      {/* Single Product Item */}

      <div className={toggleSingleItem ? 'hidden' : ''}>
        <div className="font-Inter fixed top-0 h-screen w-full flex items-center justify-center bg-gray-800 bg-opacity-60" >
          <div className="flex flex-col lg:flex-row gap-10 items-center lg:w-[70%] xl:w-[60%] w-[90%] relative">
            <img className="fixed right-4 top-4 lg:right-10 lg:top-16 h-[3rem] cursor-pointer" src={Cancel} alt="" onClick={CloseSinglePage} />
            <div className="lg:h-[20rem] w-[10rem] mt-20 lg:w-[40%] rounded-xl">
              <img className="w-full h-full rounded-xl" src={itemData.image} alt="" />
            </div>

            <div className="text-white lg:w-[60%] lg:mt-14">
              <p className="lg:text-xl text-md font-bold my-3">{itemData.name}</p>
              <p className="lg:w-[90%] text-sm font-medium mb-2 md:w-[80%]">{itemData.description}</p>
              <p className="text-sm mb-5">Category: {itemData.category}</p>
              <p className="font-bold">${itemData.price}</p>
              <p className="font-medium pt-2">Rating: {itemData.rating}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Main