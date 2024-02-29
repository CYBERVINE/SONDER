import Map from "../../components/Map/Map.tsx"
import AddComment from '../../components/AddComment/AddComment.tsx'
import './MapPage.scss'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

function MapPage ({giveCoords, coords, getLoginId, decodedToken}) {

  const URL = import.meta.env.VITE_BASE_URL
  const [posts, setPosts] = useState([])
  const [modalActive, setModalActive] = useState("")
  const [formActive, setFormActive] = useState("")
  const [mapMove, setMapMove] = useState("")
  const navigate = useNavigate()

  function toggleMain (userId) { 
    userId = userId ? userId : 1
    setMapMove("map-div--out")
    setTimeout(() => {
      navigate(`/profile/${userId}`)
    }, 800);
  }

  function toggleModal () {
    modalActive === "" ? setModalActive("modal-div--active") : setModalActive("")
    formActive === "" ? setFormActive("form-div--active") : setFormActive("")

  }

  async function getPosts () {  
    const {data} = await axios.get(`${URL}/posts`)
    setPosts(data)
  }
  
  useEffect(()=>toggleModal,[])
  useEffect(()=>getLoginId(),[])

  return (
    <section className="main-page">
      <div onClick={toggleModal} className= {`modal-div ${modalActive}`} ></div>
      <div className={`form-div ${formActive}`}>
        <AddComment decodedToken={decodedToken} getPosts={getPosts} posts={posts} giveCoords={giveCoords} coords={coords} toggleModal={toggleModal}/>
      </div>
      <div className={`map-div ${mapMove}`}>
        <Map  decodedToken={decodedToken} getLoginId={getLoginId} getPosts={getPosts} posts={posts} giveCoords={giveCoords} coords={coords} toggleMain={toggleMain} toggleModal={toggleModal} modalActive={modalActive} mapMove={mapMove}/>
      </div>
    </section>
  )
}

export default MapPage