<template>
    <div>
        <div class= "login-box">
            <img class="avatar" src="@/assets/logo.jpg" alt="Logo de MULTIPAN">
            <h1>Registrate</h1>
            <form @submit.prevent="obtenerKeys()">
                <div class="fullName-container">
                    <div>
                        <!--Nombre Usuario-->
                        <label for="Nombre">Nombre</label>
                        <input id="Nombre" type="text" placeholder="Nombre" v-model="user.name">
                    </div>

                    <div>
                        <!--Apellido Usuario-->
                        <label for="Apellidos">Apellidos</label>
                        <input id="Apellidos" type="text" placeholder="Apellidos" v-model="user.apellidos">
                    </div>
                </div>
                <!--Correo-->
                <label for="Email">Email</label>
                <input id="Email" type="text" placeholder="ejemplo@email.com" v-model="user.email">

                <div class="password-container">
                    <div>
                        <!--Password-->
                        <label for="password">Contraseña</label>
                        <input id="password" :type="type? 'text': 'password'" placeholder="Contraseña" v-model="user.password">
                    </div>

                    <div>
                        <!--Confirmar contraseña-->
                        <label for="Confirmación">Confirmación</label>
                        <input id="Confirmación" :type="type? 'text': 'password'" placeholder="Confirmación" v-model="confirmarPassword">
                    </div>
                </div>
                
                <div>
                    <div class="recuerdame">
                        <input type="checkbox" class="ver-password_checkbox" value="ver_password" v-model="type"> <label for="ver_password">Ver contraseña</label>
                    </div>
                    <div class="recuerdame">
                        
                        <input type="checkbox" class="recuerdame_checkbox" value="recuerdame" v-model="recuerdame"> <label for="recuerdame">Recuerdame</label>
                    </div>
                </div>
                <b-alert
                    :show="dismissCountDown"
                    dismissible
                    :variant="mensaje.color"
                    @dismissed="dismissCountDown=0"
                    @dismiss-count-down="countDownChanged"
                >
                    <span v-if="!login">{{mensaje.texto}}</span>
                    
                    
                    <span v-else>{{mensaje.texto}}?
                    <button v-if="login" class="btn-success" @click="cargarLogin">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                        </svg>
                    </button>
                    </span>
                </b-alert>
                <!--Enlaces-->
                <input id="ingresar" type="submit" value="Ingresar">
            </form>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Signup',
    data() {
        return {
            // keys: "",
            user: {email:"", password:"", name:"", apellidos: ""},
            confirmarPassword: "",
            mensaje: {color: 'success', texto: ''},
            dismissSecs: 5,
            dismissCountDown: 0,
            type: '',
            recuerdame:null,
            login: false
        }
    },
    methods: {

        obtenerKeys(){
            // console.log(this.$router.push('/principal'))
            this.axios.get('/keys')
            .then(res=>{
                const keys = res.data;
                const allEmail = []
                for (var i in  keys){
                    //Agregar todos los email a una constante
                    allEmail.push(keys[i].email)
                }

                // Validar si los campos no estan vacios
                if (this.user.email && this.user.password && this.user.name && this.user.apellidos) {
                    // Validar si el email esta en uso 
                    if(allEmail.includes(this.user.email)){
                        console.log('El correo ya está en uso, desea inciar sesion')
                        this.login=true
                        this.mensaje.color="danger";
                        this.mensaje.texto='El correo ya está en uso, desea inciar sesion';
                        this.showAlert();
                    }else if(this.confirmarPassword !== this.user.password){
                        console.log('Las contraseñas son diferentes')
                        this.login = false
                        this.mensaje.color="danger";
                        this.mensaje.texto='Las contraseñas son diferentes';
                        this.showAlert();
                    }
                    else{
                        
                        if(this.recuerdame){
                            console.log(this.recuerdame)
                                // window.localStorage.setItem({email: `${this.form.email}`, password: `${this.form.password}`});
                            localStorage.setItem("userkey", JSON.stringify({email: this.user.email, password: this.user.password} ) );
                        }
                        
                        this.newUser()
                    }
                } else {
                    this.login = false
                    this.mensaje.color="danger";
                    this.mensaje.texto="Por favor rellene todos los datos";
                    this.showAlert();
                }
                
                
            })
            .catch(e=>{

                console.log(e.response)

            })
        },

        newUser(){
            
            this.axios.post('/nueva-key', this.user)
            .then(res=>{
                this.user.push(res.data);
                this.user.email="";
                this.user.password="";
                this.user.name="";
                this.user.apellidos="";
                
            })
            .catch(e=>{

                console.log(e.response);

            })
            this.$router.push({path: '/'});
        },

        cargarLogin(){
            this.$router.push('/login')
        },

        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
            
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
    top: 50%;
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
    margin-right: 5px !important;
}


@media screen and (max-width: 600px){

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