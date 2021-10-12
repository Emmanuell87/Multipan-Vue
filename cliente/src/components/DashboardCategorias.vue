<template>
    <div>
        <div class="row">
                <h2 class="titulo-categoria">Categorías <span>#</span></h2>
                <div class="row d-flex justify-content-around container_card_categoria">
                    <div class="card card-categoria w-25" v-for="(item, index) in cards" :key="index">
                        <div class="card-body"></div>
                        <div class="card-footer">
                            <p>Postres <span>#</span></p>
                        </div>
                    </div>
                    
                    <div class="card w-25 m-0 p-0">
                        <div class="card-body m-0 p-0">
                        <button class="btn btn-light w-100 h-100" >+</button>
                        </div>
                    </div>
                </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashboardCategorias',
    data(){
        return {

        }
    },
    methods: {

    }
}
</script>

<style>


.titulo-categoria{
  font-weight: bolder;
}

.container_card_categoria{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.card-categoria{
    width: 50%;
    height: 250px;
    background: linear-gradient(45deg, rgb(255, 236, 201), rgb(105, 179, 228), rgb(248, 198, 198));
}
</style>