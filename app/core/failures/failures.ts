// Define the abstract Failure class
abstract class Failure {
    readonly title: string;
    readonly message: string;
  
    constructor(title: string, message: string) {
      this.title = title;
      this.message = message;
    }
  
    get props(): any[] {
      return [this.title, this.message];
    }
  }
  
  // Define NoFailure class inheriting from Failure
  class NoFailure extends Failure {
    constructor(title: string = '', message: string = '') {
      super(title, message);
    }
  }
  
  // Define ServerFailure class inheriting from Failure
  class ServerFailure extends Failure {
    constructor(title: string, message: string) {
      super(title, message);
    }
  }
  
  // Define CacheFailure class inheriting from Failure
  class CacheFailure extends Failure {
    constructor(public readonly title: string, public readonly message: string) {
      super(title, message);
    }
  }
  
  // Define CommonFailure class inheriting from Failure
  class CommonFailure extends Failure {
    constructor(public readonly title: string, public readonly message: string) {
      super(title, message);
    }
  }
  
  // Define InternetFailure class inheriting from Failure
  class InternetFailure extends Failure {
    constructor(public readonly title: string, public readonly message: string) {
      super(title, message);
    }
  }
  
  // Define AuthenticationFailure class inheriting from Failure
  class AuthenticationFailure extends Failure {
    constructor(public readonly title: string, public readonly message: string) {
      super(title, message);
    }
  }
  