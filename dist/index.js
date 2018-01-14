import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaySubject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

/**
 * @record
 */

var AuthServiceConfig = /** @class */ (function () {
    function AuthServiceConfig(providers) {
        this.providers = new Map();
        for (var /** @type {?} */ i = 0; i < providers.length; i++) {
            var /** @type {?} */ element = providers[i];
            this.providers.set(element.id, element.provider);
        }
    }
    return AuthServiceConfig;
}());
var AuthService = /** @class */ (function () {
    function AuthService(config) {
        var _this = this;
        this._user = null;
        this._authState = new ReplaySubject(1);
        this.providers = config.providers;
        this.providers.forEach(function (provider, key) {
            provider.initialize().then(function (user) {
                user.provider = key;
                _this._user = user;
                _this._authState.next(user);
            }).catch(function (err) {
                _this._authState.next(null);
            });
        });
    }
    Object.defineProperty(AuthService.prototype, "authState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._authState;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} providerId
     * @param {?=} opt
     * @return {?}
     */
    AuthService.prototype.signIn = /**
     * @param {?} providerId
     * @param {?=} opt
     * @return {?}
     */
    function (providerId, opt) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ providerObject = _this.providers.get(providerId);
            if (providerObject) {
                providerObject.signIn().then(function (user) {
                    user.provider = providerId;
                    resolve(user);
                    _this._user = user;
                    _this._authState.next(user);
                }).catch(function (err) {
                    _this._user = null;
                    _this._authState.next(null);
                    reject(err);
                });
            }
            else {
                _this._user = null;
                _this._authState.next(null);
                reject(AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    };
    /**
     * @return {?}
     */
    AuthService.prototype.signOut = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this._user) {
                reject(AuthService.ERR_NOT_LOGGED_IN);
            }
            else {
                var /** @type {?} */ providerId = _this._user.provider;
                var /** @type {?} */ providerObject = _this.providers.get(providerId);
                if (providerObject) {
                    providerObject.signOut().then(function () {
                        resolve();
                        _this._user = null;
                        _this._authState.next(null);
                    });
                }
                else {
                    reject(AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    };
    AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
    AuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
    AuthService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: AuthServiceConfig, },
    ]; };
    return AuthService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} config
 * @return {?}
 */

var SocialLoginModule = /** @class */ (function () {
    function SocialLoginModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    SocialLoginModule.initialize = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: SocialLoginModule,
            providers: [
                AuthService,
                {
                    provide: AuthServiceConfig,
                    useValue: config
                }
            ]
        };
    };
    SocialLoginModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    providers: [
                        AuthService
                    ]
                },] },
    ];
    /** @nocollapse */
    SocialLoginModule.ctorParameters = function () { return []; };
    return SocialLoginModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SocialUser = /** @class */ (function () {
    function SocialUser() {
    }
    return SocialUser;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
var BaseLoginProvider = /** @class */ (function () {
    function BaseLoginProvider() {
    }
    /**
     * @param {?} id
     * @param {?} src
     * @param {?} onload
     * @return {?}
     */
    BaseLoginProvider.prototype.loadScript = /**
     * @param {?} id
     * @param {?} src
     * @param {?} onload
     * @return {?}
     */
    function (id, src, onload) {
        if (document.getElementById(id)) {
            return;
        }
        var /** @type {?} */ signInJS = document.createElement("script");
        signInJS.async = true;
        signInJS.src = src;
        signInJS.onload = onload;
        document.head.appendChild(signInJS);
    };
    return BaseLoginProvider;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(GoogleLoginProvider.PROVIDER_ID, "//apis.google.com/js/platform.js", function () {
                gapi.load('auth2', function () {
                    _this.auth2 = gapi.auth2.init(_this.opt);
                    _this.auth2.then(function () {
                        if (_this.auth2.isSignedIn.get()) {
                            var /** @type {?} */ user = new SocialUser();
                            var /** @type {?} */ profile = _this.auth2.currentUser.get().getBasicProfile();
                            var /** @type {?} */ token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
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
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.signIn = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ promise = _this.auth2.signIn();
            _this.auth2.signIn().then(function () {
                var /** @type {?} */ user = new SocialUser();
                var /** @type {?} */ profile = _this.auth2.currentUser.get().getBasicProfile();
                var /** @type {?} */ token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
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
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.signOut = /**
     * @return {?}
     */
    function () {
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
}(BaseLoginProvider));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FacebookLoginProvider = /** @class */ (function (_super) {
    __extends$1(FacebookLoginProvider, _super);
    function FacebookLoginProvider(clientId, opt, locale) {
        if (opt === void 0) { opt = { scope: 'email, public_profile' }; }
        if (locale === void 0) { locale = 'en_US'; }
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.opt = opt;
        _this.locale = locale;
        if (clientId)
            opt.client_id = clientId;
        return _this;
    }
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(FacebookLoginProvider.PROVIDER_ID, "//connect.facebook.net/" + _this.locale + "/sdk.js", function () {
                FB.init({
                    appId: _this.clientId,
                    autoLogAppEvents: true,
                    cookie: true,
                    xfbml: true,
                    version: 'v2.9'
                });
                // FB.AppEvents.logPageView(); #FIX for #18
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        var /** @type {?} */ authResponse_1 = response.authResponse;
                        FB.api('/me?fields=name,email,picture,first_name,last_name', function (response) {
                            var /** @type {?} */ user = new SocialUser();
                            user.id = response.id;
                            user.name = response.name;
                            user.email = response.email;
                            user.photoUrl = "https://graph.facebook.com/" + response.id + "/picture?type=normal";
                            user.firstName = response.first_name;
                            user.lastName = response.last_name;
                            user.authToken = authResponse_1.accessToken;
                            resolve(user);
                        });
                    }
                });
            });
        });
    };
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.signIn = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            FB.login(function (response) {
                if (response.authResponse) {
                    var /** @type {?} */ authResponse_2 = response.authResponse;
                    FB.api('/me?fields=name,email,picture,first_name,last_name', function (response) {
                        var /** @type {?} */ user = new SocialUser();
                        user.id = response.id;
                        user.name = response.name;
                        user.email = response.email;
                        user.photoUrl = "https://graph.facebook.com/" + response.id + "/picture?type=normal";
                        user.firstName = response.first_name;
                        user.lastName = response.last_name;
                        user.authToken = authResponse_2.accessToken;
                        resolve(user);
                    });
                }
            }, _this.opt);
        });
    };
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.signOut = /**
     * @return {?}
     */
    function () {
        return new Promise(function (resolve, reject) {
            FB.logout(function (response) {
                resolve();
            });
        });
    };
    FacebookLoginProvider.PROVIDER_ID = "FACEBOOK";
    return FacebookLoginProvider;
}(BaseLoginProvider));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { SocialLoginModule, AuthService, AuthServiceConfig, SocialUser, FacebookLoginProvider, GoogleLoginProvider };
