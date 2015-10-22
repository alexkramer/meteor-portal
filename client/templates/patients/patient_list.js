Template.patientList.helpers({
    patients: function() {
        return Patients.find();
    }
});