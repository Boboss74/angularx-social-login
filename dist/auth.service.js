"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
class AuthServiceConfig {
    constructor(providers) {
        this.providers = new Map();
        for (let i = 0; i < providers.length; i++) {
            let element = providers[i];
            this.providers.set(element.id, element.provider);
        }
    }
}
exports.AuthServiceConfig = AuthServiceConfig;
let AuthService = AuthService_1 = class AuthService {
    constructor(config) {
        this._user = null;
        this._authState = new rxjs_1.ReplaySubject(1);
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
    core_1.Injectable(),
    __metadata("design:paramtypes", [AuthServiceConfig])
], AuthService);
exports.AuthService = AuthService;
var AuthService_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2JvcmlzL2Rldi9pY2Vyb2xsL2FuZ3VsYXJ4LXNvY2lhbC1sb2dpbi9zcmMvIiwic291cmNlcyI6WyJhdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFFM0MsK0JBQTBEO0FBK0IxRDtJQUdFLFlBQVksU0FBa0M7UUFGOUMsY0FBUyxHQUErQixJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUd2RSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMxQyxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsQ0FBQztJQUNILENBQUM7Q0FDRjtBQVRELDhDQVNDO0FBR0QsSUFBYSxXQUFXLG1CQUF4QjtJQWNFLFlBQVksTUFBeUI7UUFQN0IsVUFBSyxHQUFlLElBQUksQ0FBQztRQUN6QixlQUFVLEdBQXdCLElBQUksb0JBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQU83RCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFFbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUF1QixFQUFFLEdBQVcsRUFBRSxFQUFFO1lBQzlELFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFnQixFQUFFLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO2dCQUVwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFqQkQsSUFBSSxTQUFTO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQWlCRCxNQUFNLENBQUMsVUFBa0IsRUFBRSxHQUFjO1FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwRCxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBZ0IsRUFBRSxFQUFFO29CQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztvQkFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVkLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLGFBQVcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ25ELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0wsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxhQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7Z0JBQ3JDLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRCxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUNuQixjQUFjLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDakMsT0FBTyxFQUFFLENBQUM7d0JBRVYsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxhQUFXLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FFRixDQUFBO0FBdkV5Qix3Q0FBNEIsR0FBRywwQkFBMEIsQ0FBQztBQUMxRCw2QkFBaUIsR0FBRyxlQUFlLENBQUM7QUFIakQsV0FBVztJQUR2QixpQkFBVSxFQUFFO3FDQWVTLGlCQUFpQjtHQWQxQixXQUFXLENBeUV2QjtBQXpFWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBMb2dpblByb3ZpZGVyIH0gZnJvbSAnLi9lbnRpdGllcy9sb2dpbi1wcm92aWRlcic7XG5pbXBvcnQgeyBTb2NpYWxVc2VyIH0gZnJvbSAnLi9lbnRpdGllcy91c2VyJztcblxuZXhwb3J0IGludGVyZmFjZSBBdXRoU2VydmljZUNvbmZpZ0l0ZW0ge1xuICBpZDogc3RyaW5nO1xuICBwcm92aWRlcjogTG9naW5Qcm92aWRlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2dpbk9wdCB7XG4gIC8qKlxuICAgKiBGYWNlYm9vayBGQi5sb2dpbiBvcHRpb25zOiBodHRwczovL2RldmVsb3BlcnMuZmFjZWJvb2suY29tL2RvY3MvcmVmZXJlbmNlL2phdmFzY3JpcHQvRkIubG9naW4vdjIuMTEuXG4gICAqL1xuICBhdXRoX3R5cGU/OiBzdHJpbmc7IC8vIE9wdGlvbmFsIGtleSwgb25seSBzdXBwb3J0cyBvbmUgdmFsdWU6IHJlcmVxdWVzdC4gVXNlIHRoaXMgd2hlbiByZS1yZXF1ZXN0aW5nIGEgZGVjbGluZWQgcGVybWlzc2lvbi5cbiAgc2NvcGU/OiBzdHJpbmc7IC8vIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGV4dGVuZGVkIHBlcm1pc3Npb25zXG4gIHJldHVybl9zY29wZXM/OiBib29sZWFuOyAvLyBXaGVuIHRydWUsIHRoZSBncmFudGVkIHNjb3BlcyB3aWxsIGJlIHJldHVybmVkIGluIGEgY29tbWEtc2VwYXJhdGVkIGxpc3QuXG4gIGVuYWJsZV9wcm9maWxlX3NlbGVjdG9yPzogYm9vbGVhbjsgLy8gV2hlbiB0cnVlLCBwcm9tcHQgdGhlIHVzZXIgdG8gZ3JhbnQgcGVybWlzc2lvbiBmb3Igb25lIG9yIG1vcmUgUGFnZXMuXG4gIHByb2ZpbGVfc2VsZWN0b3JfaWRzPzogc3RyaW5nOyAvLyBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBJRHMgdG8gZGlzcGxheSBpbiB0aGUgcHJvZmlsZSBzZWxlY3RvclxuICAvKipcbiAgICogR29vZ2xlIGdhcGkuYXV0aDIuQ2xpZW50Q29uZmlnOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hcGktY2xpZW50LWxpYnJhcnkvamF2YXNjcmlwdC9yZWZlcmVuY2UvcmVmZXJlbmNlZG9jcyNnYXBpYXV0aDJjbGllbnRjb25maWcuXG4gICAqL1xuICBjbGllbnRfaWQ/OiBzdHJpbmc7IC8vIFJlcXVpcmVkLiBUaGUgYXBwJ3MgY2xpZW50IElELCBmb3VuZCBhbmQgY3JlYXRlZCBpbiB0aGUgR29vZ2xlIERldmVsb3BlcnMgQ29uc29sZS5cbiAgY29va2llX3BvbGljeT86IHN0cmluZzsgLy8gVGhlIGRvbWFpbnMgZm9yIHdoaWNoIHRvIGNyZWF0ZSBzaWduLWluIGNvb2tpZXMuIEVpdGhlciBhIFVSSSwgc2luZ2xlX2hvc3Rfb3JpZ2luLCBvciBub25lLiBEZWZhdWx0cyB0byBzaW5nbGVfaG9zdF9vcmlnaW4gaWYgdW5zcGVjaWZpZWQuXG4gIGZldGNoX2Jhc2ljX3Byb2ZpbGU/OiBib29sZWFuOyAvLyBGZXRjaCB1c2VycycgYmFzaWMgcHJvZmlsZSBpbmZvcm1hdGlvbiB3aGVuIHRoZXkgc2lnbiBpbi4gQWRkcyAncHJvZmlsZScsICdlbWFpbCcgYW5kICdvcGVuaWQnIHRvIHRoZSByZXF1ZXN0ZWQgc2NvcGVzLiBUcnVlIGlmIHVuc3BlY2lmaWVkLlxuICBob3N0ZWRfZG9tYWluPzogc3RyaW5nOyAvLyBUaGUgRyBTdWl0ZSBkb21haW4gdG8gd2hpY2ggdXNlcnMgbXVzdCBiZWxvbmcgdG8gc2lnbiBpbi4gVGhpcyBpcyBzdXNjZXB0aWJsZSB0byBtb2RpZmljYXRpb24gYnkgY2xpZW50cywgc28gYmUgc3VyZSB0byB2ZXJpZnkgdGhlIGhvc3RlZCBkb21haW4gcHJvcGVydHkgb2YgdGhlIHJldHVybmVkIHVzZXIuIFVzZSBHb29nbGVVc2VyLmdldEhvc3RlZERvbWFpbigpIG9uIHRoZSBjbGllbnQsIGFuZCB0aGUgaGQgY2xhaW0gaW4gdGhlIElEIFRva2VuIG9uIHRoZSBzZXJ2ZXIgdG8gdmVyaWZ5IHRoZSBkb21haW4gaXMgd2hhdCB5b3UgZXhwZWN0ZWQuXG4gIG9wZW5pZF9yZWFsbT86IHN0cmluZzsgLy9cdFVzZWQgb25seSBmb3IgT3BlbklEIDIuMCBjbGllbnQgbWlncmF0aW9uLiBTZXQgdG8gdGhlIHZhbHVlIG9mIHRoZSByZWFsbSB0aGF0IHlvdSBhcmUgY3VycmVudGx5IHVzaW5nIGZvciBPcGVuSUQgMi4wLCBhcyBkZXNjcmliZWQgaW4gT3BlbklEIDIuMCAoTWlncmF0aW9uKS5cbiAgdXhfbW9kZT86IHN0cmluZzsgLy8gVGhlIFVYIG1vZGUgdG8gdXNlIGZvciB0aGUgc2lnbi1pbiBmbG93LiBCeSBkZWZhdWx0LCBpdCB3aWxsIG9wZW4gdGhlIGNvbnNlbnQgZmxvdyBpbiBhIHBvcHVwLiBWYWxpZCB2YWx1ZXMgYXJlIHBvcHVwIGFuZCByZWRpcmVjdC5cbiAgcmVkaXJlY3RfdXJpPzogc3RyaW5nOyAvLyBcdElmIHVzaW5nIHV4X21vZGU9J3JlZGlyZWN0JywgdGhpcyBwYXJhbWV0ZXIgYWxsb3dzIHlvdSB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCByZWRpcmVjdF91cmkgdGhhdCB3aWxsIGJlIHVzZWQgYXQgdGhlIGVuZCBvZiB0aGUgY29uc2VudCBmbG93LiBUaGUgZGVmYXVsdCByZWRpcmVjdF91cmkgaXMgdGhlIGN1cnJlbnQgVVJMIHN0cmlwcGVkIG9mIHF1ZXJ5IHBhcmFtZXRlcnMgYW5kIGhhc2ggZnJhZ21lbnQuXG59XG5cbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZUNvbmZpZyB7XG4gIHByb3ZpZGVyczogTWFwPHN0cmluZywgTG9naW5Qcm92aWRlcj4gPSBuZXcgTWFwPHN0cmluZywgTG9naW5Qcm92aWRlcj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm92aWRlcnM6IEF1dGhTZXJ2aWNlQ29uZmlnSXRlbVtdKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBlbGVtZW50ID0gcHJvdmlkZXJzW2ldO1xuICAgICAgdGhpcy5wcm92aWRlcnMuc2V0KGVsZW1lbnQuaWQsIGVsZW1lbnQucHJvdmlkZXIpO1xuICAgIH1cbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVSUl9MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQgPSAnTG9naW4gcHJvdmlkZXIgbm90IGZvdW5kJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRVJSX05PVF9MT0dHRURfSU4gPSAnTm90IGxvZ2dlZCBpbic7XG5cbiAgcHJpdmF0ZSBwcm92aWRlcnM6IE1hcDxzdHJpbmcsIExvZ2luUHJvdmlkZXI+O1xuXG4gIHByaXZhdGUgX3VzZXI6IFNvY2lhbFVzZXIgPSBudWxsO1xuICBwcml2YXRlIF9hdXRoU3RhdGU6IFN1YmplY3Q8U29jaWFsVXNlcj4gPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcblxuICBnZXQgYXV0aFN0YXRlKCk6IE9ic2VydmFibGU8U29jaWFsVXNlcj4ge1xuICAgIHJldHVybiB0aGlzLl9hdXRoU3RhdGU7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IEF1dGhTZXJ2aWNlQ29uZmlnKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBjb25maWcucHJvdmlkZXJzO1xuXG4gICAgdGhpcy5wcm92aWRlcnMuZm9yRWFjaCgocHJvdmlkZXI6IExvZ2luUHJvdmlkZXIsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBwcm92aWRlci5pbml0aWFsaXplKCkudGhlbigodXNlcjogU29jaWFsVXNlcikgPT4ge1xuICAgICAgICB1c2VyLnByb3ZpZGVyID0ga2V5O1xuXG4gICAgICAgIHRoaXMuX3VzZXIgPSB1c2VyO1xuICAgICAgICB0aGlzLl9hdXRoU3RhdGUubmV4dCh1c2VyKTtcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgdGhpcy5fYXV0aFN0YXRlLm5leHQobnVsbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNpZ25Jbihwcm92aWRlcklkOiBzdHJpbmcsIG9wdD86IExvZ2luT3B0KTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBwcm92aWRlck9iamVjdCA9IHRoaXMucHJvdmlkZXJzLmdldChwcm92aWRlcklkKTtcbiAgICAgIGlmIChwcm92aWRlck9iamVjdCkge1xuICAgICAgICBwcm92aWRlck9iamVjdC5zaWduSW4oKS50aGVuKCh1c2VyOiBTb2NpYWxVc2VyKSA9PiB7XG4gICAgICAgICAgdXNlci5wcm92aWRlciA9IHByb3ZpZGVySWQ7XG4gICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcblxuICAgICAgICAgIHRoaXMuX3VzZXIgPSB1c2VyO1xuICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZS5uZXh0KHVzZXIpO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIHRoaXMuX3VzZXIgPSBudWxsO1xuICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZS5uZXh0KG51bGwpO1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3VzZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9hdXRoU3RhdGUubmV4dChudWxsKTtcbiAgICAgICAgcmVqZWN0KEF1dGhTZXJ2aWNlLkVSUl9MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2lnbk91dCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX3VzZXIpIHtcbiAgICAgICAgcmVqZWN0KEF1dGhTZXJ2aWNlLkVSUl9OT1RfTE9HR0VEX0lOKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwcm92aWRlcklkID0gdGhpcy5fdXNlci5wcm92aWRlcjtcbiAgICAgICAgbGV0IHByb3ZpZGVyT2JqZWN0ID0gdGhpcy5wcm92aWRlcnMuZ2V0KHByb3ZpZGVySWQpO1xuICAgICAgICBpZiAocHJvdmlkZXJPYmplY3QpIHtcbiAgICAgICAgICBwcm92aWRlck9iamVjdC5zaWduT3V0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3VzZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlLm5leHQobnVsbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KEF1dGhTZXJ2aWNlLkVSUl9MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuIl19