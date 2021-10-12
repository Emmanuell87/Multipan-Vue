<template>
    <div>
        <div class= "login-box">
            <img class="avatar" src="@/assets/logo.jpg" alt="Logo de MULTIPAN">
            <h2>Iniciar sesión</h2>
            <form @submit.prevent="buscarUsuario">
                <!--Recordar contraseña-->
                <h2>¿Eres nuevo en este sitio? <router-link to="/signup">Registrate</router-link></h2>
                

                <!--Username-->
                <label for="Email">Email</label>
                <input id="Email" type="text" placeholder="ejemplo@email.com" v-model="form.email">

                <!--Password-->
                <label for="password">Contraseña</label>
                <div class="recuerdame">
                    <input id="password" class="password_input" :type="type? 'text': 'password'" placeholder="Contraseña" v-model="form.password">
                    <input type="checkbox" class="ver-password_checkbox" value="ver_password" v-model="type"> <label for="ver_password">Ver contraseña</label>
                </div>
                <!-- Recordar usuario -->
                <div class="recuerdame">
                    <input type="checkbox" class="recuerdame_checkbox" value="recuerdame" v-model="recuerdame"> <label for="recuerdame">Recuerdame</label>
                </div>
                <!-- Mostrar alerta para interaccion con usuario -->
                <b-alert
                    :show="dismissCountDown"
                    dismissible
                    :variant="mensaje.color"
                    @dismissed="dismissCountDown=0"
                    @dismiss-count-down="countDownChanged"
                >
                    {{mensaje.texto}}
                </b-alert>

                <!--Enlaces-->
                <input id="ingresar" type="submit" value="Ingresar" >
                <a href="#">¡Olvidaste la contraseña?</a><br>
            </form>
            
        </div>
  </div>
</template>


<script>
export default {
    name: 'Login',
    data(){
        return{
        form:{
            email: '',
            password: ''
        },
        show: true,
        users: [],
        type: '',
        recuerdame: null,
        mensaje: {color: 'success', texto: ''},
        dismissSecs: 5,
        dismissCountDown: 0,
    }
    },
    methods: {
        buscarUsuario(){
            console.log("Se ejecuta la función Buscar");
            this.axios.get('/keys') .then( res => {

                
                this.users = res.data;
                // console.log(this.form)
                // console.log(this.type)
                var emailExiste = 'No existe'
                this.users.forEach((value, index) => {

                    // console.log(value.email);
                    // console.log(value.password);
                    // console.log(this.form.email === value.email)
                    
                    if(this.form.email && this.form.password){
                        if(this.form.email === value.email){
                            emailExiste = 'existe'
                            console.log("email si existe");
                            if(this.form.password === value.password){

                                console.log("Contraseña Correcta");

                                if(this.recuerdame){
                                    // window.localStorage.setItem({email: `${this.form.email}`, password: `${this.form.password}`});
                                    localStorage.setItem("userkey", JSON.stringify(this.form ) );
                                }

                                // this.$router.push({path: '/'});

                            }else{
                                this.mensaje.color="danger";
                                this.mensaje.texto="Contraseña Incorrecta";
                                this.showAlert();
                            }

                        }
                    }else{
                        emailExiste = false;
                        this.mensaje.color="danger";
                        this.mensaje.texto="Por favor rellene todos los datos";
                        this.showAlert();
                }

            

                });
                //{el email no exista, el email existe, el email no exista(no se puso nada)}
                if(emailExiste==='No existe'){
                        // console.log(emailExiste)
                        this.mensaje.color="danger";
                        this.mensaje.texto="El correo no está registrado";
                        this.showAlert();
                }

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
        let userKey = JSON.parse(localStorage.getItem("userkey"));
        // console.log(userKey)

        if(userKey !== null){
            this.form = userKey;
        }
    }
}
</script>

<style scoped>
body{
    margin: 0;
    padding: 0;
    background-color: white;
    font-family: yellosun;
}

.login-box{
    width: 520px;
    height: 420px;
    background-color: white;
    color: black;
    top: 45%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 70px 30px;
}

.login-box .avatar{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    top: -50px;
    left: calc(50% - 50px);
}

.login-box h1{
    margin: 0;
    padding: 0 0;
    text-align: center;
    font-size: 22px;
}

.login-box h2{
    margin: 0;
    padding: 0 0 20px;
    text-align: center;
    font-size: 15px;
    font-family: letters for learners;
}

.login-box label{
    margin: 0;
    padding: 0;
    font-weight: bold;
    display: block;
    font-family: letters for learners
}

.login-box input{
    width: 100%;
    margin-bottom: 20px;
}

.login-box input[type="text"],
.login-box input[type="password"]{
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    color: #000;
    font-size: 16px;
}

.login-box input[type="submit"]{
    border: none;
    outline: none;
    height: 40px;
    background: #C45D1B;
    color: white;
    font-size: 18px;
}

.login-box a{
    margin: 0;
    text-decoration: none;
    font-size: 15px;
    line-height: 20px;
    color: #C45D1B;
    font-family: letters for learners;
}

.login-box a:hover{
    color: #813d12;
}

.recuerdame{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
}

.recuerdame_checkbox{
    width: 13px !important;
    height: 13px !important;
    margin-bottom: 0px !important;
    margin-right: 5px !important;
}

.password_input{
    width: 70% !important;
}

.ver-password_checkbox{
    width: 13px !important;
    height: 13px !important;
    margin-bottom: 0px !important;
    margin-left: 5px !important;
    margin-right: 5px !important;
}

.fullName-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.password-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


@media screen and (max-width: 600px){

    label, input, p, a{
        font-size: 8px !important;
    }
    h2{
        font-size: 11px !important;
    }
    .login-box{
        width: 100%;
    }

    .fullName-container {
        flex-direction: column;
    }

    .password-container {
        flex-direction: column;
    }
}
</style>