<template>
  <div class="">
      
    <v-card
    class="mx-auto overflow-hidden"
    style="height: calc(100vh)"
  >
    <v-app-bar
      color="deep-purple"
      dark
    >
    
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="px-12">Gestor de Administración</v-toolbar-title>

      <v-spacer></v-spacer>
      <div v-if="!['Login'].includes($route.name)">
            <v-btn
            text
            @click="cerrarSesion"
            v-if="login"
            >
            <span class="mr-2">Salir</span>
            <v-icon large>mdi-logout</v-icon>
            </v-btn>

            <v-btn
            text
            @click="iniciarSesion"
            v-else
            >
            <span class="mr-2">Iniciar Sesion</span>
            <v-icon large>mdi-login-variant</v-icon>
            </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list v-if="login "> 
            
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{dataUser.name}} {{dataUser.apellidos}}
              </v-list-item-title>
              <v-list-item-subtitle>{{dataUser.email}}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="rol">{{dataUser.rol}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item exact to="/">
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item exact :to="{name : 'Productos'}">
            <v-list-item-icon>
              <v-icon>mdi-basket-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Productos</v-list-item-title>
          </v-list-item>

          <v-list-item exact :to="{name : 'Articulos'}" v-if="['root', 'Administrador'].includes(rol)">
            <v-list-item-icon>
              <v-icon>mdi-basket</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Articulos</v-list-item-title>
          </v-list-item>

          <v-list-item exact :to="{name : 'Categorias'}" v-if="['root', 'Administrador'].includes(rol)">
            <v-list-item-icon>
              <v-icon>mdi-sitemap</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Categorias</v-list-item-title>
          </v-list-item>

          <v-list-item exact :to="{name : 'Usuarios'}" v-if="rol=='root'">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>

      
    
      <v-sheet
      id="scrolling-techniques-8"
      elevation="24"
      class="overflow-y-auto mx-0"
    style="height: calc(95vh)"
    >
      <v-container style="height: 700px; " class="">
        <v-main>
            <router-view v-if="!['Home'].includes($route.name)"/>
            <HelloWorld v-else/>
        </v-main>
      </v-container>
    </v-sheet>
    

  </v-card>
  </div>
</template>

<script>
import decode from "jwt-decode"
  import HelloWorld from '../components/HelloWorld'

export default {
    name: 'TheNavigation',
    
    components: {
      HelloWorld
    },
    data: () => ({
      drawer: false,
      group: null,
      dataUser: {email: '', apellidos:'', name: '', rol: ''},
      login: false,
      rol: false
      // loginActiva: false
    }),
    computed: {

        
    },
    methods: {
        getDataUser(){
            var token =localStorage.getItem('token');
            if(token){
                var tokenDecode = decode(token);
                this.dataUser = tokenDecode
            }else{
                this.login = false
            }
        },

        isLogin(){
            var token =localStorage.getItem('token');
            if(token){
                var tokenDecode = decode(token);
                this.login = tokenDecode ? true: false
            }else{
                this.login = false
            }
        },
        getRol(){
            var token = localStorage.getItem('token');
            if(token){
                var tokenDecode = decode(token);
                if(tokenDecode.rol=='Administrador'){
                  this.rol = 'Administrador'
                }else if(tokenDecode.rol=='root'){
                  this.rol = 'root'
                }
                // this.admin = tokenDecode.rol === 'Administrador' ? true: false
            }else{
                this.rol = false
            }
        },

        iniciarSesion(){
            this.isLogin();
            this.getDataUser();
            this.getRol();
            this.$router.push({name: 'Login'})
        },

        cerrarSesion(){//Elimina el token del localstorage y lo empuja a una vista diferente

            localStorage.removeItem('token');
            localStorage.removeItem('recuerdame');
            this.$router.push({name: 'Login'})
        }
    },

    created(){
        this.isLogin();
        this.getDataUser();
        this.getRol();
    },
    beforeUpdate(){
        this.isLogin();
        this.getDataUser();
        this.getRol();
    }
}
</script>






<style scoped>
#nav {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 20px
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>