<template>
  <h2 class="text-center my-4 bg-green text-3xl text-black">
    دفترچه تلفن
  </h2>
  <v-col class="flex bg-red-500/90 items-center justify-center">
    <v-btn
      color="green"
      @click="openMyDialog(undefined,'register')"
    >
      <v-icon left>
        mdi-plus
      </v-icon>
      ثبت مخاطب
    </v-btn>
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

            <v-dialog
              v-model="dialog"
              max-width="800"
              class="bg-teal-400/5 "
              :persistent="changePresistance"
            >
              <template
                #activator="{ props: activatorProps }"
              >
                <v-btn
                  class="text-none font-weight-regular"
                  prepend-icon="mdi-account"
                  text="ویرایش"
                  variant="flat"
                  v-bind="activatorProps"
                  @click="openMyDialog(item,'edit')"
                />
              </template>

              <v-card
                prepend-icon="mdi-account"
                :title="dialogMode === 'register' ?'فرم ثبت مخاطب' : 'فرم ویرایش مخاطب' "
                class="items-end "
              >
                <v-card-text class="text-right bg-gray-700 w-full  ">
                  <v-row
                    class=" justify-end   "
                  >
                    <v-col
                      cols="12"
                      md="4"
                      sm="6"
                      class=""
                    >
                      <v-text-field
                        :v-model="dialogMode === 'edit' ? selectedContact.phoneNumber : phoneNumber"
                        label="شماره تلفن"
                      />
                    </v-col>

                    <v-col
                      cols="24"
                      md="4"
                      sm="6"
                    >
                      <v-text-field
                      :v-model="dialogMode === 'edit' ? selectedContact.fullname : fullname"
                      label="نام و نام خانوادگی"
                      />
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                      :v-model="dialogMode === 'edit' ? selectedContact.selectedDate : selectedDate"
                        type="date"
                        label="انتخاب تاریخ تولد"
                      />
                    </v-col>

                    <v-col
                      cols="8"
                      class="d-flex justify-end"
                    >
                      <v-switch
                      :v-model="dialogMode === 'edit' ? selectedContact.isCoworker : isCoworker"
                        color="primary"
                      >
                        <template #label>
                          <span class="text-gray-100 text-lg font-bold">همکار</span>
                        </template>
                      </v-switch>
                    </v-col>
                  </v-row>
                  <v-col
                    cols="12"
                    class="mb-2 flex justify-start  "
                  >
                    <v-row class="gap-4 justify-end">
                      <v-btn
                        variant="flat"
                        color="red"
                        @click="cancelDialog()"
                      >
                        انصراف
                      </v-btn>

                      <v-btn
                        v-if="dialogMode === 'edit'"
                        :loading="loading"
                        variant="flat"
                        color="green"
                        @click="UpdateDialog(selectedContact.id)"
                      >
                        اعمال تغییرات
                      </v-btn>

                      <v-btn
                        v-if="dialogMode === 'register'"
                        :loading="loading"
                        variant="flat"
                        color="green"
                        @click="submitData(item)"
                      >
                        ثبت مخاطب
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-dialog>
          </td>
          <td>{{ item.isCoworker ? 'بله' : 'خیر' }}</td>
          <td>{{ moment(item.selectedDate).format('jYYYY/jMM/jDD') }}</td>
          <td>{{ item.phoneNumber }}</td>
          <td>{{ item.fullname }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div class="flex items-center justify-center pt-8 flex-col">
    <Form
      :validation-schema="schema"
      class="flex flex-col gap-2"
      @submit="onSubmit"
    >
      <div class="emailInput">
        <Field
          type="email"
          name="email"
          class="border-2 border-white bg-white p-[7px]"
          placeholder="email"
        />
        <ErrorMessage name="email" />
      </div>

      <div class="nameInput">
        <Field
          type="text"
          name="name"
          class="border-2 border-white bg-white p-[7px]"
          placeholder="name"
        />
        <ErrorMessage name="name" />
      </div>

      <div class="passwordInput">
        <Field
          type="password"
          name="password"
          class="border-2 border-white bg-white p-[7px]"
          placeholder="password "
        />
        <ErrorMessage name="password" />
      </div>

      <v-btn
        variant="flat"
        type="submit"
        color="green"
      >
        Sign up for newsletter
      </v-btn>
    </Form>
    <date-picker
      v-model="date"
      format="YYYY-MM-DD"
      display-format="jYYYY jDD jMMMM "

      class="mt-6 bg-green-500/20 "
    />
    <v-btn
      variant="flat"
      color="green"
      class="mt-4"
      @click="submitJalali()"
    >
      Submit Tarikh
    </v-btn>
  </div>
</template>

<script setup>
import DatePicker from 'vue3-persian-datetime-picker'
import Swal from "sweetalert2";

const dialogMode = ref('')



const date=ref('')
const submitJalali=()=>{
  console.log(date.value)
}

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
    console.log('hazf shod ')
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
  console.log('Form submitted!');
  console.log(JSON.stringify(values, null, 2));
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
  console.log('Delete Contact Successfuly Recalled')
};
console.log(contact_state);

const openMyDialog = (item,mode) => {
  dialogMode.value = mode 
  selectedContact.value = { ...item };
  dialog.value = true;
  console.log(selectedContact.value);
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
  console.log(contactsStore.contacts[contactsStore.contacts.length - 1]);
  dialog.value = false
  
}



</script>
<style scoped>

</style>