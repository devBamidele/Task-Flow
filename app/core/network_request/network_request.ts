import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import pTimeout, { TimeoutError } from "p-timeout";

interface NetworkParams {
    url: string;
    data: object | undefined | null;
    headers: Record<string, string> | undefined;
}


export interface NetworkRequest {

    get(params: NetworkParams): Promise<AxiosResponse>

    post(params: NetworkParams): Promise<AxiosResponse>

}



class NetworkRequestImpl implements NetworkRequest {
    private static instance: NetworkRequestImpl | null = null;

    // Prevent instantiation outside the class
    private constructor() { }

    static getInstance(): NetworkRequestImpl {
        if (!NetworkRequestImpl.instance) {
            NetworkRequestImpl.instance = new NetworkRequestImpl();
        }
        return NetworkRequestImpl.instance;
    }

    get(params: NetworkParams): Promise<AxiosResponse<any, any>> {

        const request: AxiosRequestConfig = { method: 'GET', ...params }

        return pTimeout(axios(request), {
            milliseconds: 60000,
            fallback: () => {
                throw new TimeoutError('Timeout occurred');
            }
        });
    }


    post(params: NetworkParams): Promise<AxiosResponse<any, any>> {

        const request: AxiosRequestConfig = { method: 'POST', ...params }

        return pTimeout(axios(request), {
            milliseconds: 60000,
            fallback: () => {
                throw new TimeoutError('Timeout occurred');
            }
        });
    }


}