<template>
  <h2 class="text-center my-4 bg-green ">
    PhoneBook
  </h2>
  <!-- <div class="bg-green w-full">
    <h1 class="bg-red text-2xl">
      show all tests
    </h1>
    <p>Lorem ipsum dolor sit.</p>

    <ul class="flex items-center  flex-col  ">
      <li v-for="(item, index) in contact_state" :key="index" class="w-full  border-b-4 border-black">
        <div
          class="contactInfoContainer  bg-violet-700 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between   ">
          <div class="contatInfo w-full px-8 flex flex-col items-center sm:items-start py-2 lg:items-start lg:py-0">
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
  </div> -->
  <div class="bg-warning">
    <v-table density="compact">
      <thead>
        <tr>
          <th class="text-right">
            عملیات
          </th>
          <th class="text-right">
            همکار
          </th>
          <th class="text-right">
            تاریخ تولد
          </th>
          <th class="text-right">
            شماره تلفن
          </th>
          <th class="text-right">
            نام و نام خانوادگی
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in contact_state"
          :key="item.id"
          class="text-right bg-blue-950 text-lg cursor-pointer hover:bg-blue-900 "
        >
          <td
            v-if="contact_state.length > 0"
            class=" flex justify-end w-full " 
          >
            <v-btn
              variant="outlined"
              color="red"
              @click="deleteContact(item.id)"
            >
              حذف
            </v-btn>

            <v-dialog
              v-model="dialog"
              max-width="800"
            >
              <template #activator="{ props: activatorProps }">
                <v-btn
                  class="text-none font-weight-regular"
                  prepend-icon="mdi-account"
                  text="Edit Profile"
                  variant="flat"
                  v-bind="activatorProps"
                />
              </template>

              <v-card prepend-icon="mdi-account" title="ویرایش مخاطب">
                <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="4" sm="6">
              <v-text-field label="Full name*" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                hint="شماره تلفن را وارد کنید"
                label="phone number"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
        v-model="selectedDate"
        type="date"
        label="انتخاب تاریخ تولد"
      />
            </v-col>
            
            
                </v-row>
                </v-card-text>
              </v-card>

            </v-dialog>
          </td>
          <td>{{ item.isCoworker ? 'بله' : 'خیر' }}</td>
          <td>{{ item.selectedDate }}</td>
          <td>{{ item.phoneNumber }}</td>
          <td>{{ item.fullname }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { useContactStore } from '../stores/contacts.js';
import { Icon } from '@iconify/vue';
import { ref   } from 'vue'

const contactStore = useContactStore();
const dialog = ref(false)

contactStore.getAllContacts() 
const allContacts = contactStore.getContacts
const contact_state = contactStore.contacts



// const deleteContact = (id)=>{
//   contactStore.deleteContact(id)
// }
const deleteContact = async (id) => {
      await contactStore.deleteContact(id);
    };
console.log(contact_state);

</script>
<style scoped></style>