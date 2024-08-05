

const express= require('express')

const router= express.Router(); 

const Refugio = require('../public/models/Refugio');

router.use(express.json());


//db
const database = require('../public/config/iniciarDB');
const { isUtf8 } = require('buffer');

// GET METHOD 





  router.get( "/", async (req,res) =>{
 
    /* DEVOLVEMOS JSON DE REFUGIOS SIN PAGINAICON*/
    try{  
     
      //calculamos el inicio para la paquina requerida
      
      const refugios= await database.collection('refugios_content').find({}).toArray();  
      res.status(201).send(refugios);
    
    }catch(err){
      console.log("Error"+err);  
      return res.status(500).send("Error servidor");
    }
  } 
  );
  router.post('/', async(req,res)=>{

    try{  
    
        const {id, nombre, descripcion, altura, dificultad, url}= req.body;
      
        //verficamos que los campos no esten vacios y sean del tipo requerido
      if( id && typeof id === 'string' &&
        nombre && typeof nombre === 'string' &&
        descripcion && typeof descripcion === 'string' &&
        altura && typeof altura === 'string' &&
        dificultad && typeof dificultad === 'string' && 
        url && typeof url === 'string' 
      )
      {
        //creamos el modelo con la info del formulario
        const refugio =Refugio(req.body)
            

        //guardamos en bd
        const response= await database.collection('refugios_content').insertOne(refugio);
        if(response == false){
          res.status(500).send("operacion fallida, error servidor");
          
        }
        res.status(201).send(response);
      }else{
        res.status(400).send("Parametros incompletos o invalidos");
      }
        
        
        

      }catch(err){
        console.log(err);
        return res.status(500).send("operacion fallida, error servidor");
      }
      
          
  
})


  router.get('/id-name', async (req,res)=>{
    //esta query a la base de datos retorna el id de los refugios y el nombre de los mismos

    try {
      const refugio_id_name= await database.collection('refugios_content').aggregate([{"$project":{"_id":0, "id":1, "nombre":1}}]).toArray(); 
      
      return res.status(200).send(refugio_id_name);
    } catch (error) {
      
    }
  });
  router.get( "/pagination", async (req,res) =>{
 
    /* DEVOLVEMOS JSON DE REFUGIOS CON  PAGINACION*/
    try{  
      
      if(req.query.page == undefined || req.query.pageSize == undefined ){
        return res.status(400).send("undefined request params");
      }

      const page= parseInt(req.query.page);
      const pageSize= parseInt(req.query.pageSize);
     
      //calculamos el inicio para la paquina requerida
      const startIndex = (page - 1) * pageSize;
      
      
      const refugios= await database.collection('refugios_content').find({}).skip(startIndex).limit(pageSize).toArray();  

      
      const totalrefugios= await database.collection('refugios_content').countDocuments();  

        
      //Calculate the total number of pages
        const totalPages = Math.ceil(totalrefugios / pageSize); 

      res.json({refugios: refugios, totalPages});
    
    }catch(err){
      console.log("Error"+err);  
      return res.status(500).send("Error servidor");
    }
  } 
  );
  


  router.get( '/:id', async (req,res) =>{
      
      /* BUSCA EL JSON DE UN REFUGIO EN LA DB Y RENDERIZA ARCHIVO REFUGIO.EJS*/
    try{
      const refugios= await database.collection('refugios_img').findOne({id: req.params.id});

    
      if(refugios  ===  null){
        return res.status(404).send("Refugio no encontrado");
      }


      const persons= await database.collection('person').find({}).toArray(); //preguntar si esta bien esto
      
      //renderizamos pagina refugio y mandamos por parametros las url de las imagenes del refugio
      res.render('refugio', {img : refugios.img, img2: refugios.img2, img3 : refugios.img3, idRefugio: "/refugio/"+refugios.id, 
      personArray: persons})
      
    }catch(err){
      console.log("Error"+err);  
      return res.status(500).send("Error servidor");
    }

  
  });

  router.get( '/content/:id', async (req,res) =>{
      
      /* BUSCA EL JSON DE UN REFUGIO EN LA DB Y LO DEVUELVE COMO RESPUESTA*/
    try{
      const refugio= await database.collection('refugios_content').findOne({id: req.params.id}); 
      
      if(refugio === null){
        return res.status(404).send("Refugio no encontrado");
      }

      return res.status(200).send(refugio); 
    
    }catch(err){
      console.log("Error"+err);  
      return res.status(500).send("Error servidor");
    }

  
  });
  
  router.delete("/all", async (req,res)=>{
    try {
      await database.collection('refugios_content').deleteMany({});
      res.status(200).send("refugios eliminados");
    } catch (errors) {
      console.log(errors);
    }
  });
  
  router.delete("/byId", async (req,res)=>{
    try {
      const id= req.query.id;
      if(id == undefined ){
        return res.status(400).send("undefined request params");
      }
  
      await database.collection('refugios_content').deleteOne({"id":id});
      res.status(200).send("refugio eliminado exitosamente");
    } catch (errors) {
      console.log(errors);
    }
  });
 

module.exports = router