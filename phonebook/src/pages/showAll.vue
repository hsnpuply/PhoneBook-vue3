<template>
  <h2 class="text-center my-4 bg-green ">
    PhoneBook
  </h2>
  <div class="bg-green w-full">
    <ul
      class="flex items-center  flex-col  "
    >
      <li
        v-for="(item,index) in allContacts"
        :key="index"
        class="w-full  border-b-4 border-black"
      >
        <div class="contactInfoContainer  bg-violet-700 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between   ">
          <div class="contatInfo w-full px-8 flex flex-col items-center sm:items-start py-2 lg:items-start lg:py-0">
            <p>Name : <span class="font-bold text-black ">{{ item.name }}</span></p>
            <p class="flex items-center gap-4 justify-center md:justify-start">
              {{ formatPhone(item.phone) }} 
              <Icon
                :icon="item.phone.startsWith('+98') ? 'twemoji:flag-iran' : 'twemoji:flag-china'"
                style="font-size: 35px;"
              />
            </p>
            <!-- <v-btn icon="mdi-flag"></v-btn> -->
            <!-- Iconify library used -->
          </div>
          <div class="contactControllButtons flex gap-4 px-4">
            <v-btn
              class="bg-warning px-6 "
              variant="contained"
            >
              Edit
            </v-btn>

            <v-btn
              class="bg-red  "
              variant="contained"
            >
              Delete
            </v-btn>
          </div>
          <hr>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useContactStore } from '../stores/contacts.js';
import { Icon } from '@iconify/vue';


const contactStore = useContactStore();

const allContacts = contactStore.getContacts


const formatPhone=(phone) =>{
      if (phone.startsWith('+98')) {
        return '09' + phone.slice(3); // Replace '+98' with '09'
      }
      return phone; // Return the original phone if it doesn't start with '+98'
    }
// const contactsStore = useAppStore();
// const allContacts = contactsStore.state();
// alert('qweqw')
</script>
<style scoped>

</style>