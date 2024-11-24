<script setup>
import DatePicker from 'vue3-persian-datetime-picker'
import Swal from "sweetalert2";

const dialogMode = ref('')



const date=ref('')

const showAlert = (id) => {
  Swal.fire({
  title: "آیا از حذف مخاطب اطمینان دارید؟",
  text: "اطلاعات حذف شده قابلیت بازیابی ندارند",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "blue",
  cancelButtonColor: "red",
  confirmButtonText: "بله، حذف شود",
  cancelButtonText:"انصراف",
  customClass:{
    cancelButton:"text-black text-lg font-semiBold",
    confirmButton:"text-black text-lg font-semiBold"
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
import { ref , computed } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
const schema = yup.object({
  email: yup.string().required().email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Please use The Correct Email'),
  name: yup.string().required(),
  password: yup.string().required().min(8),
});
import { useContactStore } from '../stores/contacts.js';
import { Icon } from '@iconify/vue';
import { email } from '@vee-validate/rules';
import { fa } from 'vuetify/locale';

const selectedContact = ref({});
const dialog = ref(false);
const changePresistance= ref(false)

const validateEmail = (value) => {
  if (!value) {
    return 'مقدار این فیلد نمیتواند خالی باشد';
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return 'exmaple@gmail.com باید یک ایمیل صحیح وارد کنید مثل ';
  }
  return true;
}

const onSubmit = (values) => {
  // console.log('Form submitted!');
  // console.log(JSON.stringify(values, null, 2));
  // console.log(values);
}

const confirmDelete = ref(false)

const contactsStore = useContactStore();
// contactsStore.getAllContacts() 
const allContacts = contactsStore.getContacts
const contact_state = contactsStore.contacts

const formDialog= (formType)=>{
  const title = "formType."
}



const deleteContact = (id) => {
  contactsStore.deleteContact(id);
};

const openMyDialog = (item,mode) => {
  dialogMode.value = mode 
  selectedContact.value = { ...item };
  dialog.value = true;
  // console.log(selectedContact.value);
  changePresistance.value = false


};
const loading = ref(false)


const UpdateDialog = (id) => {
  loading.value = true
  changePresistance.value = true 
  setTimeout(() => {
    contactsStore.updateContact(id, selectedContact.value);
    loading.value = false
    // Show a success toast notification

  }, 1500);
  setTimeout(() => {
    dialog.value = false
    Swal.fire({
      icon: 'success',
      title: 'ویرایش مخاطب با موفقیت انجام شد',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }, 1700);
  

}

const cancelDialog = () => {
  dialog.value = false;
}
import moment, { now } from 'moment-jalaali';
import Forms from '@/components/forms.vue';




const fullname = ref('')
const phoneNumber = ref('')
const selectedDate = ref('');
const isCoworker = ref(false);


const allContactInfo = computed(() => ({
  id: contactsStore.contacts.length + 1,
  fullname: fullname.value,
  phoneNumber: phoneNumber.value,
  selectedDate: selectedDate.value,
  isCoworker: isCoworker.value

}))

const submitData = () => {
  contactsStore.addContact(allContactInfo.value)
  // console.log(contactsStore.contacts[contactsStore.contacts.length - 1]);
  dialog.value = false
  
}



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
          v-for="item in contactsStore.contacts"
          :key="item.id"
          class="text-right bg-blue-950 text-lg cursor-pointer hover:bg-blue-900 select-none"
          @dblclick="openMyDialog(item,'edit')"
        >
          <td
            v-if="contact_state.length > 0"
            class=" flex justify-end w-full gap-2 "
          >
            <v-btn
              variant="flat"
              color="red"
              prepend-icon="mdi-delete"
              @click="showAlert(item.id)"
            >
              حذف
            </v-btn>
            <Forms
              title="Random"
              :change-presistance="changePresistance"
              :open-my-dialog="openMyDialog(item,'edit')"
              :phone-number="item.phoneNumber"
              :fullname="item.fullname"
              :is-coworker="item.isCoworker"
              :birth-date="item.selectedDate"
            />
          </td>
          <td>{{ item.isCoworker ? 'بله' : 'خیر' }}</td>
          <td>{{ moment(item.selectedDate) === false ? 'تاریخ درج نشده' : moment(item.selectedDate).format('jYYYY/jMM/jDD') }}</td>
          <td>{{ item.phoneNumber }}</td>
          <td>{{ item.fullname }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div class="addNewContact w-full flex justify-end py-5 px-3">
    <v-btn
    color="green"
    size="large"
    @click="openMyDialog(undefined,'register')"
  >
    <v-icon left>
      mdi-plus
    </v-icon>
    ثبت مخاطب
  </v-btn>
  </div>
</template>


<style scoped>

</style>