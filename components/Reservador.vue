<script setup>
import { useSearchStore } from "@/stores/search"; 
import { useSucursalStore } from "@/stores/sucursal";  
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
const date = ref(new Date());

const storeSearch = useSearchStore();

const storeSucursal = useSucursalStore();

const sucursales = computed(() => {
  return storeSucursal.sucursales;
});
onMounted(() => {
  storeSucursal.fetchSucursales();
  // storeSearch.options = sucursales;
});

function minimoDeDias(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function minimoDeHoras(date, horas) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + horas);
  return newDate;
}

const currentDate = new Date(); 
const currentTime = currentDate.getTime(); 
const oneDay = 24 * 60 * 60 * 1000;
const newTime = currentTime + oneDay; 
const nextDay = new Date(newTime); 




const startTime = ref({ hours: 10, minutes: 30 });

function getWorkingHours(openingTime, closingTime) {
  let workingHours = [];
  // con fecha queremos revisar si la fecha de retiro es hoy y sumarle horas
  for (let i = openingTime; i < closingTime; i++) {
    workingHours.push({ text: `${i}`, value: i });
  }
  return workingHours;
}

function domingoCerrados(domingoApertura, domingoCierre) {
  if (domingoApertura === 0 && domingoCierre === 0) {
    return [0];
  }
}

function horarioFines(openingTime, closingTime) {
  let fines = [];
  for (let i = openingTime; i < closingTime; i++) {
    fines.push({ text: `${i}`, value: i });
  }
  return fines;
}

const minutesArray = [
  { text: "00", value: 0 },
  { text: "15", value: 15 },
  { text: "30", value: 30 },
  { text: "45", value: 45 },
];
</script>
<template>
<fieldset class="reservador">
    <header>
        <h2>
            Haz tu Reserva
        </h2>
    </header>

    <fieldset class="sucursal-pick"> 
        <legend>sucursal de retiro</legend>
        <label class="sucursal">
            <select
              v-model="storeSearch.sucursal"
              name="sucursal"
              as="select"
              rules="required"
            >
              <option disabled value="">Selecciona una sucursal</option>
              <option v-for="option in sucursales" :key="option" :value="option">
                {{ option.name }}
              </option>
            </select>
        </label>
    </fieldset>

    <fieldset class="sucursal-retorno-pick"> 
        <legend>sucursal de retorno</legend>
        <label class="sucursal">
            <select
            v-model="storeSearch.sucursalRetorno"
            name="sucursalRetorno"
            as="select"
            rules="required"
          >
            <option disabled value="">Selecciona una sucursal</option>
            <option v-for="option in sucursales" :key="option" :value="option">
              {{ option.name }}
            </option>
          </select>
        </label>
    </fieldset>
    
    <!-- <fieldset class="dia-pick fechas">

      
            <div v-if="storeSearch.sucursal">
              <label>Fecha de Retiro </label>
              <date-picker
                :start-time="startTime"
                locale="es"
                v-model="storeSearch.fechaRetiro"
                :minDate="nextDay"
                :disabled-week-days="
                  domingoCerrados(
                    storeSearch.sucursal.horario_apertura_domingo,
                    storeSearch.sucursal.horario_cierre_domingo
                  )
                "
                :highlight="storeSearch.sucursal.dias_festivos"
                :disabled-dates="storeSearch.sucursal.dias_festivos"
                highlight-disabled-days
              >
                <template #time-picker="{ time, updateTime }">
                  <div class="custom-time-picker-component">
                    <select
                      class="select-input"
                      :value="time.hours"
                      @change="updateTime(+$event.target.value)"
                    >
                      <option
                        v-for="h in getWorkingHours(
                          storeSearch.sucursal.horario_apertura,
                          storeSearch.sucursal.horario_cierre
                        )"
                        :key="h.value"
                        :value="h.value"
                      >
                        {{ h.text }}
                      </option>
                    </select>
    
                    <select
                      class="select-input"
                      :value="time.minutes"
                      @change="updateTime(+$event.target.value, false)"
                    >
                      <option v-for="m in minutesArray" :key="m.value" :value="m.value">
                        {{ m.text }}
                      </option>
                    </select>
                  </div>
                </template>
              </date-picker>
            </div>
    
            <div v-if="storeSearch.sucursalRetorno">
              <label>Fecha de Retorno</label>
              <date-picker
                locale="es"
                :start-time="startTime"
                v-model="storeSearch.fechaRetorno"
                :minDate="
                  minimoDeDias(
                    storeSearch.fechaRetiro,
                    storeSearch.sucursalRetorno.minimo_dias
                  )
                "
                :disabled-week-days="
                  domingoCerrados(
                    storeSearch.sucursalRetorno.horario_apertura_domingo,
                    storeSearch.sucursalRetorno.horario_cierre_domingo
                  )
                "
                :highlight="storeSearch.sucursalRetorno.dias_festivos"
                :disabled-dates="storeSearch.sucursalRetorno.dias_festivos"
                highlight-disabled-days
              >
                <template #time-picker="{ time, updateTime }">
                  <div class="custom-time-picker-component">
                    <select
                      class="select-input"
                      :value="time.hours"
                      @change="updateTime(+$event.target.value)"
                    >
                      <option
                        v-for="h in getWorkingHours(
                          storeSearch.sucursalRetorno.horario_apertura,
                          storeSearch.sucursalRetorno.horario_cierre
                        )"
                        :key="h.value"
                        :value="h.value"
                      >
                        {{ h.text }}
                      </option>
                    </select>
    
                    <select
                      class="select-input"
                      :value="time.minutes"
                      @change="updateTime(+$event.target.value, false)"
                    >
                      <option v-for="m in minutesArray" :key="m.value" :value="m.value">
                        {{ m.text }}
                      </option>
                    </select>
                  </div>
                </template>
              </date-picker>
            </div> 
  
    </fieldset> -->

    <footer>
        
    </footer>
</fieldset>
</template>
<style lang="scss" scoped>


.reservador {  
    background-color: #824296e3;
    column-gap: 1px;
    row-gap: 1px;
    padding: 5px 20px 10px 20px;
    color: white; 
    align-items: center;
    display:flex; 
    flex-direction: column;
 
    header   { 
    }
    h2 {
      font-size: 22px;
      font-weight: bold; 
    }  
    legend {
      font-size: 14px;
      font-weight: bold; 
    } 
    
    fieldset { 
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px; 
    select {
      height: 45px;
      
    }
    input {
      height: 45px;
    }
    }
  
    footer { 
      margin-top: 15px;
      align-self: center;
    }
  } 

  
// Desktop  
@media screen and (min-width: 768px) { 

} 

</style>