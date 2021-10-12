<template>
    <div>
        <h2 id="titulo"> Productos </h2>
        <div class="card px-2 mt-4 ">
            <div class="row d-flex align-items-center justify-content-around text-center py-4" id='filtros-productos'>
                <div class="col-2">
                    <input type="checkbox" class="selecionar-todo">
                    <span>Eligir todo</span>
                </div>
                <div class="col-5">
                    <span>Categorías</span>
                    <select name="select" class="custom-select">
                    <option value="#" selected>Todos los productos</option>
                    </select>
                </div>
                <div class="col-3">
                    <span>Filtrar según</span>
                    <select name="select" class="custom-select">
                    <option value="#" selected>Todos</option>
                    </select>
                </div>
                <div class="col-2">
                    <input type="search" class="w-75" id="buscar-producto">
                </div>
            </div>

            

            <form >
                <div v-if="agregar_producto">
                    <h3>Agregar un nuevo producto</h3>

                    <input type="file" accept="image/png, image/jpeg" class="my-2" >
                    <input type="text" class="form-control my-m2 mb-2" placeholder="Nombre" v-model='producto.nombre'>
                    <input type="text" class="form-control my-m2 mb-2" placeholder="Tipo" v-model='producto.tipo'>
                    <input type="number" class="form-control my-m2 mb-2" placeholder="Precio" v-model='producto.precio'>

                    <b-button @click.prevent="cancelarAgregarProducto()"  class="btn-danger my-2 mx-2" type="submit">Cancelar</b-button>
                    <b-button @click.prevent="agregarProducto()"  class="btn-warning my-2 mx-2" type="submit">Agregar</b-button>
                </div>
                
                <b-button @click.prevent="activarAgregarProducto()"  class="btn-success my-2" type="submit" v-else>Nuevo Producto</b-button>
                
            </form>

            <b-alert
                :show="dismissCountDown"
                dismissible
                :variant="mensaje.color"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged"
            >
                {{mensaje.texto}}
            </b-alert>

            <table class="mt-4">
                <thead>
                    <tr>
                        <th></th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>ID</th>
                        <th>Precio</th>
                        <th>Inventario</th>
                        <th></th>
                    </tr>
                </thead>
                <!-- <tr> -->
                <tr v-for="(producto, index) in productos" :key="index" class="column ">
                    <td class="col-checkbox">
                    <input type="checkbox" class="selecionar-todo">
                    </td>
                    <td class='col-img'>
                    <img src="@/assets/dashboard/generica.jpeg" alt="producto1" class="rounded-circle">
                    </td>
                    <td class="col-nombre">
                        <div>
                            <p v-if="producto.modo_edicion">
                                <input type="text" class="form-control my-m2 input-table" placeholder="Nombre" v-model='producto.nombre' >
                            </p>
                            <p v-else>{{producto.nombre}}</p>
                        </div>
                    </td>
                    <td class="col-tipo">
                        <div>
                            <p v-if="producto.modo_edicion">
                                <input type="text" class="form-control my-m2 input-table" placeholder="Tipo" v-model='producto.tipo'>
                            </p>
                            <p v-else>{{producto.tipo}}</p>
                        </div>
                    </td>
                    <td class="col-id">
                        <div>
                            <p>{{producto.id}}</p> 
                        </div>
                    </td>
                    <td>
                    <div class="col-precio">
                        <p v-if="producto.modo_edicion">
                            <input type="number" class="form-control my-m2 input-table" placeholder="Precio" v-model='producto.precio'>
                        </p>
                        <p v-else>{{producto.precio}}</p>
                    </div>
                    </td>
                    <td>
                        <div>
                            <p class="col-inventario2" v-if="producto.modo_edicion">
                                <select v-model="producto.inventario">
                                    <option v-for="(option, index) in options" :key="index" v-bind:value="option.value">
                                        {{ option.text }}
                                    </option>
                                </select>
                            </p>
                            <div v-else>
                                <p class="col-inventario" v-if="producto.inventario">Disponible</p>
                                <p class="col-inventario" v-else>Agotado</p>
                            </div> 
                        </div>
                    </td>
                    <td class="col-select">
                        <div v-if="!producto.modo_edicion">
                            <!-- <b-button id="popover-reactive-1" class="pl-3 pr-1">...</b-button>
                            <b-popover
                                target="popover-reactive-1"
                                triggers="click"
                                :show.sync="popoverShow"
                                placement="auto"
                                container="my-container"
                                ref="popover"
                                >   
                                <div>                                                
                                    <div>
                                        <b-button size="sm" class="w-100 mb-2" variant="warning">Editar</b-button>
                                    </div>
                                    <div>
                                        <b-button size="sm" class="w-100" variant="danger">Eliminar</b-button>
                                    </div>                                                
                                </div>
                            </b-popover> -->
                            <b-dropdown id="dropdown-dropleft"   dropleft text="..." variant="secondary" size="sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                            
                                <b-dropdown-item-button href="#" 
                                    variant="info"
                                    @click="duplicarProducto(index)" 
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                        <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                    </svg> Duplicar
                                </b-dropdown-item-button> 
                                
                                
                                <b-dropdown-item-button href="#" 
                                    variant="warning"
                                    @click="estadoEdicion(index)"
                                >
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                    </svg> Editar
                                    
                                </b-dropdown-item-button> 

                            

                                <b-dropdown-item-button href="#" 
                                    variant="danger" 
                                    @click="eliminarProducto(producto._id)" 
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg> Eliminar
                                </b-dropdown-item-button>
                            </b-dropdown> 
                        </div>
                        <div v-else>
                            <b-button 
                                class="btn-danger my-2 mx-2 " 
                                style="border-radius: 50%;" 
                                type="submit"
                                @click="estadoEdicion(index)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </b-button>
                            <b-button 
                                class="btn-warning my-2 "
                                style="border-radius: 50%;"  
                                type="submit"
                                @click="guardarEdicion(index)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                </svg>
                            </b-button>
                        </div>
                    </td>
                    
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {    
    name: 'DashboardProductos',
    // components: {
    //     Popover
    // },
    data() {
        return {
            // keys: "",
            productos: [],
            producto: {imagen:"imagen7.jpeg", nombre:"", tipo:"", id: 7, precio: null , inventario: true, color:{eliminar: false, editar: false}},
            agregar_producto: false,
            mensaje: {color: 'success', texto: ''},
            dismissSecs: 5,
            dismissCountDown: 0,
            options: [
                { text: 'Disponible', value: true },
                { text: 'Agotado', value: false }
            ],
            popoverShow: false
        };
    },
    methods: {
        obtenerProductos(){
            this.axios.get('/productos')
            .then(res =>{
                //this.productos = res.data;
                res.data.forEach(element => {
                    element['modo_edicion'] = false;
                    this.productos.push(element);
                });
            })
            .catch(e =>{
                console.log(e.response)
            })
        },
        activarAgregarProducto(){
            this.agregar_producto = this.agregar_producto ? false: true
        },

        cancelarAgregarProducto(){
            this.agregar_producto = this.agregar_producto ? false: true
        },

        agregarProducto(){
            if(this.producto.imagen!="" && this.producto.nombre!="" && this.producto.tipo!= "" && this.producto.precio!=null ){
                this.producto.id = this.productos.length + 1;
                // console.log(this.producto.id)
                this.axios.post('/nuevo-producto', this.producto)
                .then(res =>{
                    this.productos.push(res.data)
                    this.producto.nombre= "";
                    this.producto.tipo="";
                    this.producto.precio=0;
                    this.mensaje.color="success";
                    this.mensaje.texto="Producto Agregado";
                    this.showAlert();
                })
                .catch(e =>{
                    console.log(e.response)
                }) 
            }else{
                this.mensaje.color="danger";
                this.mensaje.texto="Faltan campos por rellenar";
                this.showAlert();
            }
                   
        },

        duplicarProducto(index){
            this.producto.nombre = this.productos[index].nombre
            this.producto.tipo = this.productos[index].tipo
            this.producto.precio = this.productos[index].precio
            console.log(this.producto)
            this.agregarProducto()
            console.log(this.productos)
        
            
            
        },

        estadoEdicion(index){
            console.log('a')
            this.productos[index].modo_edicion = this.productos[index].modo_edicion ? false : true
        },

        guardarEdicion(i){
            const item = this.productos[i]
            console.log(this.productos[i])
            this.axios.put(`/producto/${item._id}`, item)
            .then(res=>{
                this.productos.findIndex(n=> n._id===res.data._id);
                this.productos[i].modo_edicion = this.productos[i].modo_edicion ? false: true
                this.mensaje.color="success";
                this.mensaje.texto="Producto Editado";
                this.showAlert();
            })
            .catch(e=>{
                console.log(e.response)
            })
        },

        eliminarProducto(id){
            this.axios.delete(`/producto/${id}`)
            .then(res=>{
                const index = this.productos.findIndex(item=> item._id===res.data._id);
                this.productos.splice(index, 1);
                this.mensaje.color="danger";
                this.mensaje.texto="Producto Eliminado";
                this.showAlert();
            })
            .catch(e =>{
                console.log(e.response)
            })
        },

        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        }

    },
    created(){
        this.obtenerProductos();
    },

}
</script>

