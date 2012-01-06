var connect = require( 'connect' );
var mongo = require( 'mongoose' );

var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGOLAB_URI;


var db = mongo.connect( mongoUri );
var Schema = db.Schema;

var ContactSchema = new Schema({
   firstName : String,
   lastName : String
});

var ContactModel = db.model( 'ContactModel', ContactSchema );

var contacts = {
    add: function( firstName, lastName, requestCallback )
    {
        var contact = new ContactModel();
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.save();
    }
};

connect.createServer(

    require( 'connect-jsonrpc' )( contacts )
).listen( port );