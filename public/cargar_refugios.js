

const gridRefugio=  document.querySelector(".container-refugios-grid");

// obtenemos el archivo 

let currentPage= 1
let totalPage= 0;
let pageSize=4;



document.addEventListener('DOMContentLoaded',() =>{
    requestRefugios();
        
});

function requestRefugios(){
    
    fetch(`/api/refugios/pagination?page=${currentPage}&pageSize=${pageSize}`).then(
        data => {
            return data.json();
        }).then(datos =>{
            cargarRefugios(datos);
        });
}

function cargarRefugios (datos)  { 

    const{refugios, totalPageResponse}= datos;

    totalPage= totalPageResponse;
    currentPage++;

    refugios.forEach(
        
        (refugio) => {
            const cardRefugio= document.createElement("div"); //creo una tarjeta donde se insertaran los datos

            let img= document.createElement("img");
            img.src= refugio.url;
    
            let refugioContent= document.createElement("div");
            refugioContent.className= "refugio-content";
            
            let enlace= document.createElement("a");

            
          
            enlace.href="/api/refugios/"+refugio.id;
            
            

            let nombre= document.createElement("h3");
            nombre.textContent= refugio.nombre;

            let descripcion= document.createElement("p");
            descripcion.textContent= refugio.descripcion;
    
            let altura= document.createElement("p");
            altura.textContent= "altura: "+refugio.altura;
    
            let dificultad= document.createElement("p");
            dificultad.textContent= "dificultad: "+refugio.dificultad;
    
            
            enlace.appendChild(nombre); //agrego el enlace a la etiqueta a 

            cardRefugio.appendChild(img); 
            
            refugioContent.appendChild(enlace);
            refugioContent.appendChild(descripcion);
            refugioContent.appendChild(altura);
            refugioContent.appendChild(dificultad);
            
            cardRefugio.appendChild(refugioContent);
            gridRefugio.appendChild(cardRefugio);
        } 
        
        
    )

};
    

    

