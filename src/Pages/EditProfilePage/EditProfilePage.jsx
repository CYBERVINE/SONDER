import EditProfile from "../../components/EditProfile/EditProfile";

function EditProfilePage ({decodedToken, getLoginId}) {
  return <EditProfile decodedToken={decodedToken} getLoginId={getLoginId}/>
}

export default EditProfilePage