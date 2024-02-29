import Login from "../../components/Login/Login.tsx"
import { LoginProp as Prop } from "../../types/CustomsTypes.ts"

function LoginPage ({getLoginId}: Prop): JSX.Element {
  return <Login getLoginId={getLoginId}/>
}

export default LoginPage