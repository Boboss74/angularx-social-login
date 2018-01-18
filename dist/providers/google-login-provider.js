import { BaseLoginProvider } from "../entities/base-login-provider";
import { SocialUser } from "../entities/user";
export class GoogleLoginProvider extends BaseLoginProvider {
    constructor(clientId, opt = { scope: 'email' }) {
        super();
        this.clientId = clientId;
        this.opt = opt;
        if (clientId)
            opt.client_id = clientId;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.loadScript(GoogleLoginProvider.PROVIDER_ID, "//apis.google.com/js/platform.js", () => {
                gapi.load('auth2', () => {
                    this.auth2 = gapi.auth2.init(this.opt);
                    this.auth2.then(() => {
                        if (this.auth2.isSignedIn.get()) {
                            let user = new SocialUser();
                            let profile = this.auth2.currentUser.get().getBasicProfile();
                            let token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
                            //This is the token that can be sended for the backend.
                            //https://developers.google.com/identity/sign-in/web/backend-auth
                            let backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;
                            user.id = profile.getId();
                            user.name = profile.getName();
                            user.email = profile.getEmail();
                            user.photoUrl = profile.getImageUrl();
                            user.firstName = profile.getGivenName();
                            user.lastName = profile.getFamilyName();
                            user.authToken = token;
                            user.tokenId = backendToken;
                            resolve(user);
                        }
                        else {
                            reject();
                        }
                    });
                });
            });
        });
    }
    signIn() {
        return new Promise((resolve, reject) => {
            let promise = this.auth2.signIn();
            this.auth2.signIn().then(() => {
                let user = new SocialUser();
                let profile = this.auth2.currentUser.get().getBasicProfile();
                let token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
                //This is the token that can be sended for the backend.
                //https://developers.google.com/identity/sign-in/web/backend-auth
                let backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;
                user.id = profile.getId();
                user.name = profile.getName();
                user.email = profile.getEmail();
                user.photoUrl = profile.getImageUrl();
                user.firstName = profile.getGivenName();
                user.lastName = profile.getFamilyName();
                user.authToken = token;
                user.tokenId = backendToken;
                resolve(user);
            }).catch((err) => reject(err));
        });
    }
    signOut() {
        return new Promise((resolve, reject) => {
            this.auth2.signOut().then((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
GoogleLoginProvider.PROVIDER_ID = "GOOGLE";
//# sourceMappingURL=google-login-provider.js.map