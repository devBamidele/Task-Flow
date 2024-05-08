import { Either } from "fp-ts/lib/Either";
import { Task } from "fp-ts/lib/Task";

import { User } from "../../model/user";

import AuthRemoteDataSource from "../source/remote_source";
import { LoginParams, RegisterParams } from "../../model/params";
import NetworkInfo from "@/app/core/network_info/network_info";
import { ServiceRunner } from "@/app/core/runner/service";


abstract class AuthRepository {
    abstract login(params: LoginParams): Promise<Either<Failure, User>>;

    abstract register(params: RegisterParams): Promise<Either<Failure, User>>;
}

class AuthRepositoryImpl implements AuthRepository {
    private readonly networkInfo! : NetworkInfo;
    private readonly authRemoteDataSource! : AuthRemoteDataSource;

    constructor() {
       
    }

    register(params: RegisterParams): Promise<Either<Failure, User>> {
        const sR: ServiceRunner<Failure, User> = new ServiceRunner(this.networkInfo);

        return sR.tryRemoteAndCache(
            this.authRemoteDataSource.signup(params).then((user) => {return user}),
            ErrorStrings.LOG_IN_ERROR
        )

    }


    login(params: LoginParams): Promise<Either<Failure, User>> {
        const sR: ServiceRunner<Failure, User> = new ServiceRunner(this.networkInfo);

        return sR.tryRemoteAndCache(
            this.authRemoteDataSource.login(params),
            ErrorStrings.LOG_IN_ERROR 
        )
    }





}





// /*

// import { TaskEither, right, left } from 'fp-ts/lib/TaskEither';
// import { Task } from 'fp-ts/lib/Task';

// type Failure = string; // Define your Failure type
// type User = { /* Define your User type */ };

// // Define a function that returns a TaskEither with Failure or User
// function getUser(): TaskEither<Failure, User> {
//     // Simulated asynchronous operation
//     const asyncOperation: Task<Either<Failure, User>> = () => {
//         // Simulated success
//         return Promise.resolve(right<User>({ /* User data */ }));
//         // Simulated failure
//         // return Promise.resolve(left<Failure>("Failed to get user"));
//     };

//     return new TaskEither(asyncOperation);
// }

// // Example usage
// getUser().run().then(result => {
//     // Pattern match the result
//     result.fold(
//         error => {
//             // Handle failure
//             console.error('Error:', error);
//         },
//         user => {
//             // Handle success
//             console.log('User:', user);
//         }
//     );
// });


// */