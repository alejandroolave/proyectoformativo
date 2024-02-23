import axios from "axios";

export default axios.create({
    baseURL: "machines",
    withCredentials:true
})