<template>
  <h2 class="text-center my-4 bg-green text-2xl ">
    ثبت مخاطب جدید
  </h2>
  <div class="bg-black">
    <form @submit.prevent="submitData()">
      <v-text-field v-model="fullname" label="نام و نام خانوادگی" :label-size="42" />

      <v-text-field v-model="phoneNumber" label="شماره تلفن" />

      <v-text-field v-model="selectedDate" type="date" label="انتخاب تاریخ تولد" />
      <v-btn class="me-4 bg-success" type="submit">
        submit
      </v-btn>

      <v-btn class="bg-info" @click="handleReset">
        clear
      </v-btn>
    </form>
  </div>
</template>

<script setup>
import { useContactStore } from '../stores/contacts.js';
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue';

const contactsStore = useContactStore();



const fullname = ref('')
const phoneNumber = ref('')
const selectedDate = ref('');

const allContactInfo = computed(() => ({
  fullname: fullname.value,
  phoneNumber: phoneNumber.value,
  selectedDate: selectedDate.value
}))

const submitData = () => {
  console.log(allContactInfo.value)
  contactsStore.addContact(allContactInfo.value)
  console.log(contactsStore.contacts);

}

const handleReset = () => {
  fullname.value = ''
  phoneNumber.value = ''
  selectedDate.value = ''
}

const submitMyForm = () => {
  alert(fullname.value + '\n' + phoneNumber.value + '\n' + selectedDate.value)
  handleReset()
}
const AllContacts = ref([

])

</script>
<style scoped>
.myP {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contactControllButtons {
  gap: 1rem;
}
</style>