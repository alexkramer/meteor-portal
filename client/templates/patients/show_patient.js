var patLookupResponse = null;
var dep = new Deps.Dependency();

Template.showPatient.events({
    "click .lookup": function() {
        dep.changed();
        var dataToPost = {
            "patientPortalID":this._id,
            "patientFirstName":this.firstName,
            "patientLastName":this.lastName,
            "patientDOB":this.dob,
            "patientPostalCode":this.postalCode
        };
        Meteor.call('patLookup',dataToPost,function(error,results) {
            patLookupResponse = results.data;
            console.log(patLookupResponse);
            dep.changed();
        });
    },
    "click .register": function() {
        Meteor.call('registerPatient',this._id,function(error,results) {
            console.log(results);
        });
    }
});
Template.showPatient.helpers({
    lookupResponse: function() {
        dep.depend();
        return patLookupResponse;
    },
    messages: function() {
        return Messages.find();
    },
    messageToString: function() {
        return JSON.stringify(this);
    }
});