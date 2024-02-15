import { Routes, Route } from "react-router-dom";
import Welcome from "../components/Welcome";
import About from "../components/About";
import React from 'react'
import Layout from "../components/Layout";
import App from "../App";

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
            <Route path="/" element={<App/>}/>
            <Route path="welcome" element={<Welcome/>}/>
            <Route path="about" element={<About/>}/>
        </Route>
    </Routes>
  )
}

export default AppRouter