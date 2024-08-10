import React from 'react'
import Navbar from '../components/Navbar'
import Slide from '../components/Slide'
import Categories from '../components/Categories'
import Loader from '../components/Loader'
import Listings from '../components/Listings'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
    </>
  )
}

export default HomePage