import { useRef, useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { useParams } from "react-router";
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import './Map.scss'
const URL: string = import.meta.env.VITE_BASE_URL

interface Props {
  getPosts: ()=>void;
  posts: [],
  giveCoords: ()=>void;
  
}

function Map ({getPosts, posts, giveCoords, coords, toggleMain, toggleModal, modalActive, decodedToken}: Props): JSX.Element {
  const params = useParams()
  const mapRef = useRef(null);
  const [range, setRange] = useState(0.001)
  const [hide, setHide] = useState(false)

    if(!params.id) { useEffect(()=>{getPosts()},[posts.length]),
                     useEffect(()=>{giveCoords()},[])
        }

    const sonderance = new L.Icon({
      iconUrl: `${URL}/animations/sonderance.gif`,
      iconSize: [40, 40], 
      iconAnchor: [16, 32], 
      popupAnchor: [0, -32], 
      className: "map__marker"
    });

    const location = new L.Icon({
      iconUrl: "null",
      iconSize: [4, 4], 
      className: "map__location"
    });

    function hidePrecision () {
      hide ? setHide(false) : setHide(true)
    }

    async function likeComment(id:string) {
      try{
        await axios.patch(`${URL}/posts/${id}`, {
          post_id: id,
          user_id: decodedToken.id
        })
        getPosts()
      } catch (err) {
        console.error(err)
      }
    }  
    return ( 
      <>
    { coords.lat &&
      <main className="map" onClick={giveCoords}>
        <MapContainer className="leaf" center={[coords.lat, coords.lng]} zoom={15} zoomControl={false} ref={mapRef} 
        attributionControl={false}  style={{height: "100vh", width: "100vw"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            maxZoom= {20}
            subdomains={['mt1','mt2','mt3']}
            />
            <Marker position={[coords.lat, coords.lng]} icon={location}></Marker>
            <MarkerClusterGroup
             maxClusterRadius={15} 
             >
            {posts && posts.map((comment) => {
              return (
                <Marker key={comment.id} position={[comment.lat, comment.lng]} icon={sonderance} className="map__marker">
                    <Popup>
                        <section className="map__popup">
                          {(Math.abs(comment.lat - coords.lat) < range) && (Math.abs(comment.lng - coords.lng) < range) ? 
                          <>
                          <p className="map__comment">{comment.comment}</p> 
                        {decodedToken.id ? <button className="map__popup-button map__popup-button--boost" onClick={()=>likeComment(comment.id)}>
                          BOOST SIGNAL : {comment.likes}
                          < img className="map__popup-button--icon" src={`${URL}/animations/boost.png`} alt="" />
                          </button> : 
                          <Link className="map__popup-button" to={'/signup'}>
                          Register account to boost.
                          < img className="map__popup-button--icon" src={`${URL}/animations/boost.png`} alt="" />
                          </Link>
                          }
                          <button className="map__popup-button map__popup-button--link" onClick={()=>toggleMain(comment.user_id)}>
                            FOLLOW THAT THOUGHT!
                          < img className="map__popup-button--icon" src={`${URL}/animations/thought.png`} alt="" />
                            </button>
                          </>
                          :
                          <>
                          <p
                          className="map__comment map__comment--hidden">
                            You're not close enough, yet. This monologue is boosted 
                            < img className="map__hidden-icon" src={`${URL}/animations/boost.png`} alt="" />
                            {comment.likes} times.
                          </p>
                          </> 
                          }
                      </section>
                    </Popup>
                </Marker>
              )
            })}
            </MarkerClusterGroup>
        </MapContainer>

          <footer className={params.id ? "map__nav--profile" : "map__nav"}>
            <section className={modalActive === "" ? "map__precision" : "map__nav--modal"}> 
                <button className={hide ? "map__precision-button" : "map__precision-button--hidden"} onClick={()=>giveCoords()}>Re-Center</button>
                <p  className="map__precision-title" onClick={hidePrecision} >GPS Precison</p>
              <>
                <button className={hide ? "map__precision-button" : "map__precision-button--hidden"} onClick={()=>setRange(0.001)}>High</button>
                <button className={hide ? "map__precision-button" : "map__precision-button--hidden"} onClick={()=>setRange(0.01)}>Medium</button>
                <button className={hide ? "map__precision-button" : "map__precision-button--hidden"} onClick={()=>setRange(0.1)}>Low</button>
                <p className={hide ? "" : "map__precision-button--hidden"}>{range}</p>
              </>
            </section>
              {(sessionStorage.getItem("authToken") && !params.id) ?
                  <p onClick={()=>toggleMain(decodedToken?.id)} className="map__nav-button ">
                  Profile
                  </p> :
                  <Link to={"/signup"} className="map__nav-button">Sign Up</Link>
                }
            <p 
            onClick={toggleModal} 
            className={modalActive === "" ? "map__nav-button" : "map__nav--modal"}>
                Post
            </p>
            </footer>
        </main>
        }
      </>
    );
  };
  
  export default Map;