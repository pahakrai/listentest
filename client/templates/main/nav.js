Template.nav.helpers({
    languages: function(){
        //return T9n.getLanguages();
        return [{lang: 'zh-CN', name: '简'},{lang: 'zh-HK', name: '繁'},{lang: 'en', name: 'ENG'}];		
    },
    uppercase: function(){
        return this.toUpperCase();
    }
});


Template.nav.events({
    'click a.setlang': function(event){
        event.preventDefault();
        var currTarg = event.currentTarget;
        var lang = currTarg.id.slice(5); // Skips 'lang-'
		
		setLanguage(lang);
    },
    'click #signOut': function(event){
        event.preventDefault();
        Meteor.logout();
    },
});