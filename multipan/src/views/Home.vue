<template>
  <div class="">
      <HelloWorld/>
  
  </div>
</template>


<script>

import decode from "jwt-decode"
  import HelloWorld from '../components/TheNavigation'

  export default {
    name: 'Home',

    components: {
      HelloWorld
    },
    data: () => ({
      drawer: false,
      group: null,
      // loginActiva: false
    }),
    computed: {
      isLogin(){
            var token =localStorage.getItem('token');
            if(token){
              var tokenDecode = decode(token);
              return tokenDecode ? true: false
            }
        },
      isAdmin(){
            var token = localStorage.getItem('token');
            if(token){
              var tokenDecode = decode(token);
              return tokenDecode.rol === 'Administrador' ? true: false
            }
        }
    },
    methods: {
        iniciarSesion(){
          this.$router.push({name: 'Login'})
        },

        cerrarSesion(){//Elimina el token del localstorage y lo empuja a una vista diferente
            localStorage.removeItem('token');
            this.$router.push({name: 'Login'})
        }
    }
  }
</script>




















