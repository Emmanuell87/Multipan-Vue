<template>
    <div>
        <div class="d-flex align-items-center flex-column">
            <h2 >Registrate</h2>
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
                <span v-if="!login">{{mensaje.texto}}</span>
                    
                    
                <span v-else>{{mensaje.texto}}
                <button v-if="login" style="background-color: #673AB7" @click="cargarLogin">
                    <svg style="width:24px;height:24px;color: white" viewBox="0 0 24 24" >
                        <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                </button>
                </span>
            </b-alert>

            <v-text-field
            v-model="name"
            :rules="nameApellidosRules"
            label="Nombre"
            required
            ></v-text-field>
            <v-text-field
            v-model="apellidos"
            :rules="nameApellidosRules"
            label="Apellidos"
            required
            ></v-text-field>

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
            <v-text-field
                v-model="confirmPassword"
                :rules="[passwordRules.required, passwordRules.min, confirmPasswordRules]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm Password"
                hint="Las contraseñas coinciden"
                counter
                @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn
            block
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="registrarse"
            >
                Registrarse
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
      
    name : 'TheSignup',
    data: () => ({
        //Data b-alert
      mensaje: {color: 'success', texto: ''},
      dismissSecs: 5,
      dismissCountDown: 0,
      login : false,

      valid: true,
      name: '',
      apellidos: '',
      password: '',
      confirmPassword: '',
      email: '',
      show1: false,

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
      },
      nameApellidosRules: [
          value => !!value || 'Required.',
      ]
    }),
    computed: {
        confirmPasswordRules() {
            if(this.confirmPassword==this.password){
                
                return true
            }else{
                return 'Las contraseñas no coinciden'
            }
            // return  !!this.confirmPassword || 'Required.'
            // required: value => !!value || 'Required.',
            // min: v => v.length >= 8 || 'Min 8 characters',
            // equal: w => w === this.password || 'Las contraseñas no coinciden',
            // emailMatch: () => (`The email and password you entered don't match`),
        }
    },
    methods: {
      registrarse () {
        this.$refs.form.validate(); // validate que los datos esten correctos respecto a las reglas 
        // Va a realizar una peticion axios. Peticion http  a nuestro backend
        const item = {name: this.name, apellidos: this.apellidos, email : this.email, password : this.password};
        if(this.name && this.apellidos && this.email && this.password) {
            this.axios.post('/keys/add', item)
            .then(data => {
                this.$router.push({name: 'Login'})
            })
            .catch(err => {
                if(err.response.status==400){
                    
                    if(err.response.data.type == 2){
                        this.login = true
                        this.mensaje.color="warning";
                        this.mensaje.texto = err.response.data.message + ', desea iniciar sesión?';
                    }else{
                        this.login = false
                        this.mensaje.color="danger";
                        this.mensaje.texto = err.response.data.message;
                    }
                    this.showAlert();
                    // console.log(err.response.data.message)
                }
                // else if(err.response.status==404){
                //     this.mensaje.color="warning";
                //     this.mensaje.texto = "El correo no está registrado"
                //     this.showAlert();
                //     // console.log(err.response.data.message)
                // }
                else{// En caso de error 500
                    // this.mensaje = "Ocurrio un error interno"
                    this.login = false
                    this.mensaje.color="danger";
                    this.mensaje.texto='Ocurrio un error interno';
                    this.showAlert();

                }
            })
        }else{
            this.login = false
            this.mensaje.color="danger";
            this.mensaje.texto='No pueden haber campos vacíos';
            this.showAlert();
        }
        
      },
      reset () {
        this.$refs.form.reset()
      },

      cargarLogin(){
            this.$router.push({name: 'Login'})

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