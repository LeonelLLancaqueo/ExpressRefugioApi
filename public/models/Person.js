const {Schema, model}=  require('mongoose');

const PersonSchema= new Schema({
    'nombre': {
        type: String,
        required: true,   
    },
    'apellido': {
        type: String,
        required: true,   
    },
    'email': {
        type: String,
        required: true,   
        unique: true,
        trim: true
    },
    'tel': {
        type: String,
        required: true,   
        unique: true,
        trim: true
    }
},
{
    timestamps: true,
    versionkey: false

})

module.exports = model('Person', PersonSchema);