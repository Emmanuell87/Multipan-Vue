<template>
    <div>
        
        <main>
            <div class="main-div">
                <div class="seccion-producto">
                    <div class="navegacion-productos">
                        <h2>Conoce tu producto</h2>
                        <ul class="navegacion">
                            <li><button id="previus" class="navegacion navegacion__buttons button_left">&lt; Previus</button></li>
                            <li><p>|</p></li>
                            <li><button id="next" class="navegacion navegacion__buttons button_right">Next &gt;</button></li>
                        </ul>
                    </div>

                    <div class="visualizacion-producto">
                        <img id="producto__imagen" class="producto__imagen" height="300px" width="400px" src="@/assets/productos/torta_tres_leches.jpg" alt="">
                    </div >

                    <div class="informacion-producto">
                        <div class="datos-producto">
                            <p id="nombre">Torta Tres leches</p>
                            <p id="costo">$30.000,00</p>
                        </div>
                        <div class="informacion_compra">
                            <!-- <div class="precio_container">
                                
                            </div> -->
                            <div class="compra_container">
                                <p style="margin-bottom: 0px;">Cantidad</p>
                                <input type="number" class="cantidad_compra" name="name" required min="1" max="10" value="1">
                                <button class="agregar_carrito">Agregar al carrito</button>
                            </div>
                        </div>
                        
                    </div>

                    <div>
                        <div>
                            <button class="cargar_productos">Cargar más</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </main>

        <footer>
            <div class="Final">
                <p>6019999999</p>
                <img src="@/assets/principal/facebook.png" alt="Vacío">
                <img src="@/assets/principal/Twitter.png" alt="Vacío">
                <img src="@/assets/principal/Linkedin.png" alt="Vacío">
                <p class="Final__fin">&#169; 2021 por Multipan</p>
            </div>             
        </footer>
    </div>
</template>

<script>
export default {
    name: 'PantallaPrincipal'
}
</script>

<style scoped>
.inicio {
    text-align: center;
    width: 100%;
}

nav li { 
    display: inline;
    margin: 0px 15px;
}

nav ul{
    display: inline-block;
    padding:18px;
}

body {
    font-size: 17px;
}

.Log-in {
    display: flex;
    flex-flow: column wrap;
    align-content: flex-end;
    text-align:right;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.Log-in > img {
    image-rendering: optimizeQuality;
    padding-inline-end: 20px;
    /* width: 20px;
    height: 20px; */
}

.elementos-menu__L{
    padding-inline-end: 20px;
}

main {
    /* width: 1480px; */
}

button {
    font-size: 17px;
}

.main-div {
    padding-left: 25%;
    padding-right: 25%;
}

.seccion-producto {

    display: flex;
    flex-direction: column;
    align-items: center;
    
}

.navegacion-productos {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

}

.navegacion-productos li {
    
    display: inline;
}

.navegacion{
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    text-align: right;
    margin-bottom: 0px;
}



.navegacion > li > p {
    margin-bottom: 0px;
    
}

.navegacion > li {
    margin-bottom: 0px;
}

.navegacion__buttons {
    background-color: transparent;
    border: transparent;
}

/* .button_left {
    color: black;
}

.button_right {
    color: gray;
} */

.ruta-producto {
    margin-bottom: 0px;

}

.ruta-producto__final {
    color: #808080;
}







.visualizacion-producto {
    width: 100%;
    display:flex;
    justify-content: center;

}

.producto__imagen {
    width: 100%;
}



.informacion-producto {
    width: 100%;
    height: 150px; 
    display: flex;
    flex-direction: column;

}

.datos-producto {
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.informacion_compra {
    width: 100%;
    height: 75px;
    float: right;
    display: flex;
    justify-content: flex-end;
}

/* .precio_container {
    height: 50%;
    font-size: 17px;
} */

.compra_container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}


.cantidad_compra {
    /* widt */
    width: 40%;
    height: 20px;
    margin-bottom: 10px;
}

.agregar_carrito {
    width: 150px;
    background-color: #C45D1B;
    border: transparent;
    color:white;
}


.cargar_productos {
    width: 100px;
    height: 50px;
    background-color: Transparent;
    border: 2px solid gray;
    margin-top: 10px;
}


.Final {
    text-align: center;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-top: 50px;
}




@media screen and (max-width: 1280px){
    .inicio{
        width: 100%;
    }

    main{
        width: 100%;
    }

}


@media screen and (max-width: 970px) {
    .inicio{
        width: 100%;
    }

    main{
        width: 100%;
    }

    body {
        font-size: 12px;
    }

    p {
        font-size: 12px;
    }

    span {
        font-size: 12px;
    }

    button {
        font-size: 12px;
    }

    .inicio__logo {
        width: 130px;
        height: 130px;
    }

    .cargar_productos {
        height: 40px;
        width: 80px;
    }

    
}

@media screen and (max-width: 800px){
    .main-div {
        padding-left: 10%;
        padding-right: 10%;
    }
}

@media screen and (max-width: 600px) {
    nav ul li{
        text-align: center;
        width: 100px
    }

    nav li a {
        display:block !important;
    }

    .inicio__logo {
        width: 110px;
        height: 110px;
    }

    .main-div {
        padding-left: 0px;
        padding-right: 0px;
    }
    
}

@media screen and (max-width: 400px) {

    body {
        font-size: 9px;
    }
    p {
        font-size: 9px;
    }

    span {
        font-size: 9px;
    }

    button {
        font-size: 9px;
    }  
    
    .informacion_compra{
        justify-content: center;
    }

    .cargar_productos {
        height: 30px;
        width: 60px;
    }

}

</style>