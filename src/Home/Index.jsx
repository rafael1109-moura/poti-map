import React from 'react'
import './Style.css'
import Navbar from './Navbar'
import Hero from './Hero'

function Index({ onNavigate }) {
  return (
    <div className="home-page">
      <Navbar onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
    </div>
  )
}

export default Index
