import Vue from 'vue'
import VueRouter from 'vue-router'
import decode from 'jwt-decode'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children : [
      { // /admin/usuarios
        path : 'usuarios',
        name : 'Usuarios',
        meta : {
          Root: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/UsuariosDT.vue')
      },
      { // /admin/categoria
        path : 'categorias',
        name : 'Categorias',
        meta : {
          Administrador : true
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/CategoriasDT.vue')
      },
      { // /admin/articulos
        path : 'articulos',
        name : 'Articulos',
        meta : {
          Administrador : true
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/ArticulosDT.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import(/* webpackChunkName: "login" */ '../views/Signup.vue')
      },
      {
        path: '/productos',
        name: 'Productos',
        component: () => import(/* webpackChunkName: "admin" */ '../views/Productos.vue'),
        
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//De acuerdo al ciclo de vida, nos va a permitir que antes de cada ruta revise si tiene un tema de autentificacion
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.Administrador)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let token = localStorage.getItem('token')// Revisar si el local storage tiene el token
    if (!token) { //Preguntamos si no existe el token
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      // si requiere administrador
      let auxRol = decode(token); // Decodifico el token
      let rolToken = auxRol["rol"]; // de todo el token decodificado, obtengo el rol
      if(rolToken === 'Administrador' || rolToken === 'root'){// Ademas si el rol es administrador
        next()
      }else{
        next({
          name : 'Home'
        })
      }
    }
  } else {
    next() // make sure to always call next()!
  }
  if (to.matched.some(record => record.meta.Root)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let token = localStorage.getItem('token')// Revisar si el local storage tiene el token
    if (!token) { //Preguntamos si no existe el token
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      // si requiere administrador
      let auxRol = decode(token); // Decodifico el token
      let rolToken = auxRol["rol"]; // de todo el token decodificado, obtengo el rol
      if(rolToken === 'root'){// Ademas si el rol es administrador
        next()
      }else{
        next({
          name : 'Home'
        })
      }
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
