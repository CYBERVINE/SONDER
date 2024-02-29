import Map from "../../components/Map/Map.tsx"
import AddComment from '../../components/AddComment/AddComment.tsx'
import { Post, Props } from '../../types/CustomsTypes.ts'
import './MapPage.scss'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

function MapPage({getLoginId, giveCoords, decodedToken, coords}: Props): JSX.Element{

  const URL: string = import.meta.env.VITE_BASE_URL
  const [posts, setPosts] = useState<Post[]>([])
  const [modalActive, setModalActive] = useState<string>("")
  const [formActive, setFormActive] = useState<string>("")
  const [mapMove, setMapMove] = useState<String>("")
  const navigate = useNavigate()

  function toggleMain (userId: string | number): void { 
    userId = userId ? userId : 1
    setMapMove("map-div--out")
    setTimeout(() => {
      navigate(`/profile/${userId}`)
    }, 800);
  }

  function toggleModal ():void {
    modalActive === "" ? setModalActive("modal-div--active") : setModalActive("")
    formActive === "" ? setFormActive("form-div--active") : setFormActive("")

  }

  async function getPosts ():Promise<void> {  
    const {data} = await axios.get(`${URL}/posts`)
    setPosts(data)
  }
  
  useEffect(()=>toggleModal,[])
  useEffect(()=>getLoginId(),[])

  return (
    <section className="main-page">
      <div onClick={toggleModal} className= {`modal-div ${modalActive}`} ></div>
      <div className={`form-div ${formActive}`}>
        <AddComment decodedToken={decodedToken} getPosts={getPosts} coords={coords} toggleModal={toggleModal}/>
      </div>
      <div className={`map-div ${mapMove}`}>
        <Map  decodedToken={decodedToken} getPosts={getPosts} posts={posts} giveCoords={giveCoords} coords={coords} toggleMain={toggleMain} toggleModal={toggleModal} modalActive={modalActive} mapMove={mapMove}/>
      </div>
    </section>
  )
}

export default MapPage