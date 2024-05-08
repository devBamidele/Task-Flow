

export default abstract class NetworkInfo {

    abstract get isConnected(): Promise<boolean>

}


class NetworkInfoImpl implements NetworkInfo {
    get isConnected(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}