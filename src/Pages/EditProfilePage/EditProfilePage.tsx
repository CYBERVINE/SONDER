import EditProfile from "../../components/EditProfile/EditProfile.tsx";

function EditProfilePage ({decodedToken, getLoginId}) {
  return <EditProfile decodedToken={decodedToken} getLoginId={getLoginId}/>
}

export default EditProfilePage