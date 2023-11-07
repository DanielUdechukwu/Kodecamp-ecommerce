import React from "react";
import { Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Example from "./components/Main";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/example" element={<Example />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>    
  )
}

export default App