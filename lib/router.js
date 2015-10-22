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
});

Router.onBeforeAction('loading');