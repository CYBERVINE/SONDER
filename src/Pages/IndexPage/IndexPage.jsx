import React from 'react'
import Hero from "../../components/Hero/Hero.jsx"
import './IndexPage.scss'

const URL = import.meta.env.VITE_BASE_URL
function IndexPage ()  {
  return (
    <main className="index">
    <section className="index-page">
      {/* <video className="index-page__video"src={`${URL}/animations/hero.mov`} loop={true} autoPlay={true} muted type="video/mp4"></video> */}
      <img className="index-page__video"src={`${URL}/animations/hero.png`}></img>
    <Hero/>
    </section>
      <div className="index-page__backing">
      </div>
      <footer className="index-page__footer">                                                     
        <p className="index-page__footer--text index-page__footer--quote">
           <b>Sonder</b>, <i>noun</i>: The feeling upon realizing that all people, including strangers passing in the street, lives a life as rich and complex as one's own.</p>
        <p className="index-page__footer--text index-page__footer--quote">
           The world inspires thoughts that often go unshared. SONDER is for business owners, activists, poets, and any one who wants to share thier nuggets of wisdom, or promote their good to the world.</p>
        <p className="index-page__footer--text index-page__footer--quote">
           <b> PERSONAL JOURNAL, PROMOTIONAL TOOL, AVENUE FOR EMPATHY </b></p>
        <div className="index-page__footer--links">  
        <p className="index-page__footer--text">&#169; KEVIN BYRNE </p>
        <a className="index-page__footer--text index-page__footer--link" target="_blank" href="https://linkedin.com/in/kevinbyrne09"> LinkedIn</a>
        <a className="index-page__footer--text index-page__footer--link" target="_blank" href="https://github.com/CYBERVINE">github</a>
        <a className="index-page__footer--text index-page__footer--link" target="_blank"href="https://kevin-byrne-portfolio.vercel.app">Personal Website</a>
        </div>
      </footer>

    </main>
  )
}

export default IndexPage