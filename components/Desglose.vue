<script setup>
import { usePedidoStore } from "@/stores/pedido";
import moment from "moment";
import MoneyFormat from "vue-money-format";

import { useCuponesStore } from "@/stores/cupon";

const cuponStore = useCuponesStore();

// Fetch the coupon data when the component is created.
cuponStore.fetchCupones();

const discountValue = cuponStore.descuento;

const pedidoStore = usePedidoStore();

const pedido = computed(() => {
    return pedidoStore.pedido;
});
const precioDropoff = computed(() => {
    return (pedidoStore.pedido.dropoff = pedidoStore.checkDropoff(
        pedidoStore.pedido.sucursal.LocationCode,
        pedidoStore.pedido.sucursalRetorno.LocationCode
    ));
});

const totalDeDias = computed(() => {
    return (pedidoStore.pedido.totalDeDias = pedidoStore.diffDias(
        pedidoStore.pedido.diaRetorno,
        pedidoStore.pedido.diaRetiro
    ));
});

const impuestoPedido = computed(() => {
    return (pedidoStore.pedido.impuesto = pedidoStore.impuesto());
});
const impuestoAeropuerto = computed(() => {
    return (pedidoStore.pedido.impuesto_aeropuerto =
        pedidoStore.impuestoAeropuerto());
});
const subTotal = computed(() => {
    return (pedidoStore.pedido.sub_total = pedidoStore.subTotal());
});
const totalPedido = computed(() => {
    return (pedidoStore.pedido.total = pedidoStore.total());
});

const fechaFormat = function (value) {
    if (value) {
        return moment(value).format("DD MMM YYYY hh:mm A");
    }
};

const horaFormat = function (value) {
    if (value) {
        return moment(value).format("hh:mm A");
    }
};

const precioFormat = function (value) {
    if (value) {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    }
};

function toUSDFormat(decimal) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(decimal);
}

