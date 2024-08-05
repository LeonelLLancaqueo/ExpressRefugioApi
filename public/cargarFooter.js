const footer= document.querySelector(".nav-footer");



document.addEventListener('DOMContentLoaded',() =>{
    fetch('/footer.json').then(
        data => {
            return data.json()
        }).then(datos =>{
            cargarFooter(datos);
        })
});


function cargarFooter(datos){

    
    datos.forEach(
        
        /*creamos las columnas del footer */
        (columna) => {
            
            // para cada columna creamos un dvi que contendra la informacion
            
            const div_separador= document.createElement("div");
            div_separador.className="ul-nav-footer";

            
            const title_column= document.createElement("h3");
            title_column.textContent= columna.name;

            const ul= document.createElement("ul");

            // agregamos el div que contendra la informacion de cada columna al footer
            footer.appendChild(div_separador); 

            
            //agregamos a cada div su correspondiente informacion 

            div_separador.appendChild(title_column); //titulo de la columna
            div_separador.appendChild(ul); //lista de las filas

            /* agreamos la lista de elementos al ul de la columna */
            columna.enlace.forEach(

                //para cada columna agregamos sus filas 
                (enlace) =>{

                    const li= document.createElement('li');
            
                    li.textContent= enlace;
                    ul.appendChild(li);
                }
            )
            
        }
    )
    
}

