<script setup>
import { useSucursalStore } from "@/stores/sucursal";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";
import { getAssetURL } from "@/utils/get-asset-url";
import { GoogleMap, Marker } from "vue3-google-map";

const storeSucursal = useSucursalStore();
const storeSearch = useSearchStore();

const sucursales = computed(() => {
    return storeSucursal.sucursales;
});

onMounted(() => {
    storeSucursal.fetchSucursales();
});
const sucursalABuscador = function (value) {
    storeSearch.sucursal = value;
    storeSearch.searchIs = "TheSearch";
};
setTimeout(() => {
    console.log(sucursales.value);
}, 100);
useHead({
    title: "Sucursales | firefly Car Rental Panamá",
});
</script>
<template>
    <main class="sucursal" id="prompt">
        <ThePrompt />
        <h2>Sucursales</h2>
        <div class="content">
            <article v-for="sucursal in sucursales" :key="sucursal.id">
                <figure>
                    <GoogleMap
                        v-if="sucursal.mapa"
                        api-key="AIzaSyB3lYFwl2_OLMyM71Je6JWd7yOyvv5T0yA"
                        class="mapa"
                        :center="{
                            lat: sucursal.mapa.coordinates[1],
                            lng: sucursal.mapa.coordinates[0],
                        }"
                        :zoom="15"
                    >
                        <Marker
                            :options="{
                                position: {
                                    lat: sucursal.mapa.coordinates[1],
                                    lng: sucursal.mapa.coordinates[0],
                                },
                            }"
                        />
                    </GoogleMap>
                </figure>
                <section>
                    <h3>
                        {{ sucursal.name }}
                    </h3>
                    <p>
                        Telefonos: {{ sucursal.PhoneNumber }} <br />
                        {{ sucursal.telefono_2 }}
                    </p>
                    <p
                        v-if="
                            sucursal.horario_apertura === 0 &&
                            sucursal.horario_apertura_domingo === 0
                        "
                    >
                        Abierto 24 horas
                    </p>
                    <p
                        v-if="
                            sucursal.horario_apertura != 24 &&
                            sucursal.horario_apertura != 0
                        "
                    >
                        Lunes a Viernes: {{ sucursal.horario_apertura }}:00 a
                        {{ sucursal.horario_cierre }}:00
                    </p>
                    <p
                        v-if="
                            sucursal.horario_apertura_sabado > 0 &&
                            sucursal.horario_cierre_sabado != 24
                        "
                    >
                        Sabados: {{ sucursal.horario_apertura_sabado }}:00 a
                        {{ sucursal.horario_cierre_sabado }}:00
                    </p>
                    <p v-if="sucursal.horario_apertura_sabado === 24">
                        Sabados: Cerrados
                    </p>
                    <!-- hacer un if si apertura en cero, es mayor o 24-->
                    <p v-if="sucursal.horario_apertura_domingo === 24">
                        Domingos: Cerrados
                    </p>
                    <p
                        v-if="
                            sucursal.horario_apertura_domingo > 0 &&
                            sucursal.horario_apertura_domingo != 24
                        "
                    >
                        Domingos: {{ sucursal.horario_apertura_domingo }}:00 a
                        {{ sucursal.horario_cierre_domingo }}:00
                    </p>
                </section>

                <aside v-if="sucursal.imagen">
                    <GoogleMap
                        api-key="AIzaSyB3lYFwl2_OLMyM71Je6JWd7yOyvv5T0yA"
                        class="mapa"
                        :center="{
                            lat: sucursal.mapa.coordinates[1],
                            lng: sucursal.mapa.coordinates[0],
                        }"
                        :zoom="15"
                    >
                        <Marker
                            :options="{
                                position: {
                                    lat: sucursal.mapa.coordinates[1],
                                    lng: sucursal.mapa.coordinates[0],
                                },
                            }"
                        />
                    </GoogleMap>
                </aside>
                <div class="btn-container">
                    <NuxtLink to="#prompt" @click="sucursalABuscador(sucursal)">
                        Reservar Aqui
                    </NuxtLink>
                </div>
            </article>
        </div>
    </main>
</template>

<style scoped lang="scss">
.sucursal {
    article {
        background-color: white;
        margin: auto;
        max-width: 422px;
        margin-bottom: 1rem;
        section {
            width: 80%;
            margin: auto;
            padding: 1.5rem 0;
        }
    }
    h2 {
        text-align: center;
        font-weight: 500;
        font-size: 32px;
        padding: 1rem 0;
        line-height: 36px;
        margin-top: 20px;
        margin: 10px;
    }

    h3 {
        font-weight: bold;
        font-size: 18px;
        padding: 3px;
    }
    p {
        font-size: 15px;
        padding: 3px;
    }

    img {
        object-fit: cover;
        width: 100%;
        height: 150px;
        border-radius: 5px;
    }
    .btn-container {
        padding: 1rem 0;
        display: flex;
        margin: auto;
        a {
            padding: 0.5rem;
            width: 80%;
            margin: auto;
            text-transform: uppercase;
            background-color: rgb(196, 89, 187);
            color: #ffffff;
            font-weight: 500;
            text-align: center;
        }
    }
    .content {
        width: 85%;
        margin: auto;
        padding-bottom: 3rem;
    }
}
.mapa {
    width: 100%;
    height: 200px;
}

.sucursales {
    display: flex;
    justify-content: space-evenly;
}

// Desktop
@media screen and (min-width: 768px) {
    .sucursal {
        .content {
            width: 100%;
        }
    }
    div {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    article {
        min-width: 350px;
    }
    section {
        height: 25vh;
    }
}
</style>
