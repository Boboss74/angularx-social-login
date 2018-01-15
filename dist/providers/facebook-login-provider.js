import { BaseLoginProvider } from "../entities/base-login-provider";
import { SocialUser } from "../entities/user";
export class FacebookLoginProvider extends BaseLoginProvider {
    constructor(clientId, opt = { scope: 'email, public_profile' }, locale = 'en_US') {
        super();
        this.clientId = clientId;
        this.opt = opt;
        this.locale = locale;
        if (clientId)
            opt.client_id = clientId;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.loadScript(FacebookLoginProvider.PROVIDER_ID, `//connect.facebook.net/${this.locale}/sdk.js`, () => {
                FB.init({
                    appId: this.clientId,
                    autoLogAppEvents: true,
                    cookie: true,
                    xfbml: true,
                    version: 'v2.9'
                });
                // FB.AppEvents.logPageView(); #FIX for #18
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        let authResponse = response.authResponse;
                        FB.api('/me?fields=name,email,picture,first_name,last_name', (response) => {
                            let user = new SocialUser();
                            user.id = response.id;
                            user.name = response.name;
                            user.email = response.email;
                            user.photoUrl = "https://graph.facebook.com/" + response.id + "/picture?type=normal";
                            user.firstName = response.first_name;
                            user.lastName = response.last_name;
                            user.authToken = authResponse.accessToken;
                            resolve(user);
                        });
                    }
                });
            });
        });
    }
    signIn() {
        return new Promise((resolve, reject) => {
            FB.login((response) => {
                if (response.authResponse) {
                    let authResponse = response.authResponse;
                    FB.api('/me?fields=name,email,picture,first_name,last_name', (response) => {
                        let user = new SocialUser();
                        user.id = response.id;
                        user.name = response.name;
                        user.email = response.email;
                        user.photoUrl = "https://graph.facebook.com/" + response.id + "/picture?type=normal";
                        user.firstName = response.first_name;
                        user.lastName = response.last_name;
                        user.authToken = authResponse.accessToken;
                        resolve(user);
                    });
                }
            }, this.opt);
        });
    }
    signOut() {
        return new Promise((resolve, reject) => {
            FB.logout((response) => {
                resolve();
            });
        });
    }
}
FacebookLoginProvider.PROVIDER_ID = "FACEBOOK";
//# sourceMappingURL=facebook-login-provider.js.map