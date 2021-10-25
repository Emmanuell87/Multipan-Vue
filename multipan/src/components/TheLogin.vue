<template>
    <div>
        <div class="d-flex align-items-center flex-column">
            <h2 >Iniciar Sesión</h2>
            <p>¿Eres nuevo en este sitio? <router-link to="/signup" style="color:#673AB7">Registrate</router-link></p>
        </div>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <b-alert
              :show="dismissCountDown"
              dismissible
              :variant="mensaje.color"
              @dismissed="dismissCountDown=0"
              @dismiss-count-down="countDownChanged"
            >
                <span>{{mensaje.texto}}</span>
            </b-alert>

            <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>
            <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
            ></v-text-field>
            <v-checkbox
                v-model="recuerdame"
                :label="`Recuerdame`"
            ></v-checkbox>

            <v-btn
            block
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="ingresar"
            >
                Ingresar
            </v-btn>

            <v-btn
            block
            plain
            color="error"
            class="mr-4"
            @click="reset"
            >
                Reset Form
            </v-btn>

            
        </v-form>
    </div>  
</template>


<script>

  export default {
      
    name : 'TheLogin',
    data: () => ({
        //Data b-alert
      mensaje: {color: 'success', texto: ''},
      dismissSecs: 5,
      dismissCountDown: 0,

      valid: true,
      password: '',
      email: '',
      show1: false,
      recuerdame: false,

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
      },
    }),

    methods: {
      ingresar () {
        this.$refs.form.validate(); // validate que los datos esten correctos respecto a las reglas 
        // Va a realizar una peticion axios. Peticion http  a nuestro backend
        this.axios.post('/Keys/login', {// se envia dos parametros
            email : this.email,
            password : this.password
        })
        .then(respuesta => {
            return respuesta.data
        })
        .then(data => {
            localStorage.setItem('token', data.tokenReturn); // Almacenamos el token en el local storage
            if(this.recuerdame){ // Si el usuario activa checkbox "recuerdame" se agregara un nuevo item en el localStorage para no borrar el token al salir
                localStorage.setItem('recuerdame', 'true');
            }
            this.$router.push({name: 'Home'}) // Agregamos o lo enviamos a la vista del Admin
        })
        .catch(err => {//Hacemos un manejo de los errores, solamente imprimiendo en la consola
            if(err.response.status==401){
                this.mensaje.color="danger";
                this.mensaje.texto = "Contraseña incorrecta"
                this.showAlert();
                // console.log(err.response.data.message)
            }else if(err.response.status==404){
                this.mensaje.color="warning";
                this.mensaje.texto = "El correo no está registrado"
                this.showAlert();
                // console.log(err.response.data.message)
            }else{// En caso de error 500
                // this.mensaje = "Ocurrio un error interno"
                this.mensaje.color="danger";
                this.mensaje.texto='Ocurrio un error interno';
                this.showAlert();

            }
        })
      },
      reset () {
        this.$refs.form.reset()
      },


      countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown
      },
      showAlert() {
          this.dismissCountDown = this.dismissSecs
          
      }
      
    },
  }
</script>