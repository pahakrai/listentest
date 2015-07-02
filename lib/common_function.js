// Change language
setLanguage = function(value) {
	TAPi18n.setLanguage(value);
//	TAPi18n.setLanguage('en');

	// set language for useraccounts:bootstrap package	
	T9n.setLanguage(setLanguageHelper(value));
	
};

// This helper function returns the lang name defined in T9n fro i18N lang
setLanguageHelper = function(value) {
	if ('zh-CN'===value) {
		return 'zh-cn';
	} else if ('zh-HK'===value) {
		return 'zh_tw';
	} else if ('en'===value) {
		return 'en';
	} else {
	}
};

