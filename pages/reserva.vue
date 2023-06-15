<script setup>
import { useAutosStore } from "@/stores/autos";
import { storeToRefs } from "pinia";
import { getAssetURL } from "@/utils/get-asset-url";
import { useSearchStore } from "@/stores/search";

definePageMeta({
    middleware: ["check-reservation"],
});

const route = useRoute();

const storeSearch = useSearchStore();
const storeAutos = useAutosStore();

const getAutos = computed(() => {
    return storeAutos.getAutos;
});
const autos = computed(() => {
    return storeAutos.autos;
});
const precioFormat = function (value) {
    if (value) {
        return value.toLocaleString("es-US", {
            style: "currency",
            currency: "USD",
        });
    }
};

const precioPrepago = function (value, descuentoPrepago) {
    if (value) {
        let descuento = descuentoPrepago;
        const descuentoCalculado = value * (descuento / 100);

        const nuevoPrecio = value - descuentoCalculado;
        // // Calculate tax due
        // const impuestoADeber = nuevoSubtotal * (impuesto / 100);
        // // Calculate final price
        // const impuestoSumado = nuevoSubtotal * (1 + (impuesto / 100));
        return nuevoPrecio.toLocaleString("es-US", {
            style: "currency",
            currency: "USD",
        });
    }
};
onMounted(() => {
    storeAutos.fetchAutos();
    storeSearch.searchIs = "TheProgress";
});
function checkBuscar(retiro, retorno, fechaRetiro, fechaRetorno, id) {
    const router = useRouter();

    if (
        retiro === undefined ||
        retorno === undefined ||
        fechaRetiro === undefined ||
        fechaRetorno === undefined
    ) {
        storeSearch.mostrarWarning = true;
        console.log(storeSearch.mostrarWarning);
    } else {
        storeSearch.mostrarWarning = false;
        router.push("/flota/" + "reserva/" + id);
    }
}

useHead({
    title: "Reservas | Firefly Car Rental Panamá",
});
</script>
<template>
    <main class="auto">
        <ThePrompt />

        <Filtros></Filtros>
        <section class="fleet">
            <article v-for="auto in autos" :key="auto.id">
                <!-- <div class="promocion" v-if="auto.status === 'promocion'">
          <img src="@/assets/images/promo.png" alt="Pasajeros" />
        </div> -->
                <section>
                    <header>
                        <figure>
                            <img
                                :src="getAssetURL(auto.imagen)"
                                loading="lazy"
                            />
                        </figure>
                        <div>
                            <h3>{{ auto.marca }} {{ auto.modelo }}</h3>
                            <em>o similar</em>
                        </div>
                    </header>

                    <dl class="specs">
                        <div v-if="auto.pasajeros">
                            <dt>
                                <img
                                    src="@/assets/images/pasajeros.png"
                                    alt="Pasajeros"
                                />
                            </dt>
                            <dd>{{ auto.pasajeros }}</dd>
                        </div>
                        <div v-if="auto.puertas">
                            <dt>
                                <img
                                    src="@/assets/images/doors.png"
                                    alt="Puertas"
                                />
                            </dt>
                            <dd>{{ auto.puertas }}</dd>
                        </div>
                        <div v-if="auto.maletas">
                            <dt>
                                <img
                                    src="@/assets/images/luggage.png"
                                    alt="Maletas"
                                />
                            </dt>
                            <dd>{{ auto.maletas }}</dd>
                        </div>
                        <div v-if="auto.transmision">
                            <dt>
                                <img
                                    src="@/assets/images/transmision.png"
                                    alt="Transmision"
                                />
                            </dt>
                            <dd>{{ auto.transmision }}</dd>
                        </div>
                        <div v-if="auto.motor">
                            <dt>
                                <img
                                    src="@/assets/images/motor.png"
                                    alt="Motor"
                                />
                            </dt>
                            <dd>1200cc</dd>
                        </div>
                        <div v-if="auto.combustible">
                            <dt>
                                <img
                                    src="@/assets/images/fuel.png"
                                    alt="Gasolina"
                                />
                            </dt>
                            <dd>{{ auto.combustible }}</dd>
                        </div>
                        <div>
                            <dt>
                                <img src="@/assets/images/ac.png" alt="ac" />
                            </dt>
                            <dd>A/C</dd>
                        </div>
                    </dl>
                </section>

                <footer
                    class="disponibilidad"
                    v-if="auto.status === 'disponibilidad'"
                >
                    <section>
                        <div>
                            <em>Paga en Sucursal</em>
                            <h4>{{ precioFormat(auto.precio_firefly) }}</h4>
                        </div>
                        <div>
                            <em>Prepago web </em>
                            <h4>
                                {{
                                    precioPrepago(
                                        auto.precio_firefly,
                                        auto.descuento_prepago
                                    )
                                }}
                            </h4>
                        </div>
                    </section>
                    <NuxtLink
                        to="https://api.whatsapp.com/send?phone=50766785406"
                        target="_blank"
                    >
                        Consulta disponibilidad
                    </NuxtLink>
                </footer>

                <footer
                    v-if="
                        auto.status === 'published' ||
                        auto.status === 'promocion'
                    "
                >
                    <div>
                        <em>Paga en Sucursal</em>
                        <h4>{{ precioFormat(auto.precio_firefly) }}</h4>
                        <NuxtLink
                            @click="
                                checkBuscar(
                                    storeSearch.sucursal,
                                    storeSearch.sucursalRetorno,
                                    storeSearch.fechaRetiro,
                                    storeSearch.fechaRetorno,
                                    auto.id
                                )
                            "
                        >
                            Reservar
                        </NuxtLink>
                    </div>
                    <div>
                        <em>Prepago web</em>
                        <h4>
                            {{
                                precioPrepago(
                                    auto.precio_firefly,
                                    auto.descuento_prepago
                                )
                            }}
                        </h4>
                        <NuxtLink :to="'/flota/' + 'prepago/' + auto.id">
                            Reservar
                        </NuxtLink>
                    </div>
                </footer>

                <section
                    class="warning"
                    v-if="storeSearch.mostrarWarning === true"
                >
                    <!-- {{ storeSearch.sucursal }} -->
                    <strong
                        >Necesitas especificar la fecha y sucursal antes de
                        continuar</strong
                    >
                    <!-- {{ storeSearch.fechaRetiro }} -->
                </section>

                <!-- <section class="warning" v-if="storeSearch.sucursal  === undefined || storeSearch.sucursalRetorno === undefined">
               {{ storeSearch.sucursal }}  
                <strong>Necesitas especificar la fecha y sucursal antes de continuar</strong>  
                {{ storeSearch.fechaRetiro }} 
            </section>-->
            </article>
        </section>
    </main>
