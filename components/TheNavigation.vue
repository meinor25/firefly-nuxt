<script>
import { useWindowSize } from "@/composables/useWindowSize";
import { ref, computed } from "vue";
import { useLenguajesStore } from "@/stores/lenguajes";

export default {
    setup() {
        const storeLenguaje = useLenguajesStore();
        const { locale } = useI18n();

        const enLocale = () => {
            storeLenguaje.setEN();
            locale.value = "en";
        };

        const esLocale = () => {
            storeLenguaje.setES();
            locale.value = "es";
        };

        const isMenuVisible = ref(false);
        const { width } = useWindowSize();

        console.log(width);

        const isMobile = computed(() => width.value < 768);
        const isDesktop = computed(() => width.value >= 768);

        const toggleMenu = () => {
            isMenuVisible.value = !isMenuVisible.value;
        };

        return {
            isMenuVisible,
            toggleMenu,
            isMobile,
            isDesktop,
            enLocale,
            esLocale,
            locale,
        };
    },
};
</script>

<template>
    <header class="menu">
        <nav class="burger-menu">
            <NuxtLink to="/" class="menu-logo"
                ><img src="../assets/images/logo.png"
            /></NuxtLink>

            <button @click="toggleMenu" class="burger-btn" v-if="isMobile">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <transition name="slide-fade">
                <div v-if="isDesktop || isMenuVisible" class="menu-items">
                    <ul>
                        <li>
                            <NuxtLink to="/flota">{{ $t("flota") }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/sucursales">{{
                                $t("sucursales")
                            }}</NuxtLink>
                        </li>

                        <li>
                            <NuxtLink to="/clientes">{{
                                $t("maneja")
                            }}</NuxtLink>
                        </li>
                        <li>
                            <button @click="enLocale()">EN</button>
                            <span>|</span>
                            <button @click="esLocale()">ES</button>
                        </li>
                        <!-- <form class="lenguaje">
                  <select v-model="locale">
                    <option value="en" >EN</option>
                    <option value="es">ES</option>
                  </select>  
                </form> -->
                    </ul>
                </div>
            </transition>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.menu {
    width: 100%;
    background-color: rgb(255, 255, 255);
    display: flex;

    .lenguaje {
        select {
            border-style: none;
            padding: 5px;
            background-color: #131313;
            option:hover {
                border-style: none;
                padding: 5px;
                background-color: #1a1a1a;
            }
        }
    }
    .router-link-active {
        color: rgb(0, 0, 0);
    }

    nav {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        font-weight: bold;
        color: #000;
        z-index: 9999999;
    }

    img {
        height: 50px;
        margin-right: 20px;
        margin-left: 20px;
    }

    ul {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
    }
}

.burger-menu {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.burger-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    background: none;
    border: none;
    cursor: pointer;
}

.burger-btn span {
    width: 100%;
    height: 3px;
    background: #000000;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

.menu-items {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #854399;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-items ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.menu-items li {
    padding: 15px;
    border-bottom: 1px solid #ffffff3a;
}

.menu-items li:last-child {
    border-bottom: none;
}

.menu-items a {
    font-weight: 400;
    text-decoration: none;
    color: #ffffff;
}
.menu-items button {
    text-decoration: none;
    color: #ffffff;
}
.menu-items span {
    padding: 0px 3px;
    text-decoration: none;
    color: #ffffff;
}
/*  desktop */
@media screen and (min-width: 768px) {
    .menu {
        width: 100%;
        display: flex;
        padding: 20px 10px;

        .dropdown {
            display: none;
            position: absolute;

            background-color: rgb(33, 120, 207);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 0;
            min-width: 200px;
            max-width: 200px;
        }
        .menu-logo {
            width: 60%;
        }

        .dropdown {
            a {
                color: #ffffff;
            }
            li {
                padding: 10px;
                border-bottom: 1px solid #eee;
            }
            li:last-child {
                border-bottom: none;
            }
        }

        .menu-items li:hover .dropdown {
            display: block;
        }
    }
    .menu-items,
    .menu-items.menu-visible {
        display: flex;
        position: static;
        box-shadow: none;
        background: none;
    }

    .menu-items {
        display: flex;
        justify-content: right;

        a {
            color: #000000;
        }
        ul {
            display: flex;
            flex-direction: row;

            justify-content: space-between;
            max-width: 496px;
        }

        li {
            padding: 15px;
            border-bottom: none;
            color: #d8d8d8;
        }
        li:last-child {
            border-right: none;
        }
    }
    .menu-items span {
        padding: 0px 3px;
        text-decoration: none;
        color: #000000;
    }
    .menu-items button {
        text-decoration: none;
        color: #000000;
    }

    @media screen and (min-width: 1024px) {
        .menu {
            padding: 20px 8rem;
        }
    }
}
</style>
