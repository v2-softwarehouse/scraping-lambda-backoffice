"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardException = exports.HttpException = exports.InternetConnectionException = exports.AuthenticationException = void 0;
class AuthenticationException extends Error {
}
exports.AuthenticationException = AuthenticationException;
class InternetConnectionException extends Error {
}
exports.InternetConnectionException = InternetConnectionException;
class HttpException extends Error {
    constructor(code, message = "") {
        super(message);
        this.code = code;
    }
}
exports.HttpException = HttpException;
class GuardException extends Error {
    constructor(message = "") {
        super(message);
    }
}
exports.GuardException = GuardException;
//# sourceMappingURL=Exceptions.js.map