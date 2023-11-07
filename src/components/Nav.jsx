import React, { useState } from "react";
import { Link } from "react-router-dom";
import Bag from '../assets/shopping-bag.svg'
import MagnifyingGlass from '../assets/magnifying-glass.svg'
import { useGlobalContext } from "../context/context";

const Nav = () => {
  const [cartVisibility, setCartVisibility] = useState(true)
  const {cart, setCart} = useGlobalContext()

  const checkCart = () => {
    console.log(cart)
    console.log("clicked")
    setCartVisibility(!cartVisibility)
  }

  const cartItem = cart.length
  // console.log(cartItem)

  const viewCart = () => {
    console.log("Vuewing Cart")
  }

  return (
    <div className="relative">
      <header>
        <nav className="flex items-center p-4 font-Inter">
          <h3 className="mr-auto">Komerce</h3>

          <div className="ml-auto flex items-center">
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              <Link to="/signin" className="text-sm font-semibold text-gray-600 hover:text-gray-800">
                Sign in
              </Link>
              <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
              <Link to="/signup" className="text-sm font-semibold text-gray-600 hover:text-gray-800">
                Create account
              </Link>
            </div>

            {/* Search */}
            <div className="flex lg:ml-6">
              <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                <img src={MagnifyingGlass} alt="" className="h-6" />
              </a>
            </div>

            {/* Cart */}
            <div className="ml-4 flow-root lg:ml-6" onClick={checkCart}>
              <a href="#" className="group -m-2 flex items-center p-2">
                <img src={Bag} alt="" />
                <span className="ml-2 text-sm font-semibold text-gray-700 group-hover:text-gray-800">{cartItem}</span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      <div className={cartVisibility ? 'hidden' : ''}>
        <div className="cart absolute right-4 py-2 border shadow-md border-gray-100 rounded-lg w-[22rem] font-Inter bg-white z-50">
          <div className="max-h-[21rem] overflow-y-scroll px-6">
            {cart.map((showCart) => {
              const {id, title, price, description, image, } = showCart

              return (
                <div key={id} className="flex items-center gap-4 py-4 border-b-[1px] border-gray-100">
                  <img src={image} alt="" className="w-[80px] p-3 border border-gray-100 rounded-lg" />
                  <div className="">
                    <h4 className="text-sm">{title}</h4>
                    <p className="text-sm text-gray-500">${price}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <Link to="/cart">
            <div className="flex items-center justify-center mt-8 mb-4 px-6" onClick={viewCart}>
              <button type="submit" className="bg-[#4f46e5] hover:bg-[#4338ca] transition ease-in-out text-center p-2 w-full text-white font-medium rounded border-0 text-sm">View Cart</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Nav