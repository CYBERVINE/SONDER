import React from 'react'
import Profile from '../../components/Profile/Profile.jsx'
import Map from '../../components/Map/Map.jsx'
import './ProfilePage.scss'


function ProfilePage ({giveCoords, coords, decodedToken, getLoginId}) {
  
  return (
    <section className='profile-page'>
    <div className="profile-page__map">
      <Map giveCoords={giveCoords} coords={coords}/>
    </div>
    <div className='profile-page__profile'>
      <Profile  giveCoords={giveCoords} coords={coords} decodedToken={decodedToken} getLoginId={getLoginId}/>
    </div>
    </section>
  )
}

export default ProfilePage