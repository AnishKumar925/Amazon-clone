import { RouthPath } from "./RouthPath"
import { Landing } from "../Components/Pages/Products/Landing"
import Login from "../Components/Pages/Login/Login"
import Register from "../Components/Pages/Login/Register"

export const RouthPage =[
{
     path:RouthPath.Landing,
     element :<Landing/>
},
{
    path:RouthPath.Login,
    element :<Login/>
},
{
    path:RouthPath.Register,
    element :<Register/>
},


]