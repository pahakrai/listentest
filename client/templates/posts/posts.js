Template.postComment.events({
  'submit form': function(event, template) {
    event.preventDefault();
    var currentUserId = Meteor.userId();
    var varComment = template.find('#comment').value;
    Meteor.call('insertUserComment',varComment,this._id);
    console.log(this._id);
    //return;
    template.find('#comment').value='';
  //  return false;
  },
});

Template.postpage.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('postpage', this._id);
    this.subscription = Meteor.subscribe('postcomments', this._id);
  }.bind(this));
};

Template.postpage.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.postpage.singlepost = function() {
  return UserPosts.findOne({_id: Router.current().params._id});
}

Template.postpage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  },
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  }
});



/* --Template.postpage.created = function () {
  //console.log(Router.current().params._id);
  this.autorun(function () {
    this.subscription = Meteor.subscribe('postpage', Router.current().params._id);
  }.bind(this));
};

Template.postpage.rendered = function () {
  //console.log('rendered '+ Router.current().params.stockCode);
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};--*/

/*-- Template.postpage.helpers({
  posts: function () {
    return UserPosts.findOne();
  }
}); --*


/* --Template.posts.isFirstRun = function(){
   // because the Session variable will most probably be undefined the first time
   return !Session.get("hasRun");
} =--*/

Template.posts.selectedclass = function() {
  var postId = this._id;
  var selectedPost = Session.get('selectedPost');
  if(postId === selectedPost){
    return true;
  }
};

Template.posts.events({
  'click li.post': function () {
    var postId = this._id;
    Session.set('selectedPost', postId);
    //Session.set('showButtons',true);
    //var selectedPost = Session.get('selectedPost');
    //this.$(".none").toggle();
    //$("li.post").fadeOut();
    //Session.set("hasRun", true);
    //console.log(selectedPost);
    },
    'submit form': function(event, template) {
      event.preventDefault();
      var currentUserId = Meteor.userId();
      var varPost = template.find('#post').value;
      Meteor.call('insertUserPost',varPost);
      template.find('#post').value='';
      return false;
    },
    'click #remove': function () {
      var selectedPost = Session.get('selectedPost');
      Meteor.call('removePost', selectedPost);
    },
    'click #edit': function() {
      Session.set('editItemId', this._id);
      //var selectedPost = Session.get('selectedPost');
      //var modPost = template.find('').value;
      //Meteor.call('modifyPost', selectedPost, modPost);
    },
    /* -- 'click .editItem': function(){
      Session.set('editItemId', this._id);
    },--*/
    'click #cancel': function() {
      Session.set('editItemId', null);
      Session.set('selectedPost',null);
    },
    'click #save': function(event,template) {
      //var selectedPost = session.get('selectedPost');
      var newPost = template.find('#newpost').value;
      Meteor.call('modifyPost',this._id,newPost);
      Session.set('editItemId', null);
      Session.set('selectedPost',null);

    },
    //'click #show-more': function(evt) {
    //  incrementLimit();
    //}
});

//incrementLimit = function(inc) {
  //var inc = 10;
  //newLimit = Session.get('limit') + inc;
  //Session.set('limit', newLimit);
//}

//Template.posts.created = function() {
//  Session.setDefault('limit', 10);

  // Deps.autorun() automatically rerun the subscription whenever Session.get('limit') changes
  // http://docs.meteor.com/#deps_autorun
//  Deps.autorun(function() {
  //  Meteor.subscribe('userposts', Session.get('limit'));
  //});
//}

//Template.posts.rendered = function() {
  // is triggered every time we scroll
  //$(window).scroll(function() {
  //  if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    //  incrementLimit();
  //  }
  //});
//}

/*--Template.Posts.helpers({
  posts: function() {
    return Posts.find({ }, { limit: Session.get('limit') });
  }
});--*/

Template.posts.helpers({
    showTheRegisterDiv:function(){
      if(Session.get('showButtons'))
         return true
      else
        return false
    },
    editing: function(){
      return Session.equals('editItemId', this._id);
    },
    comments: function() {
      return Comments.find({});
    },
    properuser: function() {
      var currentuser = Meteor.userId();
      var whosepost = this.createdBy;
      if(currentuser === whosepost)
        return true
      else
        return false
    }
    //postslist: function() {
      //return UserPosts.find({ }, { limit: Session.get('limit') });
    //}
  });
