<script setup>
import { ref, watch, computed } from 'vue';
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import { useContactStore } from '../stores/contacts.js';
import Swal from "sweetalert2";
import * as yup from 'yup';

import { Form, Field, ErrorMessage } from 'vee-validate';
import { useField, useForm } from "vee-validate";

const schema = yup.object({
  phoneNumber: yup.string().required('شماره تلفن الزامی است').min(11, 'شماره تلفن باید حداقل 11 کاراکتر باشد'),
  fullname: yup.string().required('نام و نام خانوادگی الزامی است'),
  selectedDate: yup.string().required('تاریخ تولد الزامی است'),
});


const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});




const contactsStore = useContactStore();

const props = defineProps({
  title: String,
  modelState: Boolean,
  phoneModel: String,
  fullname: String,
  selectedDate: String,
  isCoworker: Boolean,
  openMyDialog: Function,
  editMode: Boolean,
  registerMode: Boolean,
  currentData: Object,
  UpdateDialog: Function,
  formFieldsData:Object
})
console.log(props.formFieldsData.value);


const phoneModel = ref(props.DataFields || '');
const fullname = ref(props.DataFields || '');
const selectedDate = ref(props.DataFields || '');
const isCoworker = ref(props.DataFields);

// Define fields using useField
const { value: phoneModelValidate, errorMessage: phoneModelValidateError } = useField('phoneModel');
const { value: fullNameValidate, errorMessage: fullNameValidateError } = useField('fullname');
const { value: selectedBirthDateValidate, errorMessage: selectedBirthDateValidateError } = useField('selectedDate');



const loading = ref(false)



// Watch for changes in props and update the reactive variables
watch(() => props.DataFields.phoneNumber, (newVal) => {
  props.DataFields.phoneNumber = newVal;
});

watch(() => props.fullname, (newVal) => {
  fullname.value = newVal;
});

watch(() => props.selectedDate, (newVal) => {
  selectedDate.value = newVal;
});

watch(() => props.isCoworker, (newVal) => {
  isCoworker.value = newVal;
});
const emit = defineEmits();

const submitData = () => {
  loading.value = true
  const registerContactInfo = {
    id: contactsStore.contacts.length + 1,
    phoneNumber: phoneModel.value,
    fullname: fullname.value,
    selectedDate: selectedDate.value,
    isCoworker: isCoworker.value,
  };
  console.log(contactsStore.contacts.length + 1);
  console.log(registerContactInfo);

  setTimeout(() => {
    contactsStore.addContact(registerContactInfo)
    emit('update:modelState', false);


  }, 1500)


  setTimeout(() => {
    Swal.fire({
      icon: 'success',
      title: ' مخاطب با موفقیت ثبت شد',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    phoneModel.value = ''
    fullname.value = ''
    selectedDate.value = ''
    isCoworker.value = ''
    loading.value = false
  }, 1700);


}
const cancelDialog = () => {
  emit('update:modelState', false);
  if (props.registerMode) {
    phoneModel.value = ''
    fullname.value = ''
    selectedDate.value = ''
    isCoworker.value = ''
    emit('update:registerMode', false);
  }

  console.log(props.modelState);

};
const UpdateDialog = (idModel) => {
  console.log(isCoworker.value);
  loading.value = true

  console.log(props.DataFields)
  // console.log(contactsStore.contacts)
  // console.log(birthDate.value)
  const updatedContact = {
    id: props.currentData,
    phoneNumber: phoneModel.value,
    fullname: fullname.value,
    selectedDate: selectedDate.value,
    isCoworker: isCoworker.value,
  };


  setTimeout(() => {
    contactsStore.updateContact(idModel, updatedContact);
    console.log(props.currentData)
    console.log(updatedContact);

    emit('update:modelState', false);

  }, 1500);
  setTimeout(() => {
    Swal.fire({
      icon: 'success',
      title: ' مخاطب ویرایش  شد',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,

    });
    loading.value = false
    phoneModel.value = ''
    fullname.value = ''
    selectedDate.value = ''
    isCoworker.value = ''
  }, 1700);


}

</script>
<template>
  <v-dialog v-model="props.modelState" max-width="600" class="bg-teal-400/5">
    <!-- :persistent="changePresistance" -->


    <v-card prepend-icon="mdi-account" :title="props.title" class="items-end ">
      <v-card-text class="text-right bg-gray-700 w-full  ">
        <v-row class=" justify-end   ">
          <v-col cols="12" md="4" sm="6" class="">
            <v-text-field v-model="phoneModel" label="شماره تلفن" placeholder="مثال : 09928717522"
              :error-messages="phoneNumberError" />
          </v-col>

          <v-col cols="24" md="4" sm="6">
            <v-text-field v-model="fullname" label="نام و نام خانوادگی" placeholder="مثال : علی علوی" />
          </v-col>
          <v-col cols="8">
            <date-picker v-model="selectedDate" format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"
              placeholder="تاریخ تولد خود را وارد کنید" />
          </v-col>

          <v-col cols="8" class="d-flex justify-end">
            <v-switch v-model="isCoworker" color="primary">
              <template #label>
                <span class="text-gray-100 text-lg font-bold">همکار</span>
              </template>
            </v-switch>
          </v-col>
        </v-row>
        <v-col cols="12" class="mb-2 flex justify-start  ">
          <v-row class="gap-4 justify-end">
            <v-btn variant="flat" color="red" @click="cancelDialog()" :disabled="loading">
              انصراف
            </v-btn>

            <v-btn v-if="props.editMode" :loading="loading" variant="flat" type="submit" color="green"
              @click="UpdateDialog(currentData)">
              اعمال تغییرات
            </v-btn>

            <v-btn v-if="props.registerMode" :loading="loading" variant="flat" color="green" @click="submitData(item)">
              ثبت مخاطب
            </v-btn>
          </v-row>
        </v-col>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>