import './AddComment.scss'
import axios from "axios"
const URL = import.meta.env.VITE_BASE_URL


function CommentsModal({getPosts, coords, toggleModal, decodedToken}){

  function handleSubmit (e) {
    e.preventDefault()
    async function post () {
      try{
        const {data} = await axios.post(`${URL}/posts`,
        {
          lat: coords.lat,
          lng: coords.lng,
          comment: e.target.comment.value,
          user_id: decodedToken.id || 1
        })

      } catch (err) {
        console.error(err)
      }
    }
    post()
    setTimeout(()=>getPosts(),2500)
    
    toggleModal()
    e.target.comment.value = ''
  }

  
  return(
    <section >
        <form className='add-comment__form add-comment__font' action="submit" onSubmit={handleSubmit}>
          <label  className='add-comment__label' htmlFor="comment">INSPIRED?</label>
          <textarea className='add-comment__comment add-comment__font' type="text" name="comment"rows="12"/>
          <button className='add-comment__submit add-comment__font' type="submit">MAP YOUR MIND</button>
        </form>
    </section>
  )
}

export default CommentsModal