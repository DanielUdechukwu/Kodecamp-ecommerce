import React from "react";
import { Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Example from "./components/Main";
import Cart from "./pages/Cart";

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/example" element={<Example />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>    
  )
}

export default App