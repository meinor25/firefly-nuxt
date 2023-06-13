<script> 
import moment from 'moment'
import es from 'moment/locale/es' 

export default { 
    props: { 
        sucursal: String,
        sucursalRetorno: String, 
        diaRetiro: String,
        diaRetorno: String,  
    },  
    data() {
            return {  
                
                diaRetiro: moment(this.diaRetiro).format('LLL') ,
                diaRetorno: moment(this.diaRetorno).format('LLL'),
             
            } 
        },
    created() {  
       
            // this.diaRetiro=moment(diaRetiro).format('YYYY-MM-DD'); 
        },
       
} 
</script>

<template> 

<article class="progreso"> 
    <section class="paso uno">
        <h3>GANCHITO</h3>
        
        <p>Retiro en: {{ sucursal }} El: {{  diaRetiro   }} </p>
        
        
        <div>
                <dt>Retorno en:</dt>
                <dd>{{ sucursalRetorno }}</dd> 
            </div>
            <div>
                <dt>El:</dt>
                <dd>{{ diaRetorno }}</dd> 
            </div> 
     
    </section>
    <section class="paso dos">
        <h4>Elige tu carro</h4>
        <figure>Imagen carro</figure>
    </section>

    <section class="paso tres">
        <h3>Verifica y Reserva!</h3>
        <figure>extras</figure>
    </section>
</article>
</template> 