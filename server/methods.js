apiAuthString = function() {
    return Meteor.settings.api.username + ":" + Meteor.settings.api.password;
};

Meteor.methods({
    patLookup: function (dataToPost) {
        this.unblock();
        return HTTP.post(Meteor.settings.api.urls.patLookup,{
            auth: apiAuthString(),
            data: dataToPost,
            npmRequestOptions: {rejectUnauthorized: false}
        });
    },
    registerPatient: function (patientId) {
        this.unblock();
        return registerPatient(patientId);
    },
    fetchDocument: function(documentId) {
        this.unblock();
        return HTTP.get(Meteor.settings.api.urls.fetchDocument + "/" + documentId,{
            auth: apiAuthString(),
            npmRequestOptions: {rejectUnauthorized: false}
        });
    }
});