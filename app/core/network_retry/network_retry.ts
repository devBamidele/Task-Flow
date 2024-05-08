

export interface NetworkRetry {
    networkRetry<T>(func: () => Promise<T>): Promise<T>;
}


/*

interface NetworkRetry {
    networkRetry<T>(func: () => Promise<T>): Promise<T>;
}

// Example implementation:
class MyNetworkRetry implements NetworkRetry {
    async networkRetry<T>(func: () => Promise<T>): Promise<T> {
        // Implement retry logic here
        return await func();
    }
}


*/