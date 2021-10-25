<template>
    <div>
        <v-container >
          <b-alert
              :show="dismissCountDown"
              dismissible
              :variant="mensaje.color"
              @dismissed="dismissCountDown=0"
              @dismiss-count-down="countDownChanged"
          >
              <span>{{mensaje.texto}}</span>
          </b-alert>

          
            <v-data-table
                :headers="headers"
                :items="usuarios"
                sort-by="name"
                class="elevation-4"
            >
                <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>
                        <h2>
                            USUARIOS
                        </h2>
                    </v-toolbar-title>
                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog
                    v-model="dialog"
                    max-width="500px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                        >
                        Crear Usuario
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                        <v-container>
                            <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.name"
                                label="Nombre"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.apellidos"
                                label="Apellidos"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.email"
                                label="Email"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.password"
                                label="Password"
                                :rules="[passwordRules.required, passwordRules.min]"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-select
                                    v-model="editedItem.rol"
                                    :items="roles"
                                    label="Rol"
                                    required
                                ></v-select>

                                <!-- <v-text-field
                                v-model="editedItem.rol"
                                label="Rol"
                                ></v-text-field> -->
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-select
                                    v-model="editedItem.estado"
                                    :items="estadoUser"
                                    label="Estado"
                                    required
                                ></v-select>
                            </v-col>
                            </v-row>
                        </v-container>
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="close"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="save"
                        >
                            Guardar
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">¿Está seguro de que desea deshabilitar este usuario?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-toolbar>
                </template>
                <!-- <template v-slot:item.actions="{ item }"> -->
                <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
                </template>
                <template v-slot:no-data>
                <v-btn
                    color="primary"
                    @click="list"
                >
                    Reset
                </v-btn>
                </template>
            </v-data-table>
        </v-container>
  </div>
</template>


<script>
  export default {
    name : 'UsuariosDT',
    data: () => ({
      mensaje: {color: 'success', texto: ''},
      dismissSecs: 5,
      dismissCountDown: 0,

      roles:['Administrador'],
      estadoUser: [true, false],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Apellidos', value: 'apellidos' },
        { text: 'Email', value: 'email' },
        { text: 'Password', value: 'password' },
        { text: 'Rol', value: 'rol' },
        { text: 'Estado', value: 'estado' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
    //   desserts: [],
      usuarios: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        apellidos: 0,
        email: 0,
        password: 0,
        rol: 'Administrador',
        estado: true,
      },
      defaultItem: {
        name: '',
        apellidos: 0,
        email: 0,
        password: 0,
        rol: 'Administrador',
        estado: true,
      },

      passwordRules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Ingresar Usuario' : 'Editar Usuario'

      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.list()
    },

    methods: {
    //   initialize () {
    //     this.desserts = [
    //       {
    //         name: 'Estudiante',
    //         apellidos: 'IMASTER',
    //         email: 'estudiante@gmail.com',
    //         password: '12345678',
    //         rol: 'Administrador',
    //       }
    //     ]
    //   },

      list(){
          this.axios.get('/keys/list')
          .then(response =>{
            
              response.data.forEach(element =>{
                  element.estado = element.estado===1? true: false
                  this.usuarios.push(element)
              })
              
            //   this.usuarios = response.data;
              console.log(response);
            
          })
          .catch(error =>{
              console.log(error);
              return error
          })

      },

      

      editItem (item) {
        this.editedIndex = this.usuarios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.usuarios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        // this.usuarios.splice(this.editedIndex, 1);
        this.usuarios[this.editedIndex].estado = false;

        const item = this.usuarios[this.editedIndex]
        this.axios.put('/keys/disabled', item)
        .then(response =>{
        
            
            console.log(response);
        
        })
        .catch(error =>{
            console.log(error);
            return error
        })

        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          
              

          const item = this.editedItem
          const index = this.editedIndex
          this.axios.put('/keys/update', item)
          .then(response =>{
              this.mensaje.color="success";
              this.mensaje.texto="Usuario actualizado con éxito";
              this.showAlert();
              Object.assign(this.usuarios[index], item);
              console.log(item)
              console.log(response.status);
            
          })
          .catch(error =>{
              this.mensaje.color="danger";
              this.mensaje.texto=error.response.data.message;
              this.showAlert();
              console.log(error);
              return error
          })



        } else {
          
          if(this.validateEmail(this.editedItem.email)){
            this.axios.post('/keys/add', this.editedItem)
            .then(response =>{
                this.mensaje.color="success";
                this.mensaje.texto="Nuevo Usuario creado con éxito";
                this.showAlert();
                response.data.estado = response.data.estado==1 ? true : false;
                this.usuarios.push(response.data)
            })
            .catch(error =>{
              this.mensaje.color="danger";
              this.mensaje.texto=error.response.data.message;
              this.showAlert();
              return error
            })
          }else{
            this.mensaje.color="danger";
            this.mensaje.texto='El formato del correo es incorrecto';
            this.showAlert();
          }
        }
        this.close()
      },

      validateEmail(email) {
          var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return re.test(email)
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