import { Route, Routes } from "react-router-dom"
import { RouthPage } from "../../../Router/RouthElement"



export const Root = () => {
  return (
    <Routes>
      {RouthPage.map(({path,element},index)=>(
      <Route key={path+index} path={path} element={element}/>
      
      )
      )}
      </Routes>
  )
}
