Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.map(function() {
    this.route('patientList', {
        path: '/',
        waitOn: function() { return Meteor.subscribe('patients'); }
    });
    this.route('showPatient', {
        path: '/patient/:_id',
        waitOn: function() { return [Meteor.subscribe('messagesByPatient',this.params._id), Meteor.subscribe('patients')]; },
        data: function() { return Patients.findOne(this.params._id); }
    });
    this.route('createPatient', {path: '/createPatient'});
    this.route('showMessage', {
        path: '/showMessage/:_id',
        waitOn: function() { return Meteor.subscribe('messageById', this.params._id)},
        data: function() { return Messages.findOne(this.params._id); }
    });
    this.route('documentPdf/:_id/mrn/:_mrnId',function() {
        var pdfEncodedString = Meteor.call('fetchDocument',this.params._id, this.params._mrnId);
        var pdfBuffer = new Buffer(pdfEncodedString,'base64');
        this.response.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Length":pdfBuffer.length
        });
        this.response.write(new Buffer(pdfBuffer,'base64'));
        this.response.end();
    }, {
        where: "server"
    });
});

Router.onBeforeAction('loading');