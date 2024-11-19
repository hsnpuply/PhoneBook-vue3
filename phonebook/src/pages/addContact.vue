<template>
  <h2 class="text-center my-4 bg-green ">
    add Contact
  </h2>
  <div class="bg-black">
    <form @submit.prevent="submitMyForm">
      <v-text-field
        v-model="fullname"
        label="Name"
      />

      <v-text-field
      v-model="phoneNumber"
        label="Phone Number"
      />

      <v-btn
        class="me-4"
        type="submit"
      >
        submit
      </v-btn>

      <v-btn @click="handleReset">
        clear
      </v-btn>
    </form>
  </div>
</template>

<script setup>
import { useContactStore } from '../stores/contacts.js';
import { ref } from 'vue'
import { Icon } from '@iconify/vue';

const fullname=ref('')
const phoneNumber=ref('')
const email=ref('')

const handleReset=()=>{
  fullname.value=''
  phoneNumber.value=''  
}

const submitMyForm = ()=>{
alert(fullname.value + '\n' + phoneNumber.value)
handleReset()
}
const AllContacts =ref([

])

</script>
<style scoped>
.myP{
  display: flex;
  align-items: center;
  gap:1rem;
}
.contactControllButtons{
  gap: 1rem;
}
</style>