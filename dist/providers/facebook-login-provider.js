"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_login_provider_1 = require("../entities/base-login-provider");
const user_1 = require("../entities/user");
class FacebookLoginProvider extends base_login_provider_1.BaseLoginProvider {
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
                            let user = new user_1.SocialUser();
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
                        let user = new user_1.SocialUser();
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
exports.FacebookLoginProvider = FacebookLoginProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2stbG9naW4tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvYm9yaXMvZGV2L2ljZXJvbGwvYW5ndWxhcngtc29jaWFsLWxvZ2luL3NyYy8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9mYWNlYm9vay1sb2dpbi1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlFQUFvRTtBQUNwRSwyQ0FBOEM7QUFLOUMsMkJBQW1DLFNBQVEsdUNBQWlCO0lBSTFELFlBQW9CLFFBQWdCLEVBQVUsTUFBZ0IsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUMsRUFBVSxTQUFpQixPQUFPO1FBQy9ILEtBQUssRUFBRSxDQUFDO1FBRFUsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQThDO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFFL0gsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDekMsQ0FBQztJQUVELFVBQVU7UUFDUixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQy9DLDBCQUEwQixJQUFJLENBQUMsTUFBTSxTQUFTLEVBQzlDLEdBQUcsRUFBRTtnQkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDO29CQUNOLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDcEIsZ0JBQWdCLEVBQUUsSUFBSTtvQkFDdEIsTUFBTSxFQUFFLElBQUk7b0JBQ1osS0FBSyxFQUFFLElBQUk7b0JBQ1gsT0FBTyxFQUFFLE1BQU07aUJBQ2hCLENBQUMsQ0FBQztnQkFDSCwyQ0FBMkM7Z0JBRTNDLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxRQUFhO29CQUN2QyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7d0JBQ3pDLEVBQUUsQ0FBQyxHQUFHLENBQUMsb0RBQW9ELEVBQUUsQ0FBQyxRQUFhLEVBQUUsRUFBRTs0QkFDL0UsSUFBSSxJQUFJLEdBQWUsSUFBSSxpQkFBVSxFQUFFLENBQUM7NEJBRXhDLElBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQzs0QkFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDOzRCQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7NEJBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsNkJBQTZCLEdBQUcsUUFBUSxDQUFDLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQzs0QkFDckYsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDOzRCQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7NEJBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQzs0QkFFMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNoQixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtnQkFDekIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQzFCLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7b0JBQ3pDLEVBQUUsQ0FBQyxHQUFHLENBQUMsb0RBQW9ELEVBQUUsQ0FBQyxRQUFhLEVBQUUsRUFBRTt3QkFDN0UsSUFBSSxJQUFJLEdBQWUsSUFBSSxpQkFBVSxFQUFFLENBQUM7d0JBRXhDLElBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO3dCQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7d0JBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsNkJBQTZCLEdBQUcsUUFBUSxDQUFDLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQzt3QkFDckYsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO3dCQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7d0JBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQzt3QkFFMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoQixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDTCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO2dCQUMxQixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQXhFc0IsaUNBQVcsR0FBVyxVQUFVLENBQUM7QUFGMUQsc0RBNEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUxvZ2luUHJvdmlkZXIgfSBmcm9tIFwiLi4vZW50aXRpZXMvYmFzZS1sb2dpbi1wcm92aWRlclwiO1xuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gXCIuLi9lbnRpdGllcy91c2VyXCI7XG5pbXBvcnQgeyBMb2dpbk9wdCB9IGZyb20gJy4uL2F1dGguc2VydmljZSc7XG5cbmRlY2xhcmUgbGV0IEZCOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBGYWNlYm9va0xvZ2luUHJvdmlkZXIgZXh0ZW5kcyBCYXNlTG9naW5Qcm92aWRlciB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBQUk9WSURFUl9JRDogc3RyaW5nID0gXCJGQUNFQk9PS1wiO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50SWQ6IHN0cmluZywgcHJpdmF0ZSBvcHQ6IExvZ2luT3B0ID0geyBzY29wZTogJ2VtYWlsLCBwdWJsaWNfcHJvZmlsZSd9LCBwcml2YXRlIGxvY2FsZTogc3RyaW5nID0gJ2VuX1VTJykge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKGNsaWVudElkKSBvcHQuY2xpZW50X2lkID0gY2xpZW50SWQ7XG4gIH1cblxuICBpbml0aWFsaXplKCk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvYWRTY3JpcHQoRmFjZWJvb2tMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lELFxuICAgICAgICBgLy9jb25uZWN0LmZhY2Vib29rLm5ldC8ke3RoaXMubG9jYWxlfS9zZGsuanNgLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgRkIuaW5pdCh7XG4gICAgICAgICAgICBhcHBJZDogdGhpcy5jbGllbnRJZCxcbiAgICAgICAgICAgIGF1dG9Mb2dBcHBFdmVudHM6IHRydWUsXG4gICAgICAgICAgICBjb29raWU6IHRydWUsXG4gICAgICAgICAgICB4ZmJtbDogdHJ1ZSxcbiAgICAgICAgICAgIHZlcnNpb246ICd2Mi45J1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIEZCLkFwcEV2ZW50cy5sb2dQYWdlVmlldygpOyAjRklYIGZvciAjMThcblxuICAgICAgICAgIEZCLmdldExvZ2luU3RhdHVzKGZ1bmN0aW9uIChyZXNwb25zZTogYW55KSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAnY29ubmVjdGVkJykge1xuICAgICAgICAgICAgICAgIGxldCBhdXRoUmVzcG9uc2UgPSByZXNwb25zZS5hdXRoUmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgRkIuYXBpKCcvbWU/ZmllbGRzPW5hbWUsZW1haWwscGljdHVyZSxmaXJzdF9uYW1lLGxhc3RfbmFtZScsIChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXI6IFNvY2lhbFVzZXIgPSBuZXcgU29jaWFsVXNlcigpO1xuXG4gICAgICAgICAgICAgICAgdXNlci5pZCA9IHJlc3BvbnNlLmlkO1xuICAgICAgICAgICAgICAgIHVzZXIubmFtZSA9IHJlc3BvbnNlLm5hbWU7XG4gICAgICAgICAgICAgICAgdXNlci5lbWFpbCA9IHJlc3BvbnNlLmVtYWlsO1xuICAgICAgICAgICAgICAgIHVzZXIucGhvdG9VcmwgPSBcImh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL1wiICsgcmVzcG9uc2UuaWQgKyBcIi9waWN0dXJlP3R5cGU9bm9ybWFsXCI7XG4gICAgICAgICAgICAgICAgdXNlci5maXJzdE5hbWUgPSByZXNwb25zZS5maXJzdF9uYW1lO1xuICAgICAgICAgICAgICAgIHVzZXIubGFzdE5hbWUgPSByZXNwb25zZS5sYXN0X25hbWU7XG4gICAgICAgICAgICAgICAgdXNlci5hdXRoVG9rZW4gPSBhdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW47XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzaWduSW4oKTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIEZCLmxvZ2luKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5hdXRoUmVzcG9uc2UpIHtcbiAgICAgICAgICBsZXQgYXV0aFJlc3BvbnNlID0gcmVzcG9uc2UuYXV0aFJlc3BvbnNlO1xuICAgICAgICAgIEZCLmFwaSgnL21lP2ZpZWxkcz1uYW1lLGVtYWlsLHBpY3R1cmUsZmlyc3RfbmFtZSxsYXN0X25hbWUnLCAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IHVzZXI6IFNvY2lhbFVzZXIgPSBuZXcgU29jaWFsVXNlcigpO1xuXG4gICAgICAgICAgICB1c2VyLmlkID0gcmVzcG9uc2UuaWQ7XG4gICAgICAgICAgICB1c2VyLm5hbWUgPSByZXNwb25zZS5uYW1lO1xuICAgICAgICAgICAgdXNlci5lbWFpbCA9IHJlc3BvbnNlLmVtYWlsO1xuICAgICAgICAgICAgdXNlci5waG90b1VybCA9IFwiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vXCIgKyByZXNwb25zZS5pZCArIFwiL3BpY3R1cmU/dHlwZT1ub3JtYWxcIjtcbiAgICAgICAgICAgIHVzZXIuZmlyc3ROYW1lID0gcmVzcG9uc2UuZmlyc3RfbmFtZTtcbiAgICAgICAgICAgIHVzZXIubGFzdE5hbWUgPSByZXNwb25zZS5sYXN0X25hbWU7XG4gICAgICAgICAgICB1c2VyLmF1dGhUb2tlbiA9IGF1dGhSZXNwb25zZS5hY2Nlc3NUb2tlbjtcblxuICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5vcHQpO1xuICAgIH0pO1xuICB9XG5cbiAgc2lnbk91dCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBGQi5sb2dvdXQoKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxufVxuIl19