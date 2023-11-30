import axios from "axios";

import { responseInterceptors } from "./interceptors/ResponseInterceptors";
import { errorInterceptors } from "./interceptors/ErrorInterceptors";
import { Environment } from "../../../environment";



const Api = axios.create({
    baseURL: Environment.URL_BASE
})

Api.interceptors.response.use(
    (response) => responseInterceptors(response),
    (errors) => errorInterceptors(errors)
)

export { Api }