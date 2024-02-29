import './Profile.scss'
import React, { useRef, useState, useEffect } from "react";
import  { Link }from 'react-router-dom'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios"



function Profile ({giveCoords, coords, decodedToken, getLoginId}) {  
    const URL = import.meta.env.VITE_BASE_URL
    const mapRef = useRef(null);
    const params = useParams()
    const [user, setUser] = useState({})
    const [promos, setPromos] = useState([])
    const [posts, setPosts] = useState([])
    const [menu, setMenu] = useState(false)
    const [publicView, setPublicView] = useState(true)
    const [profileFade, setprofileFade] = useState("")
    const navigate = useNavigate()

    const customIcon = new L.Icon({
        iconUrl: `${URL}/animations/sonderance.gif`,
        iconSize: [40, 40], 
        iconAnchor: [16, 32], 
        popupAnchor: [0, -32], 
        className: "map__marker"
      });
  
    function backToReality () {
        setprofileFade("profile--fade")
        setTimeout(() => {
            navigate("/map")
          }, 300);
    }

    async function getProfile(params){
        try{
            const user = await axios.get(`${URL}/users/${params.id}`)
            const promos = await axios.get(`${URL}/promos/${params.id}`)
            const posts = await axios.get(`${URL}/posts/${params.id}`)
            setUser(user.data)
            setPromos(promos.data)
            setPosts(posts.data)
        }catch(err){
            console.error(err)
        }
    }

    async function deletePromo(promoId: number){
        const response = await axios.delete(`${URL}/promos/${promoId}`)
        getProfile(params.id)
    }

    useEffect(()=>{ getProfile(params)},[user.username])
    useEffect(()=>{ getLoginId()},[])
    useEffect(()=>{ giveCoords()},[])
    console.log(promos)
    return(
        <main onClick={()=>{if(menu)setMenu(false)}}className={`profile ${profileFade}`}>
                {((decodedToken?.id !== undefined) && (decodedToken.id === user.id)) && 
                <>
                <img onClick={()=>{menu === false ? setMenu(true) : setMenu(false)}} 
                    className="profile__menu"  
                    src={`${URL}/animations/menu.png`}
                    alt="menu" />
                <div 
                    className={`profile__dropdown ${menu === false ? "" : "profile__dropdown--active"}`}>
                    <Link to={"/edit"} 
                    className='profile__dropdown--option'>
                        Edit Profile
                    </Link>
                    <p onClick={()=>{publicView === false ? setPublicView(true) : setPublicView(false)}} 
                    className='profile__dropdown--option'> 
                    {publicView ? "View Note Pad" : "View Promos"}
                    </p>
                </div>
                </>
                }
                <div className='profile__banner'>
                    {user.avatar ? <img className='profile__avatar'  
                        src={user.avatar} alt="avatar" /> : 
                        <img className='profile__avatar' src={`${URL}/animations/anonymous.png`} alt="avatar" /> }
                    <div className='profile__info'>
                    {user.username ? 
                    <>
                        <h2 className='profile__heading'>{user.username}</h2>
                        <p className='profile__heading profile__description'>{`${user.description}`}</p>
                    </>
                        :
                    <>
                        <h2 className='profile__heading'>Anonymous</h2>
                        <p className='profile__heading profile__description'>Sonder from the unknown.</p>
                    </>
                    }
                    </div>
                    
                </div> 
                <div className='profile__map'>
                    {coords.lat && <MapContainer className="profile_leaf" 
                    center={[coords.lat, coords.lng]} 
                    zoom={13} zoomControl={false} 
                    attributionControl={false} 
                    ref={mapRef} 
                    style={{height: "30vh", width: "100%"}}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                            maxZoom= {20}
                            subdomains={['mt1','mt2','mt3']}
                            />
                            { posts && posts.map((comment) => {
                                return (
                                    <Marker 
                                    key={comment.id} 
                                    position={[comment.lat, comment.lng]} 
                                    icon={customIcon}>
                                    </Marker>
                            )})}
                    </MapContainer>}
                </div>
                    <div 
                    className='profile__return-container'>
                    <div className='profile__return' 
                    onClick={backToReality}>
                        Back To Reality
                    </div>
                </div>

                    {publicView ? 
                    promos.length > 0 ?
                        <h2 className='profile__feed-heading profile__feed-heading--promos'>
                        <img className='profile__feed-heading--arrow' src={`${URL}/animations/down-arrow.svg`} alt="" />
                            {`Check out ${user.username}'s interests and creations!`}
                        </h2> : <h2 className='profile__feed-heading profile__feed-heading--promos profile__feed-heading--underline'>{` ${user.username} has nothing to promot, yet`}</h2>

                        : 
                        <h2  className='profile__feed-heading'>Your Past Thoughts</h2>}
                <ul className='profile__feed'>
                    {((publicView && promos.length === 0) && user.name) && 
                    <li className='profile__entry profile__entry--empty'>
                        Nothing to promote yet!
                        </li> }
                    {(!publicView && posts.length === 0) && 
                    <li className='profile__entry profile__entry--empty'>
                        You've haven't mapped your inner monologue yet, so get out there and get inspiring!
                        </li> }
                    {publicView ? promos.map(promo=>{
                        return (
                            <li  key={promo.id} className='profile__entry' >
                            <a className="profile__entry--link" href={promo.link ? promo.link : "https://sonderon.netlify.app/map"} target='_blank'>
                            {promo.promo}
                            </a>
                        {(decodedToken?.id === user.id) && <img 
                        onClick={()=>deletePromo(promo._id)} 
                        className="profile__delete" 
                        src={`${URL}/animations/delete.svg`}
                        alt="delete" />}
                        </li>
                            )
                        }) : posts.map(post=> {
                        return <li key={post.id} className='profile__entry' >
                                {post.comment}
                                </li>
                    })}
                </ul>

            </main>
    )
}

export default Profile