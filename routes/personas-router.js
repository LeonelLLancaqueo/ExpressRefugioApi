
const express= require('express');


const router= express.Router();

const Person = require('../public/models/Person');



router.use(express.json());

//db
const database = require('../public/config/iniciarDB');
const { isUtf8 } = require('buffer');


router.get('/', async(req,res)=>{

      //en esta ruta obtenemos la coleccion de personas guardadas en db
  try{  
      
      const response=  await database.collection('person').find({}).toArray();

      res.status(201).send(response);

    }catch(err){
      
      return res.status(500).send("operacion fallida, error servidor");
    }
    
        

});



router.post('/', async(req,res)=>{

    try{  
    
        const {nombre, apellido, email, tel}= req.body;
      
        //verficamos que los campos no esten vacios y sean del tipo requerido
      if( nombre && typeof nombre === 'string' &&
        apellido && typeof apellido === 'string' &&
        email && typeof email === 'string' &&
        tel && typeof tel === 'string' 
      )
      {
        //creamos el modelo con la info del formulario
        const persona =Person(req.body)
            

        //guardamos en bd
        const response= await database.collection('person').insertOne(persona);
        if(response == false){
          res.status(500).send("operacion fallida, error servidor");
          
        }
        res.status(200).send(persona);
      }else{
        res.status(400).send("Parametros incompletos o invalidos");
      }
        
        
        

      }catch(err){
        console.log(err);
        return res.status(500).send("operacion fallida, error servidor");
      }
      
          
  
})


router.get('/pagination', async (req,res)=>{
  //obtenemos personas de acuerdo a la pagina y cantidad

  try{
    
    if(req.query.page == undefined || req.query.pageSize == undefined ){
      return res.status(400).send("undefined request params");
    }
    
    const page= parseInt(req.query.page);
    const pageSize= parseInt(req.query.pageSize);

    

    //calculamos el inicio  para la paquina requerida
    const startIndex = (page - 1) * pageSize;

    //agrego limit and skip 
    const persons=  await database.collection('person').find({}).skip(startIndex).limit(pageSize).toArray();

    const totalPersons=  await database.collection('person').countDocuments(); 
      
    //Calculate the total number of pages
      const totalPages = Math.ceil(totalPersons / pageSize); 


    res.json({persons: persons, totalPages});
    

  }catch(err){
    console.log(err);
    return res.status(500).send("Error servidor");
  }      

})
router.delete("/all", async (req,res)=>{
  try {
    await database.collection('person').deleteMany({});
    res.status(200).send("datos eliminados");
  } catch (errors) {
    console.log(errors);
  }
});

router.delete("/byName", async (req,res)=>{
  try {
    const nombre= req.query.nombre;
    if(nombre == undefined ){
      return res.status(400).send("undefined request params");
    }

    await database.collection('person').deleteOne({"nombre":nombre});
    res.status(200).send("persona eliminada exitosamente");
  } catch (errors) {
    console.log(errors);
  }
});

module.exports= router;