const prepago = function (precio, descuentoPrepago) {
    let descuento = descuentoPrepago;
    const descuentoCalculado = precio * (descuento / 100);
    const nuevoPrecio = precio - descuentoCalculado;
    console.log(
        "precio" +
            precio +
            "descuento" +
            descuento +
            "descuento calculado" +
            descuentoCalculado +
            "nuevo precio" +
            nuevoPrecio
    );
    // // Calculate tax due
    // const impuestoADeber = nuevoSubtotal * (impuesto / 100);
    // // Calculate final price
    // const impuestoSumado = nuevoSubtotal * (1 + (impuesto / 100));
    pedidoStore.pedido.carro.precio_prepago = nuevoPrecio;
    return nuevoPrecio.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

onMounted(() => {
    pedidoStore.pedido.totalDeDias = pedidoStore.diffDias(
        pedidoStore.pedido.diaRetorno,
        pedidoStore.pedido.diaRetiro
    );
});
</script>
<script>
export default {
    components: {
        "money-format": MoneyFormat,
    },
};
</script>
<template>
    <section class="pt-4 mx-2">
        <div
            class="flex justify-center w-[90%] text-center mx-auto pb-4 border-bottom"
        >
            <div>
                <h3 class="text-xl font-bold">Retiro en</h3>
                <p class="font-light text-sm w-[80%] mx-auto">
                    {{ pedido.sucursal.name }}
                </p>
                <p class="font-bold text-sm w-[80%] mx-auto">
                    {{ fechaFormat(pedido.diaRetiro) }}
                </p>
            </div>
            <div>
                <h3 class="text-xl font-bold">Retorno en</h3>
                <p class="font-light text-sm w-[80%] mx-auto">
                    {{ pedido.sucursalRetorno.name }}
                </p>
                <p class="font-bold text-sm w-[80%] mx-auto">
                    {{ fechaFormat(pedido.diaRetorno) }}
                </p>
            </div>
        </div>
        <!-- <dl>
                <dt>
                    Días Reservados:
                </dt> 
                <dd>
                    {{ totalDeDias }}
                </dd>
            </dl>   -->

        <dl v-if="precioDropoff > 0">
            <dt>Drop-off</dt>
            <dd>
                {{ toUSDFormat(precioDropoff) }}
            </dd>
        </dl>

        <div class="mx-4">
            <h6 class="font-bold text-xl my-5">Detalles de la reserva</h6>
            <div>
                <div>
                    <h4 class="font-bold">Modelo</h4>
                    <div class="flex justify-between">
                        <p>
                            {{ pedido.carro.marca }}
                            {{ pedido.carro.modelo }}
                        </p>
                        <dd v-if="pedido.reserva === 'prepago'">
                            {{
                                prepago(
                                    pedido.carro.precio_firefly *
                                        pedidoStore.diffDias(
                                            pedido.diaRetorno,
                                            pedido.diaRetiro
                                        ),
                                    pedido.carro.descuento_prepago
                                )
                            }}
                        </dd>
                        <dd v-else>
                            {{
                                toUSDFormat(
                                    pedido.carro.precio_firefly *
                                        pedidoStore.diffDias(
                                            pedido.diaRetorno,
                                            pedido.diaRetiro
                                        )
                                )
                            }}
                        </dd>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold mt-2">Coberturas</h4>
                    <dl v-if="pedido.carro.tipo !== 'Sedan'">
                        <dt v-if="pedido.cobertura.nombre">
                            {{ pedido.cobertura.nombre }}
                        </dt>
                        <dd>
                            {{
                                toUSDFormat(
                                    pedido.cobertura.precio_2 *
                                        pedidoStore.diffDias(
                                            pedido.diaRetorno,
                                            pedido.diaRetiro
                                        )
                                )
                            }}
                        </dd>
                    </dl>
                    <dl v-else>
                        <dt>
                            {{ pedido.cobertura.nombre }}
                        </dt>
                        <dd>
                            {{
                                toUSDFormat(
                                    pedido.cobertura.precio *
                                        pedidoStore.diffDias(
                                            pedido.diaRetorno,
                                            pedido.diaRetiro
                                        )
                                )
                            }}
                        </dd>
                    </dl>
                    <dl>
                        <dt>Asistencia Vial(ERA)</dt>
                        <dd>
                            {{
                                toUSDFormat(
                                    pedido.era *
                                        pedidoStore.diffDias(
                                            pedido.diaRetorno,
                                            pedido.diaRetiro
                                        )
                                )
                            }}
                        </dd>
                    </dl>
                </div>
            </div>
        </div>

        <h6>Extras:</h6>

        <dl v-if="pedido.delivery.precio > 0" class="extras">
            <div>
                <dt>Delivery</dt>
                <dd>
                    {{ toUSDFormat(pedido.delivery.precio) }}
                </dd>
            </div>
        </dl>

        <dl v-if="pedido.extras" class="extras">
            <div v-for="extra in pedido.extras">
                <dt>
                    {{ extra.nombre }}
                </dt>
                <dd>
                    {{
                        toUSDFormat(
                            extra.precio *
                                pedidoStore.diffDias(
                                    pedido.diaRetorno,
                                    pedido.diaRetiro
                                )
                        )
                    }}
                </dd>
            </div>
        </dl>

        <h6>Sub-Total:</h6>
        <dl>
            <dt>Sub-Total</dt>
            <dd>
                {{ toUSDFormat(subTotal) }}
            </dd>
        </dl>
        <dl v-if="impuestoAeropuerto > 0">
            <dt>Impuesto de Aeropuerto</dt>
            <dd>
                {{ toUSDFormat(impuestoAeropuerto) }}
            </dd>
        </dl>
        <dl>
            <dt>ITBMS</dt>
            <dd>
                {{ toUSDFormat(impuestoPedido) }}
            </dd>
        </dl>
        <h6>Total:</h6>
        <dl v-if="totalPedido">
            <dt></dt>
            <dd>$ {{ totalPedido }}</dd>
        </dl>
        <p v-if="pedidoStore.pedido.cupon === 'panamericano23'">
            ¡Cupon Aplicado!
        </p>

        <dl v-if="!pedido.cobertura.precio">
            <dt class="warn">
                Te Falta elegir un tipo de cobertura para poder continuar
            </dt>
            <dd></dd>
        </dl>
    </section>
</template>
<style lang="scss">
// .border-bottom {
//     border-bottom: ;
// }
// .desglose {
//     display: flex;
//     flex-direction: column;
//     line-height: 1.5;
//     .warn {
//         font-weight: bold;
//         font-size: 14px;
//     }
//     h6 {
//         font-weight: bold;
//         background-color: #850e7f75;
//     }
//     dl {
//         display: flex;
//         justify-content: space-between;
//         background-color: #f8fbff;
//         padding: 3px;
//     }
//     .extras {
//         flex-direction: column;
//         div {
//             display: flex;
//             justify-content: space-between;
//         }
//     }
//     button {
//         background-color: #850e7f75;
//         padding: 5px 15px;
//         text-transform: uppercase;
//         font-size: 16px;
//         font-weight: 600;
//         color: white;
//         width: 100%;
//         text-align: center;
//     }
//     .cupon {
//         background-color: #f330e9;
//         padding: 3px 10px;
//         border-radius: 5px;
//         text-transform: uppercase;
//         font-size: 12px;
//         font-weight: 600;
//         color: white;
//         width: 100%;
//         text-align: center;
//     }
// }
</style>
