import './Signup.scss'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"

function Signup () {

  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [emailInUse, setEmailInUse] = useState("")

  function handleSubmit (e) {
    e.preventDefault()
    async function makeUser (e) {
      const form = e.target
      setEmailInUse("")
      setPassword("")

        if ((form.password.value === form.confirmPassword.value) && form.password.value.length > 4){

          try{
            const response = await axios.post('http://localhost:8080/users', 
            {
              username: form.username.value,
              email: form.email.value,
              password: form.password.value,
              city: "default",
              avatar: "http://localhost:8080/avatars/anonymous.png",
              description: "New to Sonder"
            })
          } catch (err) {
            console.error(err)
            
            if (err.response.data === "That email is already in use"){
              console.log(err.response.data)
              setEmailInUse("form__error")
              return
            }
          }
          navigate('/login')
        } else {
          setPassword("form__error")
        }
      }
      makeUser(e)
  }
  return (
    <section className="signup">
      <form className='form' action="submit" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input className='form__input'type="text" name="username" placeholder='Username' required/>
        <input className={`form__input ${emailInUse}`} type="email" name="email" placeholder='Email'  required/>
        <p className={emailInUse === "" ? "none" : "display"}>This email is already in use.</p>
        <input className={`form__input ${password}`} type="password" name="password" placeholder='Password'/>
        <p className={password === "" ? "none" : "display"}>Passwords must match.</p>
        <input className={`form__input ${password}`} type="password" name="confirmPassword" placeholder='Confirm Password' />
        <p className='signup__text'>Password must be 5 or more character long.</p>
        <button className='form__button' type="submit">Sign Up</button>
        <div className='link-section'>
        <p className='link-section__description'>Already have an account? </p><Link className='link-section__link' to={'/login'}> Login In</Link>
        </div>
        <p className='signup__text'>"It's hard to walk a mile, but we can share a step"</p>
      </form>
    </section>
  )
}

export default Signup