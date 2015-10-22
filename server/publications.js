Meteor.publish('patients', function() {
    return Patients.find();
});

Meteor.publish('messagesByPatient', function(patientId) {
    return Messages.find({patientPortalID:patientId});
});

Meteor.publish('messageById', function(messageId) {
    return Messages.find({_id: messageId});
});