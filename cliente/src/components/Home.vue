<template>
  <div >
    <div>
        <header tabindex= "-1" class="inicio">
                    
            <img class="inicio__logo" width="200" height="200" src="@/assets/principal/Logo.jpeg" alt="No se encuentra la imagen">
            <div class = "Login">
            </div>
            <section id="Menu-home" class="home">
            <h4 class="slogan-1"></h4>
                <nav class="home-menu-inicio">
                    
                  
                </nav>
            
            </section>

        </header>

        
        <main>
            <h2 class="Titulo-1">Prueba la Magia en Multipan</h2>
            <h4 class="slogan-1">Queremos llegar más lejos</h4>
            
            <section id="Vista-principal" class="productos-iniciales">
                <div class="contenedor1">
                    <img class="productos-iniciales__p1" width="800" height="400" src="@/assets/principal/Postre1.jpg" alt="Postre1">
                </div>
                <h2 class="Titulo-2">Nuestras delicias</h2>
                <h3 class="slogan-1">Pruébalos todos</h3>
            </section>
    
            
        
            <section id="Delicias-1" class="productos-delicias-1">
            <h3></h3>
                
                    
                    <div class="productos-delicias-1__pieza1">
                        <div class="contenedor1">
                            <img src="@/assets/principal/Pan-fresco.jpg" alt="Pan fresco">
                            <div class="centrado"><h3>Panes frescos</h3></div>                
                        </div>
                    </div>    
                        
                
                    <div class="productos-delicias-1__pieza2">
                        <div class="contenedor2">
                            <img src="@/assets/principal/Pastel-horneado.jpg" alt="Pasteles-horneados"/>
                            <div class="centrado"><h3>Pasteles recien horneados</h3></div>                
                        </div>
                    </div>
            </section>

            <section class="">
            <h2 class="Titulo-2">Y mucho más!</h2>
            <h4 class="slogan-2">Horario de Apertura</h4>
            <h4 class="slogan-1">Ven a visitarnos</h4>
            <h4 class="slogan-1">De lunes a viernes de 7:00 a. m. a 7:00 p. m.</h4>
            <h4 class="slogan-1">Sábados y domingos de 8:00 a. m. a 7:00 p. m.</h4>
            </section>
            
            
            <section id="Contacto-empresa" class="Pie-1">
            <h4 class="slogan-1">-</h4>
                <div class= "Contenedor-contacto">
                    <div class= "Contacto">
                        <h2 class= "Contacto__titulo">Contáctanos</h2>                
                        <p class= "Contacto__texto">Bogotá - 6019999999 - infobta@multipan.com.co</p>
                        <p class= "Contacto__texto">Cali - 6029999999 - infocali@multipan.com.co</p>
                        <p class= "Contacto__texto">Medellín - 6039999999 - infomed@multipan.com.co</p>
                        <p class= "Contacto__texto">Barranquilla - 6029999999 - infoquilla@multipan.com.co</p>
                    </div>
                </div>

                <div class="Contenedor-imagen">
                    <div class= "Contacto-imagen">
                        <img class= "Contacto-imagen__img" height="300" width="700"  src="@/assets/principal/Pan_Dulce.jpg" alt="No se encuentra la imagen">
                    </div>
                </div>
            </section>

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
  </div>
</template>

<script>
import {onMounted} from "vue";

export default {
  name: 'Home',
  setup(){
    onMounted(() =>{
      console.log("Hola Mundo");
    })
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: brown;
}


</style>
