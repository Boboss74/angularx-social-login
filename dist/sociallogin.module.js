"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const auth_service_1 = require("./auth.service");
function configFactory(config) {
    return config;
}
exports.configFactory = configFactory;
let SocialLoginModule = SocialLoginModule_1 = class SocialLoginModule {
    static initialize(config) {
        return {
            ngModule: SocialLoginModule_1,
            providers: [
                auth_service_1.AuthService,
                {
                    provide: auth_service_1.AuthServiceConfig,
                    useValue: config
                }
            ]
        };
    }
};
SocialLoginModule = SocialLoginModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        providers: [
            auth_service_1.AuthService
        ]
    })
], SocialLoginModule);
exports.SocialLoginModule = SocialLoginModule;
var SocialLoginModule_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsbG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2JvcmlzL2Rldi9pY2Vyb2xsL2FuZ3VsYXJ4LXNvY2lhbC1sb2dpbi9zcmMvIiwic291cmNlcyI6WyJzb2NpYWxsb2dpbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBOEQ7QUFDOUQsNENBQStDO0FBRS9DLGlEQUFnRTtBQUVoRSx1QkFBOEIsTUFBeUI7SUFDckQsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRkQsc0NBRUM7QUFVRCxJQUFhLGlCQUFpQix5QkFBOUI7SUFFUyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQXlCO1FBQ2hELE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxtQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNULDBCQUFXO2dCQUNYO29CQUNFLE9BQU8sRUFBRSxnQ0FBaUI7b0JBQzFCLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FFRixDQUFBO0FBZlksaUJBQWlCO0lBUjdCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHFCQUFZO1NBQ2I7UUFDRCxTQUFTLEVBQUU7WUFDVCwwQkFBVztTQUNaO0tBQ0YsQ0FBQztHQUNXLGlCQUFpQixDQWU3QjtBQWZZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBBdXRoU2VydmljZSwgQXV0aFNlcnZpY2VDb25maWcgfSBmcm9tIFwiLi9hdXRoLnNlcnZpY2VcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0ZhY3RvcnkoY29uZmlnOiBBdXRoU2VydmljZUNvbmZpZykge1xuICByZXR1cm4gY29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEF1dGhTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU29jaWFsTG9naW5Nb2R1bGUge1xuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShjb25maWc6IEF1dGhTZXJ2aWNlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTb2NpYWxMb2dpbk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBBdXRoU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEF1dGhTZXJ2aWNlQ29uZmlnLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxufVxuIl19