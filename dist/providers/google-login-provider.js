"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_login_provider_1 = require("../entities/base-login-provider");
var user_1 = require("../entities/user");
var GoogleLoginProvider = /** @class */ (function (_super) {
    __extends(GoogleLoginProvider, _super);
    function GoogleLoginProvider(clientId, opt) {
        if (opt === void 0) { opt = { scope: 'email' }; }
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.opt = opt;
        if (clientId)
            opt.client_id = clientId;
        return _this;
    }
    GoogleLoginProvider.prototype.initialize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(GoogleLoginProvider.PROVIDER_ID, "//apis.google.com/js/platform.js", function () {
                gapi.load('auth2', function () {
                    _this.auth2 = gapi.auth2.init(_this.opt);
                    _this.auth2.then(function () {
                        if (_this.auth2.isSignedIn.get()) {
                            var user = new user_1.SocialUser();
                            var profile = _this.auth2.currentUser.get().getBasicProfile();
                            var token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
                            user.id = profile.getId();
                            user.name = profile.getName();
                            user.email = profile.getEmail();
                            user.photoUrl = profile.getImageUrl();
                            user.firstName = profile.getGivenName();
                            user.lastName = profile.getFamilyName();
                            user.authToken = token;
                            resolve(user);
                        }
                        else {
                            reject();
                        }
                    });
                });
            });
        });
    };
    GoogleLoginProvider.prototype.signIn = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promise = _this.auth2.signIn();
            _this.auth2.signIn().then(function () {
                var user = new user_1.SocialUser();
                var profile = _this.auth2.currentUser.get().getBasicProfile();
                var token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
                user.id = profile.getId();
                user.name = profile.getName();
                user.email = profile.getEmail();
                user.photoUrl = profile.getImageUrl();
                user.firstName = profile.getGivenName();
                user.lastName = profile.getFamilyName();
                user.authToken = token;
                resolve(user);
            }).catch(function (err) { return reject(err); });
        });
    };
    GoogleLoginProvider.prototype.signOut = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth2.signOut().then(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    GoogleLoginProvider.PROVIDER_ID = "GOOGLE";
    return GoogleLoginProvider;
}(base_login_provider_1.BaseLoginProvider));
exports.GoogleLoginProvider = GoogleLoginProvider;
//# sourceMappingURL=google-login-provider.js.map