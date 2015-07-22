/* structure

{
	_id: 123,
	userId: 123,
	content: "testing",
	parent: 123,
	children: [123, 123],
	date: new Date()

}

*/

Template.postmain.rendered = function() {
  this.autorun(function() {
    /*
    var userId = Meteruser.userId();
    if (Router.parmater exits) {
      userId = Router.parser;
    }
    */

    Meteor.subscribe("postcollections", Meteor.userId());
  })
}

Template.postmain.postcoll = function(){
  return PostCollection.find({parent:null},{sort:{date: -1}});

};

Template.postmain.events({
  'keyup #posttext': function(event,template) {
    event.preventDefault();
    if(event.which === 13){
      var textcontent = template.find('#posttext').value;
      Meteor.call('insertPost',{content: textcontent, parentId:null});
      $('#posttext').val("").select().focus();
    }
  },
});

Template.postcollections.events({
  'keyup #commenttext': function(event,template){
    event.preventDefault();
    if(event.which === 13){
      var textcontent = template.find('#commenttext').value;
      Meteor.call('insertPost',{content: textcontent, parentId: this._id});
      $('#commenttext').val("").select().focus();
    }
  },
  'click #loadmore': function() {
    Session.set('parentid',this._id);
    incrementLimit();
  }
})

Template.postcollections.postcom = function() {
  //var parentid = Session.get('parentid');
  //  if(parentid === null)
    //  return PostCollection.find({parent: this._id}, {limit: Session.get('limit')});
  //  else
  return PostCollection.find({parent: this._id}, {limit: Session.get('limit')});
  //Session.set('parentid',null);
}

Template.postcollections.postcomsingle = function() {
  var parentid = Session.get('parentid');
  return PostCollection.find({parent: this._id}, {limit: Session.get('limit')});
  //Session.set('parentid',null);
}

Template.postcollections.helpers({
  authorized: function() {
    return this.userId === Meteor.userId();
  },
  single: function(){
    if(Session.get('parentid') === undefined)
      return true
    else
      return false
  }
  //postid : function() {
  //  return Session.equals('parentid',this._id);
//  }
});

incrementLimit = function(inc) {
  var inc = 5;
  //Session.set('parentid',this._id);
  newLimit = Session.get('limit') + inc;
  Session.set('limit', newLimit);
  //console.log(Session.get('parentid'));
}

Template.postcollections.rendered = function() {
  Session.setDefault('limit', 2);

  this.autorun(function() {
   Meteor.subscribe('postcollections', Session.get('limit'));
  });
}


/*--Template.Posts.helpers({
  posts: function() {
    return Posts.find({ }, { limit: Session.get('limit') });
  }
});--*/
