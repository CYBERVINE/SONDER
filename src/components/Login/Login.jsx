import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import './Login.scss'

function Login ({getLoginId}) {
  const URL = import.meta.env.VITE_BASE_URL
  const [noMatch, setNoMatch] = useState("")
  const [noEmail, setNoEmail] = useState("")
  const navigate = useNavigate()
  function handleSubmit (e) {
    e.preventDefault()
    async function validateUser (e) {
      const form = e.target

      setNoEmail("")
      setNoMatch("")
      try {
        const response = await axios.post(`${URL}/login`,
        {
          email : form.email.value,
          password : form.password.value
        }
        )
        sessionStorage.authToken = response.data.token
        if (sessionStorage.authToken && sessionStorage.authToken !== "undefined"){
          getLoginId()
          navigate('/map')
        }

        console.log(response)
      } catch (err) {
        console.error(err.response)
        if (err.response.status === 404) {
          setNoEmail("form__error")
        }
        if (err.response.status === 403) {
          setNoMatch("form__error")
        }
      }
    }
    validateUser(e)
  }
  return (
    <section className="login">
    <form className='login__form form' action="submit" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <p className={noEmail === "" ? "none" : "display"}>This email is not registered</p>
      <input className={`form__input ${noEmail}`} type="text" name="email" placeholder='Email' required/>
      <p className={noMatch === "" ? "none" : "display"}>Invalid email password combination.</p>
      <input className={`form__input ${noMatch}`} type="password" name="password" placeholder='Password' required/>
      <button className='form__button' type="submit">Login</button>
      <div className='link-section'>
      <p className="link-section__description">Don't have an account? </p><Link className='link-section__link' to={'/signup'}> Sign Up</Link>
      </div>
    </form>
  </section>
  )
}

export default Login