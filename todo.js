Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  
  Template.body.helpers({
    tasks: function(){
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });


  Template.body.events({
    "submit .new-task": function (event){
      
      // Get the input value
      var text = event.target.text.value

      // Add taks to Task model
      Tasks.insert({
        text: text,
        createdAt: new Date()
      })

      // Clean the form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  })


  Template.task.events({
    "click .toggle-checked": function(){
      // Set the checked property to the opposite
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function(){
      Tasks.remove(this._id);
    }
  })

}

