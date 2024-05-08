import NetworkInfo from "../network_info/network_info";
import { left, right, Either } from "fp-ts/lib/Either";
import pTimeout, { TimeoutError } from "p-timeout";


export class ServiceRunner<Failure, T> {
    networkInfo: NetworkInfo;

    constructor(info: NetworkInfo) {
        this.networkInfo = info;
    }


    async tryRemoteAndCache(
        call: Promise<T>,
        errorTitle: string,
        stopTimeOut = false,
        navigateOut = false
    ): Promise<Either<Failure, T>> {

        if (await this.networkInfo.isConnected) {
            try {
                // If connected, try to make the remote call
                const result = stopTimeOut ? await call : await pTimeout(call, {
                    milliseconds: 60000,
                    fallback: () => {
                        throw new TimeoutError('Timeout occurred');
                    }
                });

                return right(result);

             
            } catch (error) {
                if (error instanceof TimeoutError) {
                    // Handle timeout error
                    return left(new InternetFailure(error.name, error.message) as Failure);
                } else {
                    return left(new InternetFailure('Error with try remote and cache', 'Something just went wrong') as Failure)
                }

            }
        } else {
            return left(new InternetFailure(errorTitle, 'No internet access') as Failure)
        }

    }
}