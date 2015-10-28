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
    fetchDocument: function(documentId,mrnId) {
        var urlToGet = Meteor.settings.api.urls.fetchDocument;
        var results = HTTP.get(urlToGet,{
            params: {"documentId":documentId,"gsgMrnId":mrnId},
            auth: apiAuthString(),
            headers: {"accept":"application/json"},
            npmRequestOptions: {rejectUnauthorized: false}
        });
        return results.data.document.fileAttachment.bytes;
    }
});