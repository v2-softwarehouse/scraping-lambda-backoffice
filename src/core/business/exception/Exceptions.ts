
export class AuthenticationException extends Error {}

export class InternetConnectionException extends Error {}

export class HttpException extends Error {
    constructor(public code: number | null, message: string = "") {
        super(message);
    }
}

export class GuardException extends Error {
    constructor(message: string = "") {
        super(message);
    }
}