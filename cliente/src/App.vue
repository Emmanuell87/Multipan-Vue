<template>
  
  <div id="app">
    <div id="nav">
      <router-link to="/">Inicio</router-link>   |
      <router-link to="/productos">Productos</router-link>   |
      <router-link to="/login">Login</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/prueba">Dashboard</router-link>
    </div>
    <router-view/>
  </div>

</template>

<script>

import TeamCard from "./components/TeamCard.vue";


export default {
  name: "App",
  components: {
    TeamCard,
    
  },

  data(){
    return {
      title: "Vivo dentro de VUE",
      carousel1 : 'carousel1',
      // Esta es la definición del objeto team, el objeto contiene la info de cada miembro del equipo
      // Se esta enviando correctamente en el ciclo v-for pero las pruebas fallan
      // Al parecer tenemos un problema con la definición de los nombres de los atributos
      team: [
        {
          codigo: 1,
          nombre: "Integrante 1",
          descripcion:
            "1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore omnis, laudantium tempore, provident corporis iure ex libero repellendus accusamus accusantium at voluptate excepturi voluptatem quis, illo modi exercitationem error consequatur.",
          rol: "Desarrollador backend",
          imagen: "https://placeimg.com/192/192/people",
        },
        {
          codigo: 2,
          nombre: "Integrante 2",
          descripcion:
            "2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore omnis, laudantium tempore, provident corporis iure ex libero repellendus accusamus accusantium at voluptate excepturi voluptatem quis, illo modi exercitationem error consequatur.",
          rol: "Desarrollador backend",
          imagen: "https://placeimg.com/192/192/nature",
        },
        {
          codigo: 3,
          nombre: "Integrante 3",
          descripcion:
            "3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore omnis, laudantium tempore, provident corporis iure ex libero repellendus accusamus accusantium at voluptate excepturi voluptatem quis, illo modi exercitationem error consequatur.",
          rol: "Desarrollador backend",
          imagen: "https://placeimg.com/192/192/architecture",
        },
        {
          codigo: 4,
          nombre: "Integrante 4",
          descripcion:
            "4. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore omnis, laudantium tempore, provident corporis iure ex libero repellendus accusamus accusantium at voluptate excepturi voluptatem quis, illo modi exercitationem error consequatur.",
          rol: "Desarrollador backend",
          imagen: "https://placeimg.com/192/192/animals",
        },
        {
          codigo: 5,
          nombre: "Integrante 5",
          descripcion:
            "5. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore omnis, laudantium tempore, provident corporis iure ex libero repellendus accusamus accusantium at voluptate excepturi voluptatem quis, illo modi exercitationem error consequatur.",
          rol: "Desarrollador backend",
          imagen: "https://placeimg.com/192/192/any",
        },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #f77930;
}
</style>
