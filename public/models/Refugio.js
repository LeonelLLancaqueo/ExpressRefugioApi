const {Schema, model}=  require('mongoose');

const RefugioSchema= new Schema({
    'id':{
        type: String,
        unique: true,
        required: true,
    },
    'nombre': {
        type: String,
        required: true,   
    },
    'descripcion': {
        type: String,
        required: true,   
    },
    'altura': {
        type: String,
        required: true,   
       
    },
    'dificultad': {
        type: String,
        required: true,   
    },
    'url': {
        type: String,
        required: true, 
    }
},
{
    timestamps: true,
    versionkey: false

})

module.exports = model('Refugio', RefugioSchema);