<template>
  <div>
    <Login />
    
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  components: {
    Login
  },
  data(){
      return {
          
          keys:[]

      }
  },
  created(){

      this.obtenerKeys();

  },
  methods: {
        obtenerKeys(){
            
            this.axios.get('/keys')
            .then(res=>{
                // console.log(res.data);
                this.keys=res.data;
            })
            .catch(e=>{

                console.log(e.response)

            })
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