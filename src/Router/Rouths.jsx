import { ROUTH_PATHS } from "./RouthPath"
import Login from "../Components/Pages/Login/Login"
import Register from "../Components/Pages/Login/Register"
import {Landing} from "../Components/Pages/Products/Landing"
import Layout from "../Components/Pages/Products/Layout"
import ProductList from "../Components/Pages/Products/ProductList"
import Categories from "../Components/Pages/Catagories/Catagories"
import SubCategories from "../Components/Pages/Catagories/SubCatagories"

export const routes = [
    {
path :ROUTH_PATHS.LAYOUT_PAGE,
element :<Layout/>,

children:[{
    path :ROUTH_PATHS.LANDING_PAGE,
    element:<Landing/>
},
{
    path :ROUTH_PATHS.CATAGORIES,
    element:<Categories/>
    },
{
    path: ROUTH_PATHS.SUB_CATAGORIES,
  element:<SubCategories />

},
{
    path: ROUTH_PATHS.PRODUCT_LIST,
    element:<ProductList/>
 }]
    },

{
    path:ROUTH_PATHS.LOGIN_PAGE,
    element :<Login/>
},
{
    path:ROUTH_PATHS.REGISTER_PAGE,
    element :<Register/>
},


{
    path:ROUTH_PATHS.NO_MATCH,
    element: <h1>404: page not found</h1>
},

]