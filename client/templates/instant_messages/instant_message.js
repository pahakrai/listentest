// check if it is the currentuser Id
Template.instantMessage.helpers({
    isUser:function(userId){
       return Meteor.userId() == userId;
    }
})

/*
 Template.instantMessage.events = {
    'submit form': function (event) {
      event.preventDefault();	
	  console.log('submit message='+event.target.messageBox.value);
	  
	  // insert 
    }
  };
*/

Template.instantMessage.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $messageBox = $(e.target).find('[name=messageBox]');
    var message = {
	  id: template.data._id,
      content: $messageBox.val(),
    };


    var errors = {};
    if (! message.content) {
		return;
//      errors.messageBox = "Please write some content";
//      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('instantMessageInsert', message, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        $messageBox.val('');
      }
    });
	
  }

});