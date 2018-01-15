var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, AuthServiceConfig } from "./auth.service";
export function configFactory(config) {
    return config;
}
let SocialLoginModule = SocialLoginModule_1 = class SocialLoginModule {
    static initialize(config) {
        return {
            ngModule: SocialLoginModule_1,
            providers: [
                AuthService,
                {
                    provide: AuthServiceConfig,
                    useValue: config
                }
            ]
        };
    }
};
SocialLoginModule = SocialLoginModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        providers: [
            AuthService
        ]
    })
], SocialLoginModule);
export { SocialLoginModule };
var SocialLoginModule_1;
//# sourceMappingURL=sociallogin.module.js.map