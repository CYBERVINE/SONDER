import Profile from '../../components/Profile/Profile.tsx'
import Map from '../../components/Map/Map.tsx'
import './ProfilePage.scss'
import { Props } from '../../types/CustomsTypes.ts'

function ProfilePage ({giveCoords, coords, decodedToken, getLoginId}: Props): JSX.Element {
  
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