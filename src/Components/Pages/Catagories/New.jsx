import { useEffect, useState } from "react"
import { apiClint } from "../../../api/Config"
import { API_PATHS } from "../../../api/ApiPath"
import { Box , Typography} from "@mui/material"

export const New = () => {
    const [cat,setCat] = useState([])
        const fetchCatgory = async() => {
            try{
            const {data = []} = await apiClint.get(API_PATHS.CATEGORIES_WITHSUB_API);
            setCat(data)
            console.log(data,"cat");
            
            } catch (error) {
                console.error(error)    
            }
        }
    useEffect(() => {
        fetchCatgory()
    },[])
    return (
        <>
        {console.log(cat)}
        {cat.map((cate) => (
            <Box key={cate.id}>
                <Typography>{cate.name}</Typography>
            </Box>
        ))}
        </>
    )
}