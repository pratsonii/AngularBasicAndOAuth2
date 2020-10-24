"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginService = void 0;
var token_actions_1 = require("./../../store/token/token.actions");
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var LoginService = /** @class */ (function () {
    function LoginService(http, message, store, router) {
        this.http = http;
        this.message = message;
        this.store = store;
        this.router = router;
        this.tokenURL = 'http://localhost:8080/app/token';
    }
    LoginService.prototype.doLogin = function (userName, password) {
        var _this = this;
        var encoded = window.btoa(userName + ':' + password);
        var headers = new http_1.HttpHeaders().set('Authorization', 'Basic ' + encoded);
        this.http.get(this.tokenURL, { headers: headers })
            .pipe(operators_1.catchError(function (error) { return _this.handleError(error); }))
            .subscribe(function (data) {
            _this.store.dispatch(new token_actions_1.AddToken(data.token)).subscribe();
            _this.router.navigate(['home']);
        });
    };
    LoginService.prototype.handleError = function (error) {
        if (error.status == 401) {
            this.message.error('Username/Password Incorrect!', {
                nzDuration: 3000
            });
        }
        return rxjs_1.throwError(error);
    };
    LoginService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
