import './AddComment.scss'
import axios from "axios"
const URL: string = import.meta.env.VITE_BASE_URL

interface Coordinates {
  lat: number;
  lng: number;
}

interface Props {
  getPosts: ()=> void;
  toggleModal: ()=> void;
  decodedToken: string
  coords: Coordinates;
}

function CommentsModal({getPosts, coords, toggleModal, decodedToken}:Props): JSX.Element{

  function handleSubmit (e: any) {
    e.preventDefault()
    async function post():Promise<void> {
      try{
        await axios.post(`${URL}/posts`,
        {
          lat: coords.lat,
          lng: coords.lng,
          comment: e.target.comment.value,
          user_id: decodedToken || 1
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
          <textarea className='add-comment__comment add-comment__font' name="comment"rows={12}/>
          <button className='add-comment__submit add-comment__font' type="submit">MAP YOUR MIND</button>
        </form>
    </section>
  )
}

export default CommentsModal