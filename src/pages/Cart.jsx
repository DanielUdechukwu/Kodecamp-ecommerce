import { useState, useEffect } from "react"
import Check from "../assets/check.svg"
import Plus from "../assets/plus.svg"
import Minus from "../assets/minus.svg"
import Del from "../assets/x-circle.svg"
import { useGlobalContext } from "../context/context"

const Cart = () => {
  const [itemIncrease, setItemIncrease] = useState(0)
  const { cart, setCart } = useGlobalContext()
  const [cartTotal, setCartTotal] = useState(0)
  const [orderTotal, setOrderTotal] = useState(0)
  let shippingFee = 0 //4.99
  let tax = 0 //8.95

  const handleIncrease = () => {
    console.log("Increased")
    setItemIncrease(prevState => prevState + 1)
  }

  const handleDecrease = () => {
    console.log("Decreased")
    itemIncrease === 0 ? setItemIncrease(0) : setItemIncrease(prevState => prevState - 1)
  }

  useEffect(() => {
    // Calculate the cart total by summing the prices
    const total = cart.reduce((accumulator, item) => accumulator + item.price, 0);
    total.toFixed(2)
    setCartTotal(total);
    let grandTotal = (total + tax + shippingFee).toFixed(2)
    setOrderTotal(grandTotal)
    console.log(cartTotal)
  }, [cart]);

  const DeleteCartItem = (id) => {
    console.log(id)
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    // cart.map((delItem) => {
    //   setCart()
    // })
  }
  
  if (cart.length >= 1) {
    tax = 8.95
    shippingFee = 4.99
  }

  return(
    <div className="font-Inter h-screen">
      <h2 className="text-3xl font-bold mt-8 mb-2 md:mb-5 px-4 lg:mb-8 xl:w-[90%] xl:mx-auto">Shopping Cart</h2>

      <div className="lg:flex lg:gap-4 lg:px-4 xl:w-[90%] xl:mx-auto">
        <div className="p-4 lg:w-3/4 lg:p-0">
          <div className="border border-gray-100 rounded-lg max-h-[20rem] lg:max-h-[30rem] overflow-y-scroll scroll-smooth md:w-4/5 md:mx-auto lg:w-full lg:border-0 lg:border-b lg:rounded-none">
            {/* map from here */}
            {cart.map((cartItems) => {
              const { id, title, price, category, image} = cartItems

              return (
                <div key={id} className="px-2 flex items-center gap-5 relative mb-3 lg:border-t lg:py-2">
                  <img className="absolute lg:top-6 lg:right-6 top-2 right-2 h-8 cursor-pointer" src={Del} alt="" onClick={() => DeleteCartItem(id)} />
                  <div className="lg:w-[7rem] lg:h-[7rem] w-[4rem] h-[4rem]">
                    <img src={image} alt="" />
                  </div>
                  <div className="flex flex-col justify-between xl:w-[80%]">
                    <div className="py-4">
                      <p className="lg:text-md text-sm font-medium">{title}</p>
                      <div className="flex gap-3 mt-1 mb-2">
                        <p className="lg:text-sm text-[.75rem] text-gray-500 font-medium">{category}</p>
                        <div className="border-r-2 border-gray-400"></div>
                        <p className="lg:text-sm text-[.75rem] text-gray-500 font-medium">Size</p>
                      </div>
                      <p className="text-sm font-semibold">${price}</p>

                      <div className="flex items-center justify-center w-[6.5rem] bg-[#e0e7ef] rounded mt-4">
                        <button className="w-20 flex justify-center py-1 hover:bg-[#cbd5e0] rounded-l h-10 px-2" onClick={handleDecrease}><img className="" src={Minus} alt="" /></button>
                        <p className="w-20 flex justify-center py-1 px-2">{itemIncrease}</p>
                        <button className="w-20 flex justify-center py-1 hover:bg-[#cbd5e0] rounded-r h-10 px-2" onClick={handleIncrease}><img className="" src={Plus} alt="" /></button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <img className="lg:h-4 h-3" src={Check} alt="" />
                      <p className="lg:text-sm text-[.75rem]">In stock</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <section className="bg-[#f9fafb] p-4 font-Inter sm:mx-4 sm:rounded-md sm:mb-4 md:w-4/5 md:mx-auto lg:w-2/4 lg:max-h-[21rem]"> 
          <h4 className="text-lg font-semibold">Order Summary</h4>

          <div className="mb-3">
            <div className="flex items-center justify-between border-b-[1px] py-4">
              <p className="text-sm text-gray-700 font-medium">Subtotal</p>
              <p className="text-sm font-medium">${cartTotal}</p>
            </div>
            <div className="flex items-center justify-between border-b-[1px] py-4">
              <p className="text-sm text-gray-700 font-medium">Shipping Fee</p>
              <p className="text-sm font-medium">${shippingFee}</p>
            </div>
            <div className="flex items-center justify-between border-b-[1px] py-4">
              <p className="text-sm text-gray-700 font-medium">Tax Estimate</p>
              <p className="text-sm font-medium">${tax}</p>
            </div>

            <div className="flex items-center justify-between my-4">
              <p className="text-sm font-medium">Order Total</p>
              <p className="text-sm font-medium">${orderTotal}</p>
            </div>
            
            <div className="my-6">
              <button className="bg-[#4f46e5] hover:bg-[#4338ca] transition ease-in-out py-2 text-center w-full text-white rounded-md">Checkout</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Cart