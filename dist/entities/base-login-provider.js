export class BaseLoginProvider {
    constructor() { }
    loadScript(id, src, onload) {
        if (document.getElementById(id)) {
            return;
        }
        let signInJS = document.createElement("script");
        signInJS.async = true;
        signInJS.src = src;
        signInJS.onload = onload;
        document.head.appendChild(signInJS);
    }
}
//# sourceMappingURL=base-login-provider.js.map