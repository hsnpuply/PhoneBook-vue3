<script setup>
import DatePicker from 'vue3-persian-datetime-picker'
import Swal from "sweetalert2";


const dialogMode = ref('')



const date = ref('')

const showAlert = (id) => {
  Swal.fire({
    title: "آیا از حذف مخاطب اطمینان دارید؟",
    text: "اطلاعات حذف شده قابلیت بازیابی ندارند",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "blue",
    cancelButtonColor: "red",
    confirmButtonText: "بله، حذف شود",
    cancelButtonText: "انصراف",
    customClass: {
      cancelButton: "text-black text-lg font-semiBold",
      confirmButton: "text-black text-lg font-semiBold"
    }
  }).then((result) => {
    if (result.isConfirmed) {
      deleteContact(id)
      // console.log('hazf shod ')
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,

      });
      Toast.fire({
        icon: "success",
        title: "مخاطب با موفقیت حذف شد"
      });
    }
  });
}
import { ref, reactive, computed } from "vue";

import { useContactStore } from '../stores/contacts.js';

import { Icon } from '@iconify/vue';
import { fa } from 'vuetify/locale';

const selectedContact = ref({

});
const dialog = ref(false);
const dialogEditState = ref(false)
const dialogRegisterState = ref(false)
const changePresistance = ref(false)

const toggleEditDialog = (item) => {
  selectedContact.value = { ...item }
  dialogEditState.value = !dialogEditState.value;
  console.log(dialogEditState.value);
};
const toggleRegisterDialog = () => {
  dialogRegisterState.value = !dialogRegisterState.value;
  console.log(dialogRegisterState.value);
};



const confirmDelete = ref(false)

const contactsStore = useContactStore();
// contactsStore.getAllContacts() 
const allContacts = contactsStore.getContacts
const contact_state = contactsStore.contacts





const deleteContact = (id) => {
  contactsStore.deleteContact(id);
};


const loading = ref(false)



import moment, { now } from 'moment-jalaali';
import Forms from '@/components/forms.vue';

import { useForm, defineRule, configure } from 'vee-validate';
import * as yup from 'yup';

// Define Yup schema for validation
// const schema = yup.object({
//   name: yup.string().required('Name is required').max(10, 'Name must be at most 10 characters'),
//   email: yup.string().required('Email is required').email('Email must be valid'),
//   select: yup.string().required('Please select an option'),
//   checkbox: yup.bool().oneOf([true], 'You must accept the terms'),
// });

// Vee-Validate form setup
// const { handleSubmit, values, errors, resetForm, isValid } = useForm({
//   validationSchema: schema,
// });



// Clear the form
const clearForm = () => {
  resetForm();
};


const email=ref('')
const name=ref('')
const password=ref('')


import { Form, Field , ErrorMessage} from 'vee-validate';

const onSubmit=(values)=>{
  console.log(JSON.stringify(values, null, 2));
}

const schema = yup.object({
  email: yup.string().required('it cant be empty').email('Enter a Valid Email'),
  name: yup.string().required('should fill the name'),
  password: yup.string().required('please set a password [ More than 8 Characters ]').min(8),
});



</script>
<template>
  <h2 class="text-center my-4 bg-green text-3xl text-black">
    دفترچه تلفن
  </h2>

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
          v-for="(item, index) in contactsStore.contacts"
          :key="index"
          class="text-right  bg-blue-950 text-lg cursor-pointer hover:bg-blue-900 border-b-4  hover:border-black border-transparent select-none "
          @dblclick="toggleEditDialog(item)"
        >
          <td
            v-if="contact_state.length > 0"
            class=" flex justify-end w-full gap-2 border-none "
          >
            <v-btn
              variant="flat"
              color="red"
              prepend-icon="mdi-delete"
              @click="showAlert(item.id)"
            >
              حذف
            </v-btn>
            <v-btn
              variant="flat"
              color="blue"
              prepend-icon="mdi-account"
              @click="toggleEditDialog(item)"
            >
              ویرایش
            </v-btn>
            <Forms
              v-model:model-state="dialogEditState"
              title="ویرایش مخاطب"
              :phone-model="selectedContact.phoneNumber"
              :fullname="selectedContact.fullname"
              :isCoworker="selectedContact.isCoworker"
              :selected-date="selectedContact.selectedDate"
              :edit-mode="true"
              :currentData="selectedContact.id"
              :DataFields="selectedContact"

            />
          </td>
          <td>{{ item.isCoworker ? 'بله' : 'خیر' }}</td>
          <td>{{ moment(item.selectedDate).format('jYYYY/jMM/jDD') }}</td>
          <td>{{ item.phoneNumber }}</td>
          <td>{{ item.fullname }}</td>
          <td>{{ item.id }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div class="addNewContact w-full flex justify-end py-5 px-3">
    <v-btn
      color="green"
      size="large"
      @click="toggleRegisterDialog"
    >
      <v-icon left>
        mdi-plus
      </v-icon>
      ثبت مخاطب
    </v-btn>
    <Forms
      v-model:model-state="dialogRegisterState"
      title="ثبت مخاطب"
      :register-mode="true"
    />
  </div>
 
  <div class="bg-red-500/20 w-full h-80">
    <Form @submit="onSubmit" :validation-schema="schema" class="flex flex-col text-lg gap-4">
      <Field
        v-model="name"
        name="name"
        type="name"
        placeholder="Enter you're name"
        
        class="p-5 bg-white rounded-lg w-60"/> 
    <ErrorMessage name="name"/>

    <Field name="email"  v-model="email" placeholder="enter ur email" class="p-5 w-60 bg-white rounded-lg"/> 
    <ErrorMessage name="email"/>
    <Field name="password" type="password" v-model="password"  placeholder="enter a valid password" class="p-5 w-60 bg-white rounded-lg"/>
    <ErrorMessage name="password"/>


    <button type="submit" class="bg-green-400 w-60 p-4 rounded-lg">Sign up for newsletter</button>

  </Form>
  </div>
</template>


<style scoped></style>