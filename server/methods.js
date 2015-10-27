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
        var urlToGet = Meteor.settings.api.urls.fetchDocument + "/" + documentId;
        console.log("Attempting to fetch document from: " + urlToGet);
        var results = HTTP.get(urlToGet,{
            auth: apiAuthString(),
            headers: {"accept":"application/json"},
            npmRequestOptions: {rejectUnauthorized: false}
        });
        return JSON.parse(results.data.document).fileAttachment.bytes;
    }
});