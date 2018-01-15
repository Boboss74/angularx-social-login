var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
export class AuthServiceConfig {
    constructor(providers) {
        this.providers = new Map();
        for (let i = 0; i < providers.length; i++) {
            let element = providers[i];
            this.providers.set(element.id, element.provider);
        }
    }
}
let AuthService = AuthService_1 = class AuthService {
    constructor(config) {
        this._user = null;
        this._authState = new ReplaySubject(1);
        this.providers = config.providers;
        this.providers.forEach((provider, key) => {
            provider.initialize().then((user) => {
                user.provider = key;
                this._user = user;
                this._authState.next(user);
            }).catch((err) => {
                this._authState.next(null);
            });
        });
    }
    get authState() {
        return this._authState;
    }
    signIn(providerId, opt) {
        return new Promise((resolve, reject) => {
            let providerObject = this.providers.get(providerId);
            if (providerObject) {
                providerObject.signIn().then((user) => {
                    user.provider = providerId;
                    resolve(user);
                    this._user = user;
                    this._authState.next(user);
                }).catch(err => {
                    this._user = null;
                    this._authState.next(null);
                    reject(err);
                });
            }
            else {
                this._user = null;
                this._authState.next(null);
                reject(AuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    }
    signOut() {
        return new Promise((resolve, reject) => {
            if (!this._user) {
                reject(AuthService_1.ERR_NOT_LOGGED_IN);
            }
            else {
                let providerId = this._user.provider;
                let providerObject = this.providers.get(providerId);
                if (providerObject) {
                    providerObject.signOut().then(() => {
                        resolve();
                        this._user = null;
                        this._authState.next(null);
                    });
                }
                else {
                    reject(AuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    }
};
AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
AuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
AuthService = AuthService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthServiceConfig])
], AuthService);
export { AuthService };
var AuthService_1;
//# sourceMappingURL=auth.service.js.map