Template.showDocument.helpers({
    documentPdf: function() {
        var docBytes = null;
        Meteor.call('fetchDocument',this.documentId,function(error,results) {
            docBytes = results.data.document.attachment.bytes;
        });
        return docBytes;
    }
});