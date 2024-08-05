
document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector("header");


    const nav = document.createElement("nav");
    nav.className = "nav-header";
    const h1 = document.createElement("h1");
    h1.textContent = "Refugios Bariloche";

    const ul = document.createElement("ul");
    const li_inicio = document.createElement("li");
    const li_nosotros = document.createElement("li");
    const li_historia = document.createElement("li");
    const li_contendo = document.createElement("li");
    const li_otro = document.createElement("li");
    const li_inicio_a = document.createElement("a");
    li_inicio_a.textContent = "Inicio";
    const li_nosotros_a = document.createElement("a");
    li_inicio_a.href = "/api";

    li_nosotros_a.textContent = "Nosotros";
    const li_historia_a = document.createElement("a");
    li_historia_a.textContent = "Historia";
    const li_contenido_a = document.createElement("a");
    li_contenido_a.textContent = "Contenido";
    const li_otros_a = document.createElement("a");
    li_otros_a.textContent = "Otros";

    const ul_login = document.createElement("ul");
    const li_sesion = document.createElement("li");
    const li_registrarse = document.createElement("li");
    const li_sesion_a = document.createElement("a");
    li_sesion_a.textContent = "Iniciar Sesion";
    const li_registrarse_a = document.createElement("a");
    li_registrarse_a.textContent = "Registrarse";




    nav.appendChild(h1);
    nav.appendChild(ul);
    nav.appendChild(ul_login);

    ul.appendChild(li_inicio);
    ul.appendChild(li_nosotros);
    ul.appendChild(li_historia);
    ul.appendChild(li_contendo);
    ul.appendChild(li_otro);

    li_inicio.appendChild(li_inicio_a);
    li_contendo.appendChild(li_contenido_a);
    li_historia.appendChild(li_historia_a);
    li_nosotros.appendChild(li_nosotros_a);
    li_otro.appendChild(li_otros_a);

    ul_login.appendChild(li_sesion);
    ul_login.appendChild(li_registrarse);

    li_sesion.appendChild(li_sesion_a);
    li_registrarse.appendChild(li_registrarse_a);

    header.appendChild(nav);

});