</template>

<style scoped lang="scss">
.fleet {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.auto {
    .warning {
        color: red;
        font-size: 13px;
        font-weight: bold;
        margin: 0 auto;
        padding: 5px;
        text-align: justify;
    }

    article {
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        color: rgb(0, 0, 0);
        max-width: 390px;
        min-width: 390px;
        height: 430px;
        justify-content: space-around;
        padding: 20px;
        margin: 0 auto;
        margin-bottom: 20px;
        margin-top: 20px;
        border-radius: 15px;
        transform: scale(1);
        box-shadow: 0 4px 18px 0 rgba(146, 84, 143, 0.678);
    }
    h2 {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 10px;
    }

    header {
        display: flex;
        text-align: center;
        margin-bottom: 10px;
        align-items: center;
    }

    h3 {
        font-weight: bold;
        font-size: 34px;
        width: 100%;
    }

    em {
        font-size: 24px;
        color: gray;
        font-style: italic;
    }

    p {
        font-size: 15px;
        padding: 3px;
    }

    img {
        object-fit: contain;
        width: 100%;
        height: 160px;
        padding: 5px;
        border-radius: 5px;
    }

    footer {
        .precio {
            p {
                font-weight: bold;
                font-size: 24px;
                align-self: center;
            }
        }

        text-align: center;
        justify-content: space-between;
        display: flex;
        width: 100%;
        h4 {
            font-size: 40px;
            font-weight: bold;
        }

        em {
            font-size: 24px;
            color: rgb(3, 3, 3);
            font-style: normal;
        }

        a {
            text-transform: uppercase;
            width: 100%;
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

    .specs {
        display: none;
    }
}
.promocion {
    position: absolute;
    opacity: 80%;
    margin-top: -5px;
    margin-left: -5px;
    display: flex;
    img {
        max-width: 100px;
        max-height: 100px;
    }
}

.disponibilidad {
    padding: 5px 15px;
    border-radius: 5px;
    font-size: 14px;
    width: 100%;
    text-align: center;
}

.verificar {
    background-color: #047eff;
    padding: 5px 15px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
    color: white;
    width: 100%;
    text-align: center;

    a {
        background-color: #047eff;
        padding: 5px 15px;
        border-radius: 5px;
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: white;
        width: 100%;
        text-align: center;
    }
}

// Desktop
@media screen and (min-width: 768px) {
    .wrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .auto {
        article {
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            color: rgb(0, 0, 0);
            max-width: 390px;
            min-width: 390px;
            height: 530px;
            justify-content: space-around;
            padding: 20px;
            margin: 0 auto;
            margin-bottom: 20px;
            margin-top: 20px;
            border-radius: 15px;
            transform: scale(1);
            box-shadow: 0 4px 18px 0 rgba(146, 84, 143, 0.678);
        }

        h2 {
            font-weight: bold;
            font-size: 32px;
            margin-top: 20px;
            margin: 10px;
            width: 100%;
        }

        header {
            display: flex;
            flex-direction: column;
        }

        h3 {
            font-weight: bold;
            font-size: 34px;
            width: 100%;
        }

        em {
            font-size: 24px;
            color: gray;
            font-style: italic;
        }

        p {
            font-size: 15px;
            padding: 3px;
        }

        img {
            object-fit: contain;
            width: 100%;
            height: 180px;
            border-radius: 5px;
        }

        footer {
            justify-content: space-between;
            display: flex;
            width: 100%;

            h4 {
                font-size: 35px;
                font-weight: bold;
            }

            em {
                font-size: 22px;
                color: rgb(3, 3, 3);
                font-style: normal;
            }

            div {
                width: 100%;
            }
        }

        .specs {
            display: flex;
            width: 100%;
            padding: 5px;
            flex-wrap: wrap;
            display: flex;
            flex-wrap: wrap;
            div {
                text-align: center;
                text-transform: capitalize;
                width: 90px;
                margin-top: 3px;
            }
            dl {
                display: flex;
                font-size: 14px;
                font-weight: bold;
            }
            dd {
                font-size: 12px;
            }
            dt {
                object-fit: contain;
            }
            img {
                max-width: 25px;
                max-height: 25px;
                object-fit: contain;
                padding: 2px;
            }
        }
    }
}

.disponibilidad {
    width: 100%;
    display: flex;
    flex-direction: column;
    section {
        display: flex;
    }
    a {
        background-color: #25d366;
        width: 100%;
        padding: 5px 15px;
        border-radius: 5px;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 600;
        color: white;
        text-align: center;
    }
}
</style>
