Template.createPatient.events({
    'submit form': function(e) {
        e.preventDefault();
        var patient = {
            firstName: $(e.target).find('[name=firstName]').val(),
            lastName: $(e.target).find('[name=lastName]').val(),
            dob: $(e.target).find('[name=dob]').val(),
            postalCode: $(e.target).find('[name=postalCode]').val(),
            phone: $(e.target).find('[name=phone]').val(),
            email: $(e.target).find('[name=email]').val()
        };
        patient._id = Patients.insert(patient);
        Router.go('showPatient', patient);
    }
});