var createStompConnection = function() {
    var Stomp = Meteor.npmRequire('stomp-client');
    var client = new Stomp(Meteor.settings.jms.host,Meteor.settings.jms.port); // Uses PolicyBase default policy
    var future = new Future();
    client.connect(function(sessionId) {
        future.return(client);
    });
    return future.wait();
};

startConsuming = function() {

    var client = createStompConnection();
    var incomingTopic = '/topic/' + Meteor.settings.jms.incomingTopic;
    client.subscribe(incomingTopic,function(body,headers) {
        //no-op, will use the events instead here
    });
    client.on('message',Meteor.bindEnvironment(
        function(message) {
            console.log('message received from ERP: ' + message);
            Messages.insert(JSON.parse(message));
        }
    ));
    client.on('error', Meteor.bindEnvironment(
        function(err) {
            console.log('error receiving: ', err);
        }
    ));

};

publishToErp = function(message) {

    var client = createStompConnection();
    var outgoingTopic = '/topic/' + Meteor.settings.jms.outgoingTopic;
    client.publish(outgoingTopic,JSON.stringify(message));

    client.disconnect();
};

registerPatient = function(patientId) {

    var patient = Patients.findOne(patientId);

    var registrationMessage = {
        "messageType": "REG_CONFIRM",
        "patientPortalID": patientId,
        "patientFirstName": patient.firstName,
        "patientLastName": patient.lastName,
        "patientEmail": patient.email,
        "patientDOB": patient.dob,
        "phoneNumber": patient.phone,
        "patientPostalCode": patient.postalCode
    };

    Messages.insert(registrationMessage);

    publishToErp(registrationMessage);

    return {"status":"Success", "message":"Registration pending"};
};
