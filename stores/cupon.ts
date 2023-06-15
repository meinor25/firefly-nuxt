import { defineStore } from "pinia";

export const useCuponesStore = defineStore("cupones", {
    // a function that returns a fresh state - STATE ES COMO DATA
    state: () => ({
        cupones: [
            {
                cupon: {
                    id: "",
                    nombre: "",
                    codigo: "",
                    descuento: "",
                },
            },
        ],
    }),
    getters: {
        // discountValue: (state) => {
        //     if (state.cupones) {
        //       return state.cupones.cupon.descuento;
        //     }
        //     return null;
        //   },
    },
    actions: {
        async fetchCupones() {
            try {
                const { getItems } = useDirectusItems();
                var filters = { marca: "Firefly" };
                const cupones = await getItems({
                    collection: "cupones",
                    params: {
                        filter: filters,
                    },
                });
                this.cupones = cupones;
            } catch (error) {
                console.error(error);
            }
        },
    },
});
