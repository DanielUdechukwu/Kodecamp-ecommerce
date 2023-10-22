import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Main from '../components/Main'

const Home = () => {
  return (
    <>
      <Nav />
      <Main />
    </>
  )
}

export default Home