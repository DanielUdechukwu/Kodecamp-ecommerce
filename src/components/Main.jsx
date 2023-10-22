import React, { useState } from "react";
import axios from "../api/axios";
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";


const Main = () => {
  const [isLoading, setIsLoading] =  useState(false)
  const [product, setProduct] = useState([])
  const {cart, setCart} = useGlobalContext()

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
  }

  return(
    <>
      { isLoading ? <p className="text-center">Loading</p> : 
        <div className="bg-white font-Inter">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
            {/* <button className="bg-gray-200 hover:bg-gray-400 p-2 rounded">Check Cart</button> */}
    
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {product.map((items) => {
                const {id, title, price, description, category, image, rating} = items;
                
                return(
                  <div key={id} className="border border-1 rounded-lg p-4">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-60">
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
                            {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                            {title}
                          </a>
                        </h3>
                        {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
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
    </>
  )
}




// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   // More products...
// ]

// const Example = () => {
//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//           {products.map((product) => (
//             <div key={product.id} className="group relative">
//               <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                 <img
//                   src={product.imageSrc}
//                   alt={product.imageAlt}
//                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                 />
//               </div>
//               <div className="mt-4 flex justify-between">
//                 <div>
//                   <h3 className="text-sm text-gray-700">
//                     <a href={product.href}>
//                       <span aria-hidden="true" className="absolute inset-0" />
//                       {product.name}
//                     </a>
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">{product.color}</p>
//                 </div>
//                 <p className="text-sm font-medium text-gray-900">{product.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }


export default Main