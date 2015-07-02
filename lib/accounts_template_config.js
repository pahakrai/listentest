//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
//AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');

AccountsTemplates.configure({
    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: false,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
	/*
    homeRoutePath: '/home',
    redirectTimeout: 4000,
	*/
	
    // Hooks
	/*
    onLogoutHook: myLogoutFunc,
    onSubmitHook: mySubmitFunc,
    preSignUpHook: myPreSubmitFunc,
	*/
		
    // Texts
	// https://github.com/meteor-useraccounts/core/commit/c963bbb5fbeab88e9398404ab002360f48c47eec
    texts: {
    button: {
        changePwd: "updateYourPassword",
        //enrollAccount: "createAccount",
        enrollAccount: "signUp",
        forgotPwd: "emailResetLink",
        resetPwd: "setPassword",
        signIn: "signIn",
        signUp: "signUp",
    },
    errors: {
        loginForbidden: "error.accounts.Login forbidden",
        mustBeLoggedIn: "error.accounts.Must be logged in",
        pwdMismatch: "error.pwdsDontMatch",
    },
    navSignIn: 'signIn',
    navSignOut: 'signOut',
    info: {
        emailSent: "info.emailSent",
        emailVerified: "info.emailVerified",
        pwdChanged: "info.passwordChanged",
        pwdReset: "info.passwordReset",
        pwdSet: "Password Set",
        signUpVerifyEmail: "Successful Registration! Please check your email and follow the instructions.",
    },
    inputIcons: {
        isValidating: "fa fa-spinner fa-spin",
        hasSuccess: "fa fa-check",
        hasError: "fa fa-times",
    },
    optionalField: "optional",
    pwdLink_pre: "",
    pwdLink_link: "forgotPassword",
    pwdLink_suff: "",
    sep: "OR",
    signInLink_pre: "ifYouAlreadyHaveAnAccount",
    signInLink_link: "signin",
    signInLink_suff: "",
    signUpLink_pre: "dontHaveAnAccount",
    signUpLink_link: "signUp",
    signUpLink_suff: "",
    socialAdd: "add",
    socialConfigure: "configure",
    socialIcons: {
        "meteor-developer": "fa fa-rocket"
    },
    socialRemove: "remove",
    socialSignIn: "signIn",
    socialSignUp: "signUp",
    socialWith: "with",
    termsPreamble: "clickAgree",
    termsPrivacy: "privacyPolicy",
    termsAnd: "and",
    termsTerms: "terms",
    title: {
        changePwd: "changePassword",
        enrollAccount: "createAccount",
        forgotPwd: "resetYourPassword",
        resetPwd: "resetYourPassword",
        signIn: "signIn",
        signUp: "createAccount",
        verifyEmail: ""
    },
    }
});