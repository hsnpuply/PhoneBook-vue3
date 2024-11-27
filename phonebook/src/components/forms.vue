<script setup>
import { ref, watch, computed , reactive } from 'vue';
import { useContactStore } from '../stores/contacts.js';
import Swal from "sweetalert2";
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useField, useForm } from "vee-validate";

const props = defineProps({
  title: String,
  modelState: Boolean,
  openMyDialog: Function,
  editMode: Boolean,
  registerMode: Boolean,
  currentData: Object,
  UpdateDialog: Function,
  allFormsFields:Object

})
const contactsStore = useContactStore();
const loading = ref(false)

const emit = defineEmits(['update:modelState', 'update:allFormsFields']);

// Local reactive variables
const localFields = reactive({ ...props.allFormsFields });

watch(() => props.allFormsFields, (newFields) => {
  // localFields.value = { ...newFields };
  Object.assign(localFields, newFields);

});


const convertNumbersToPersian = (text) => {
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  let result = text;
  for (let i = 0; i < englishNumbers.length; i++) {
    const regex = new RegExp(englishNumbers[i], 'g');
    result = result.replace(regex, persianNumbers[i]);
  }
  return result;
}

const schema = yup.object({
  phoneNumber: yup.string().required('شماره تلفن الزامی است').min(11, 'شماره تلفن باید حداقل 11 کاراکتر باشد'),
  fullname: yup.string().required('نام و نام خانوادگی الزامی است'),
  selectedDate: yup.string().required('تاریخ تولد الزامی است'),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});




// const updateField = (key, value) => {
//   localFields.value[key] = value;
//   emit('update:allFormsFields', { ...localFields.value });
//   console.log(localFields.value[key]);
  
// };


// // Define fields using useField
// const { value: allFormsField , errorMessage: phoneModelValidateError } = useField('phoneModel');
// const { value: fullNameValidate  , errorMessage : fullNameValidateError} = useField('fullname');
// const { value: selectedBirthDateValidate , errorMessage : selectedBirthDateValidateError } = useField('selectedDate');





const submitData = () => {
  loading.value = true
  const registerContactInfo = {
    id: contactsStore.contacts.length + 1,
    phoneNumber: localFields.phoneNumber,
    fullname: localFields.fullname,
    selectedDate: localFields.selectedDate,
    isCoworker: localFields.isCoworker,
  };
  console.log(contactsStore.contacts.length + 1);
  console.log(registerContactInfo);

  setTimeout(() => {
    contactsStore.addContact(registerContactInfo)
    emit('update:modelState', false);
    

  },1500)


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
    localFields.phoneNumber = ''
    localFields.fullname = ''
    localFields.selectedDate = ''
    localFields.isCoworker = false
    loading.value = false
  }, 1700);


}
const cancelDialog = () => {
console.log(localFields.phoneNumber);

  emit('update:modelState', false);
  if(props.registerMode){
    localFields.phoneNumber = ''
    localFields.fullname = ''
    localFields.selectedDate = ''
    localFields.isCoworker = false
  emit('update:registerMode', false);
  }

  console.log(props.modelState);

};
const UpdateDialog = (idModel) => {
  console.log(localFields.fullname);
  loading.value = true


  console.log(contactsStore.contacts)
  // console.log(birthDate.value)
  const updatedContact = {
    id: props.currentData,
    phoneNumber: localFields.phoneNumber,
    fullname: localFields.fullname,
    selectedDate: localFields.selectedDate,
    isCoworker: localFields.isCoworker,
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
  localFields.phoneModel = ''
     localFields.fullname = ''
    localFields.selectedDate = ''
    localFields.isCoworker = ''
  }, 1700);


}

</script>
<template>
  <v-dialog
    v-model="props.modelState"
    max-width="600"
    class="bg-teal-400/5"
  >
    <!-- :persistent="changePresistance" -->


    <v-card
      prepend-icon="mdi-account"
      :title="props.title"
      class="items-end "
    >
      <v-card-text class="text-right bg-gray-700 w-full  ">
        <v-row class=" justify-end   ">
          <v-col
            cols="12"
            md="4"
            sm="6"
            class=""
          >
            <v-text-field
              v-model="localFields.phoneNumber"
              label="شماره تلفن"
              placeholder="مثال : 09928717522"
              :error-messages="phoneNumberError"
            />
          </v-col>

          <v-col
            cols="24"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="localFields.fullname"
              label="نام و نام خانوادگی"
              placeholder="مثال : علی علوی"
            />
          </v-col>
          <v-col cols="8">
            <date-picker
              v-model="localFields.selectedDate"
              format="YYYY-MM-DD"
              display-format="jYYYY-jMM-jDD"
              placeholder="تاریخ تولد خود را وارد کنید"

            />
          </v-col>

          <v-col
            cols="8"
            class="d-flex justify-end"
          >
            <v-switch
              v-model="localFields.isCoworker"
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
              :disabled="loading"
            >
              انصراف
            </v-btn>

            <v-btn
              v-if="props.editMode"
              :loading="loading"
              variant="flat"
              type="submit"
              color="green"
              @click="UpdateDialog(currentData)"
            >
              اعمال تغییرات
            </v-btn>

            <v-btn
              v-if="props.registerMode"
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
</template>

<style scoped>

</style>