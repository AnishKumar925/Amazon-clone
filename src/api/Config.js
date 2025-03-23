import axios from "axios";
export const apiClint = axios.create({
    baseURL:"http://api-ecommerce-app.bluetickcoders.com/"
})