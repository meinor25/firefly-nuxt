<template>
    <footer class="footer">
        <div class="footer-wrapper">
            <section>
                <!-- <div class="img-container">
                <NuxtLink to="/">
                    <img src="../assets/images/logo.png" alt="FireFly Logo" />
                </NuxtLink>
            </div> -->
                <!-- <router-link to="/"><img src="../assets/images/logo.png"/></router-link> -->
                <h3>CONTACTO</h3>
                <p>
                    Reservaciones: (507) 6815-1688 <br />
                    Asistencia 24 H: (507) 204-9550<br />
                </p>
            </section>

            <section>
                <nav>
                    <h3>SERVICIOS</h3>
                    <p>
                        <NuxtLink to="/paginas/coberturas">Coberturas</NuxtLink>
                        <NuxtLink to="/paginas/requisitos">Requisitos</NuxtLink>
                        <NuxtLink to="/vacantes">Bolsa de Trabajo</NuxtLink>
                    </p>
                </nav>
            </section>

            <section>
                <h3>SOPORTE</h3>
                <p>
                    <NuxtLink to="/paginas/reembolso"
                        >Politica de Reembolso</NuxtLink
                    >
                    <NuxtLink to="/paginas/tyc"
                        >Términos y Condiciones</NuxtLink
                    >
                    <NuxtLink to="/paginas/privacidad"
                        >Política de Privacidad</NuxtLink
                    >
                </p>
            </section>

            <section class="sociales">
                <h3>SIGUENOS EN</h3>
                <span>
                    <NuxtLink
                        to="https://www.instagram.com/panamafirefly/"
                        target="_blank"
                    >
                        <img
                            class="social"
                            src="../assets/images/instagram.svg"
                        />
                    </NuxtLink>
                    <NuxtLink
                        to="https://www.facebook.com/panamafirefly/"
                        target="_blank"
                    >
                        <img
                            class="social"
                            src="../assets/images/facebook.png"
                        />
                    </NuxtLink>
                </span>
            </section>
        </div>
    </footer>
    <div class="copyright-wrapper">
        <p class="copyright">Copyright © 2023 Firefly Panamá</p>
    </div>
</template>

<style lang="scss" scoped>
.footer {
    width: 100%;
    background-color: #1f2024;
    min-height: 30vh;

    .footer-wrapper {
        display: flex;
        flex-direction: column;
        color: white;
        line-height: 1.3;
        text-align: left;
        padding: 3rem 2rem;
        justify-content: space-between;
    }
    h3 {
        font-weight: bold;
        font-size: 16px;

        margin-bottom: 10px;
    }
    nav {
        display: flex;
        flex-direction: column;
    }
    p {
        font-family: sans-serif;
        display: flex;
        color: #5d687a;
        flex-direction: column;
    }
    a {
        margin-bottom: 5px;
        margin-right: 5px;
        font-size: 14px;
    }
    a:hover {
        color: #e306d8;
    }
    section {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        margin-right: 20px;
    }
    span {
        a {
            img {
                width: 25px;
            }
        }
    }
}

.img-container {
    width: 200px;
    img {
        width: 100%;
    }
}
.copyright {
    font-size: 12px;
}
.copyright-wrapper {
    width: 100%;
    padding: 1rem;
    background-color: #250036;
    .copyright {
        color: white;
        text-align: center;
    }
}

.sociales {
    color: #e4e4e4;
    h3 {
        font-size: 15px;
    }
    a:visited {
        color: #e4e4e4;
    }
    a:link {
        color: #e4e4e4;
    }
    a {
        margin: 5px;
        font-size: 34px;
        color: #e4e4e4;
        width: 40px;
    }
    img {
        max-width: 40px;
    }
    span {
        display: flex;
    }
}
// Desktop
@media screen and (min-width: 768px) {
    .footer {
        display: flex;
        flex-direction: row;
        .footer-wrapper {
            flex-direction: row;
            margin: auto;
        }
    }
    // .copyright {
    //     position: absolute;
    //     align-self: end;
    // }
}
@media screen and (min-width: 1024px) {
    .footer-wrapper {
        width: 80%;
        margin: auto;
    }
}
</style>
