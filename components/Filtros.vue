<script setup> 
import { useFiltroStore } from '@/stores/filtros' 
import { useAutosStore } from '@/stores/autos'
 
const storeAutos = useAutosStore()

const storeFiltro = useFiltroStore()

const opciones = computed(() => {
    return storeFiltro.opciones
}) 
 onMounted(() => {
    //  storeFiltro.fetchMarcas(); 
 })

</script>

<template> 
    <fieldset class="filtros"> 
        <p>
            <label for="marca">Marca</label>
            <select  name="marca"  v-model="storeFiltro.filtros.marca"> 
                <option value="">Todas </option>
                <option v-for="option in opciones.marca" :key="option" :value="option">
                    {{ option }}
                </option> 
            </select>   
        </p> 
        <!-- <p>
            <label for="precio">Precio </label>
            <select  name="precio"  v-model="storeFiltro.filtros.precio">  
                <option value="price">Menor a Mayor</option>
                <option value="-price">Mayor a Menor</option>  
            </select>  
        </p> -->
        <p>
            <label for="ciudad">Categoria</label>
            <select  name="ciudad"  v-model="storeFiltro.filtros.tipo" > 
                <option value="">Todas </option>
                <option v-for="option in opciones.tipo" :key="option" :value="option">
                    {{ option  }}
                </option> 
            </select>   
        </p>

        <button v-on:click="storeAutos.fetchAutos()"> Filtrar</button>
    </fieldset> 
</template> 
<style lang="scss"> 
.filtros {
    margin: 10px; 
    display: flex;
    justify-content: space-around; 
    button {
        text-transform: uppercase; 
        padding-top: 12px;
        padding-left: 25px;
        padding-right: 25px;
        padding-bottom: 12px;
        background-color: rgb(196, 89, 187);
        border-radius: 15px;
        transform: scale(1);
        box-shadow: 0 4px 18px 0 rgba(146, 84, 143, 0.678);
        color: #ffffff;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
    }
} 

</style>