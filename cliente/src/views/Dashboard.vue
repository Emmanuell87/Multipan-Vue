<template>
    <div class="container-fluid">
            <div class="row h-400">
                <div class="col-2 px-0 " id="menu">
                    <nav id="nav-dashboard" class="pt-5 sticky-top" style="height: calc(100vh)">
                        
                        <ul>
                            <li><router-link to="/">&lt; Menu principal</router-link></li>
                            <li><button type="submit" id="menu-productos" @click="cambiarVista('Productos')">Productos</button></li>
                            <li><button type="submit" id="menu-inventario" @click="cambiarVista('Inventario')">Inventario</button></li>
                            <li><button type="submit" id="menu-categorias" @click="cambiarVista('Categorias')">Categorias</button></li>
                        </ul>
                    </nav>
                </div>
                <div class="col-10 p-3" id="categorias">
                    <DashboardProductos v-if="dashboard_activo=='Productos'"/>
                    <DashboardInventario  v-else-if="dashboard_activo=='Inventario'"/>
                    <DashboardCategorias  v-else-if="dashboard_activo=='Categorias'"/>
                </div>
            </div>
    </div>
</template>

<script>
import DashboardProductos from '@/components/DashboardProductos.vue'
import DashboardCategorias from '@/components/DashboardCategorias.vue'
import DashboardInventario from '@/components/DashboardInventario.vue'
export default {
    components: {
        DashboardProductos,
        DashboardCategorias,
        DashboardInventario,
    },
    data(){
        return {
            dashboard_activo: 'Productos'
        }
    },
    methods: {
        cambiarVista(data){
            this.dashboard_activo = data
        }
    }
}
</script>

<style scoped>
#menu {
  /* min-height: 100vh; */
  background-color: #3d3d3d;
  color: white;
  
}

button{
    background-color: #3d3d3d;
    border: 0px;
    color: white;
    width: 100%;
    display: flex;
    justify-content: flex-start;
}

button:hover{
    background-color: rgba(255, 255, 255, 0.315);
}


#nav-dashboard > ul{
  list-style: none;
}


#nav-dashboard > ul > li > a{
  text-decoration: none;
  color: white;
}

#nav-dashboard > ul {
    padding-left: 0px;
}

#nav-dashboard > ul > li{
    display: flex;
    justify-content: flex-start;
    padding-left: 10px;
}

#nav-dashboard > ul > li:hover{
  background-color: rgba(255, 255, 255, 0.315);
}

#categorias{
  background-color: rgb(242, 251, 251);
}



@media screen and (max-width: 1280px){

    button, a{
        font-size: 7px;
    }

}

</style>