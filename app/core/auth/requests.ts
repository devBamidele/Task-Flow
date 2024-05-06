import axios, { AxiosError, AxiosResponse } from "axios";
import endpoints from "../api/endpoints";

interface LoginSuccessResponse {
    message: string;
    // Add other properties if they exist in the success response
}

interface LoginErrorResponse {
    error: string;
    // Add other properties if they exist in the error response
}

type LoginResponse = LoginSuccessResponse | LoginErrorResponse;


async function loginUser(email: string, password: string) {
    const body = { email, password }

    try {
        const response: AxiosResponse<LoginResponse> = await axios.post<LoginResponse>('https://todo-app-gcp.uc.r.appspot.com/auth/login', body);

        if (response.status >= 200 && response.status < 300) {
            // Successful response
            const data = response.data as LoginSuccessResponse;
            // Handle success data
            return data.message;
        }else {
            // Error response
            const data = response.data as LoginErrorResponse;

            console.log(data.error)
        
        }

    } catch (error) {

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError; // Cast error to AxiosError

            const data = axiosError.response?.data;

            const errorMessage = (data as { error?: string })?.error; 

            console.log(errorMessage)

            throw new Error(errorMessage)
        }



    }
}


export default { loginUser } as const;