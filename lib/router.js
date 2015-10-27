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
    this.route('documentPdf/:_id',function() {
        var pdfBytes = Meteor.call('fetchDocument',this.params._id);
        this.response.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Length":pdfBytes.length
        });
        this.response.write(new Buffer(pdfBytes));
        this.response.end();
    }, {
        where: "server"
    });
});

Router.onBeforeAction('loading');