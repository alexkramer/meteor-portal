Template.patientLookupResponse.helpers({
    statusClass: function() {
        return (this.registrationStatus && this.registrationStatus.indexOf('FAIL') > -1) ? 'text-danger' : 'text-success';
    }
});