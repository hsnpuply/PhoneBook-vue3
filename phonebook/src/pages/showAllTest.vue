<template>
  <h2 class="text-center my-4 bg-green text-3xl text-black">
    دفترچه  تلفن
  </h2>
  <v-col class="flex bg-red-500/90 items-center justify-center">
    <router-link
      to="add"
      class=""
    >
      <v-btn
        color="green"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        ثبت مخاطب
      </v-btn>
    </router-link>
  </v-col>

  
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
          v-for="item in contactsStore.contacts"
          :key="item.id"
          class="text-right bg-blue-950 text-lg cursor-pointer hover:bg-blue-900 "
        >
          <td
            v-if="contact_state.length > 0"
            class=" flex justify-end w-full gap-2 " 
          >
            <v-btn
              class="text-none font-weight-regular"
              prepend-icon="mdi-delete"
              text="ویرایش"
              variant="flat"
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
                  text="ویرایش"
                  variant="flat"
                  v-bind="activatorProps"
                  @click="openEditDialog(item)"
                />
              </template>

              <v-card
                prepend-icon="mdi-account"
                title="ویرایش مخاطب"
              >
                <v-card-text>
                  <v-row dense>
                    <v-col
                      cols="12"
                      md="4"
                      sm="6"
                    >
                      <v-text-field
                        v-model="selectedContact.fullname"
                        label="Full name*"
                        required
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="4"
                      sm="6"  
                    >
                      <v-text-field
                        v-model="selectedContact.phoneNumber"
                        hint="شماره تلفن را وارد کنید"
                        label="phone number"
                      />
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        v-model="selectedContact.selectedDate"
                        type="date"
                        label="انتخاب تاریخ تولد"
                      />
                    </v-col>

                    <v-col cols="8">
                      <v-switch
                        v-model="selectedContact.isCoworker"
                        color="primary"
                        label="همکار"
                      />
                    </v-col>
                    <v-col
                      cols="8"
                      class="mb-4 "
                    >
                      <v-row class="gap-4">
                        <v-btn
                          :loading="loading"
                          variant="flat"
                          color="green"
                          @click="UpdateDialog(selectedContact.id)"
                        >
                          ثبت تغییرات
                        </v-btn>
                        <v-btn
                          variant="flat"
                          color="red"
                          @click="cancelDialog()"
                        >
                          انصراف
                        </v-btn>
                      </v-row>
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
  <div class="flex items-center justify-center pt-8">
    <Form
      @submit="onSubmit"
    >
      <label for="email" />
      <Field
        type="email"
        name="email"
        :rules="validateEmail"
        class="border-2 border-white bg-white p-[7px]"
        placeholder="email"
      />
      <ErrorMessage name="email" />

      <v-btn
        variant="flat"
        type="submit"
        color="green"
      >
        Sign up for newsletter
      </v-btn>
      hi
      <date-picker v-model="date"></date-picker>

    </Form>
  </div>
</template>

<script setup>
  import DatePicker from 'vue3-persian-datetime-picker'

import { ref   } from 'vue'
import { Form, Field , ErrorMessage  } from 'vee-validate';

import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
});

import { useContactStore } from '../stores/contacts.js';
import { Icon } from '@iconify/vue';
import { email } from '@vee-validate/rules';
import { fa } from 'vuetify/locale';

const selectedContact = ref({});
const dialog = ref(false);

const validateEmail=(value)=> {
      // if the field is empty
      if (!value) {
        return 'This field is required';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'This field must be a valid email';
      }
      // All is good
      return true;
    }

const onSubmit =(values)=> {
      console.log('Form submitted!');
      console.log(JSON.stringify(values, null, 2));
      // console.log(values);
      

    }

const contactsStore = useContactStore();
// contactsStore.getAllContacts() 
const allContacts = contactsStore.getContacts
const contact_state = contactsStore.contacts



// const deleteContact = (id)=>{
//   contactStore.deleteContact(id)
// }
const deleteContact =  (id) => {
       contactsStore.deleteContact(id);
    };  
console.log(contact_state);

const openEditDialog = (item) => {
  selectedContact.value = { ...item };
  dialog.value = true; 
  console.log(selectedContact.value);
};
const loading = ref(false)


const  UpdateDialog =(id)=> {
  loading.value = true
  setTimeout(() => {
    contactsStore.updateContact(id, selectedContact.value);
    loading.value = false
  }, 1500);
  setTimeout(() => {
  dialog.value= false
  }, 1700);
}

const cancelDialog = ()=>{
  dialog.value = false;
}
</script>
<style scoped></style>