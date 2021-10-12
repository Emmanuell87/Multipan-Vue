<template>
        
        <div class="card text-white bg-dark">
            <div class="d-flex justify-content-center p-2">
                <img :src="member.imagen" alt="Fotografía del equipo" >
            </div>
            <div class="card-body">
                <h3 class="card-title">{{ member.nombre }}</h3>
                <p class="card-text">{{ member.descripcion }}</p>
                <p class="card-text"><span>Rol: </span> {{ member.rol }}</p>
                <p class="card-text"><span>Código: </span> {{ member.codigo }}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
            <pre>
            </pre>
        </div>
    
</template>

<script>
// Estamos recibiendo el objeto miembro por props correctamente pero las pruebas nos siguen saliendo mal
// Al parecer nos estamos olvidando de algo
    export default {
        name: "TeamCard",
        props: ['member']
    }
</script>

<style scoped>

</style>
