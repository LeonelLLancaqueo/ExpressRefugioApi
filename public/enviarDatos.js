

document.addEventListener('submit', (e)=>{
    e.preventDefault();

    let input_nombre= document.getElementById('post_nombre');
    let input_apellido= document.getElementById('post_apellido');
    let input_email= document.getElementById('post_email');
    let input_telefono= document.getElementById('post_tel');

    console.log(input_nombre);

let persona={
    nombre: input_nombre.value,
    apellido: input_apellido.value,
    email: input_email.value,
    tel: input_telefono.value,
}
    postPersona(persona);
});



async function postPersona(persona){
    try {
        await fetch("/personas",{
        method: "POST",
        body: JSON.stringify(persona),
        headers:{
            "Content-Type": "application/json; charset=UTF-8"
            }
       }).then(response =>{
            return response.json();
       }).then(personaJson =>{


            const table= document.getElementById("table_person")
            
            let tr= document.createElement('tr');

            let td_nombre= document.createElement('td');
            td_nombre.textContent= personaJson.nombre;
            
            let td_apellido= document.createElement('td');
            td_apellido.textContent= personaJson.apellido;
            
            let td_email= document.createElement('td');
            td_email.textContent= personaJson.email;
            
            let td_tel= document.createElement('td');
            td_tel.textContent= personaJson.tel;

            tr.appendChild(td_nombre);
            tr.appendChild(td_apellido);
            tr.appendChild(td_email);
            tr.appendChild(td_tel);
            table.appendChild(tr);

       })
    } catch (error) {
        console.log(error)
    }
}
