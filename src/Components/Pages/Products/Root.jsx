import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from "../../../Router/Rouths";



export const Root = () => {
  return (
     <BrowserRouter>
    <Routes>
      {routes.map(({path,element,children},index)=>(
      <Route key={path+index} path={path} element={element}>
        {children?.map(({path,element},childindex)=>(
          <Route key={path+childindex} path={path} element={element}></Route>
        )
        )}
      </Route>
      )
      )}
      </Routes>
      </BrowserRouter>
);
};