import { useSearchStore } from "@/stores/search";

export default defineNuxtRouteMiddleware((from, to) => {
    //Check if search is filled
    const { sucursal, sucursalRetorno } = useSearchStore();
    if (!sucursal && !sucursalRetorno) {
        return navigateTo("/");
    }
});