<style scoped>

/* .bi-pen{
    width: 16px;
    height: 16px;
} a*/

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

img{
  width: 30%;
}

table {
  border-collapse: separate;
  border-spacing: 0 2em;
}


tr{
  font-size: 17px;
  text-align: center;
}

thead{
  background-color: rgb(235, 235, 235);
}

#titulo, .titulo-categoria{
  font-weight: bolder;
}

#menu {
  min-height: 100vh;
  background-color: #3d3d3d;
  color: white;
}

#nav-dashboard > ul{
  list-style: none;
}

#nav-dashboard > ul > li > a{
  text-decoration: none;
  color: white;
}

#nav-dashboard > ul > li:hover{
  background-color: rgba(255, 255, 255, 0.315);
}

#productos{
  background-color: rgb(242, 251, 251);
}



#filtros-productos > div{
  font-size: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.custom-select{
  width: auto;
}

.col-img{
  max-width: 120px;
  height: auto;
}

.dropdown-dropleft{
    padding: 0px !important;
}

@media screen and (max-width: 1280px){

    p, button, th, span {
        font-size: 7px;
    }

    .col-img{
        width: 15%;
    }

    input{
        font-size: 7px;
        height: 12px;
    }

    .input-table{
        width: 70%
    }

    td > div{
        display: flex;
        justify-content: center;
    }

    select {
        font-size: 7px;
    }

    .selecionar-todo{
        width: 7px;
        height: 7px;
    }
}

@media screen and (max-width: 500px){

    p, button, th, span {
        font-size: 5px;
    }

    .col-img{
        width: 15%;
    }

    input{
        font-size: 5px;
    }

    .input-table{
        width: 70%
    }

    select {
        font-size: 5px;
    }

}




</style>