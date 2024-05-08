import Endpoints from "@/app/core/api/endpoints";
import { User } from "../../model/user";
import { NetworkRequest } from "@/app/core/network_request/network_request";
import { NetworkRetry } from "@/app/core/network_retry/network_retry";
import { json } from "fp-ts";
import { LoginParams, RegisterParams } from "../../model/params";


interface AuthRemoteDataSource {

    login(params: LoginParams): Promise<User>

    signup(params: RegisterParams): Promise<User>
}


class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
    readonly networkRequest : NetworkRequest;
    readonly networkRetry : NetworkRetry;

    constructor(netRequest: NetworkRequest, netRetry: NetworkRetry) {
        this.networkRequest = netRequest;
        this.networkRetry = netRetry;
    }


    async signup(data: RegisterParams): Promise<User> {

        const url = Endpoints.signup;

        const response = await this.networkRetry.networkRetry(
            () => this.networkRequest.post({
                url, data, headers : undefined
            })
        )

        const resData = await json.parse(response.data);

        if(response.status == 200){
            try {
                
            }catch(e){
                throw e
            }
        }else{
            
        }

        throw new Error("Method not implemented.");
    }

    async login(data: LoginParams): Promise<User> {

        const url = Endpoints.login;

        const response = await this.networkRetry.networkRetry(
            () => this.networkRequest.post({
                url,
                data,
                headers: undefined
            })
        )

        const resData = await json.parse(response.data);

        if(response.status == 200){
            
        }else{

        }

        throw new Error("Method not implemented.");
    }

}


export default
    AuthRemoteDataSource
