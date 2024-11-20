<template>
  <h2 class="text-center my-4 bg-green ">
    PhoneBook
  </h2>
  <div class="bg-green w-full">
    <h1 class="bg-red text-2xl">
      show all tests
    </h1>
    <p>Lorem ipsum dolor sit.</p>

    <ul class="flex items-center  flex-col  ">
      <li v-for="(item, index) in contact_state" :key="index" class="w-full  border-b-4 border-black">
        <div
          class="contactInfoContainer  bg-violet-700 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between   ">
          <div class="contatInfo w-full px-8 flex flex-col items-center sm:items-start py-2 lg:items-start lg:py-0">
            <!-- <p> <span class="font-bold text-black min-w-24">: نام و نام خانوادگی</span> <span class="">{{ item.fullname }}</span></p> -->
            <p><span class="min-w-32">نام و نام خانوادگی : </span><span>{{ item.fullname }}</span></p>
            <p class="flex items-center gap-4 justify-center md:justify-start">
             <span class="min-w-24"> شماره تلفن :</span><span>{{ item.phoneNumber }}</span>
            </p>
          </div>
          <div class="contactControllButtons flex gap-4 px-4">
            <v-btn class="bg-warning px-6 " variant="contained">
              Edit
            </v-btn>

            <v-btn class="bg-red  " variant="contained">
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

contactStore.getAllContacts()
const allContacts = contactStore.getContacts
const contact_state = contactStore.contacts
console.log(contact_state);

</script>
<style scoped></style>