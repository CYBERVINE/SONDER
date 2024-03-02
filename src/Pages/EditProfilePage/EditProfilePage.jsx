import React from 'react'
import EditProfile from "../../components/EditProfile/EditProfile.jsx";

function EditProfilePage ({decodedToken, getLoginId}) {
  return (
    <main>
    <EditProfile decodedToken={decodedToken} getLoginId={getLoginId}/>
    </main>
  )
}

export default EditProfilePage