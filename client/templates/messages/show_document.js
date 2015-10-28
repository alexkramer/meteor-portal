var docPdf = null;
var docPdfDep = new Deps.Dependency();

Template.showDocument.events({
    "click .viewPdf": function(event) {
        docPdf = '/documentPdf/'+event.target.getAttribute('data-documentId')+'/mrn/'+event.target.getAttribute('data-mrnId');
        docPdfDep.changed();
    }
});

Template.showDocument.helpers({
    documentPdf: function() {
        docPdfDep.depend();
        return docPdf;
    }
});