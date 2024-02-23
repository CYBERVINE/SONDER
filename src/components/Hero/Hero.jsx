import { Link } from "react-router-dom"
import "./Hero.scss"

function Hero () {
  return (
    <>
    <div className="header">
    <h1 className="header__line header__line--one">THE WORLD IS THE POST</h1>
    <h1 className="header__line header__line--two">AND THIS IS THE COMMENT SECTION</h1>
    <h1 className="header__line--sonder">SONDER</h1>
    <h1 className="header__line header__line--three">MAP YOUR INNER MONOLOGUE</h1>
    </div>
    <section className="enterance">
      <Link to={'/map'} className="enterance__anonymous enterance__card">
        <p className="enterance__anonymous--text"> view map</p>
        <p className="enterance__anonymous--text"> post anonymously</p>
        <div className="ellpses">
          <div className="ellpsis ellpsis__one"></div>
          <div className="ellpsis ellpsis__two"></div>
          <div className="ellpsis ellpsis__three"></div>
        </div>
      </Link>
      <div className="enterance__known enterance__card">
        <Link className="enterance__known--text" to={'/login'}>LOGIN</Link>
        <p>or</p>
        <Link className="enterance__known--text" to={'/signup'}>SIGN UP</Link>
      </div>
    </section>
    </>
  )
}

export default Hero