<script setup>
import { ref, watch, computed , reactive, onMounted } from 'vue';
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



const state = reactive({
  form:{
    id:null,
    fullname: null,
    phoneNumber:null,
    selectedDate:null,
    isCoworker:false
  }
})

onMounted(()=>{
  state.form = {...props.allFormsFields}
  console.log(state.form);
  
})


const schema = yup.object({
  fullname: yup.string().nullable(true).required("نوشتن نام و نام خانوادگی الزامیست"),
  phoneNumber:yup.string().nullable(true).required("وارد کردن شماره تلفن الزامیست"),
  selectedDate:yup.string().nullable(true).required("وارد کردن تاریخ تولد الزامیست")
});

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
  initialValues: state.form,
});

const { value: fullname } = useField("fullname");
const { value: phoneNumber } = useField("phoneNumber");
const { value: selectedDate } = useField("selectedDate");

const handleSubmitFormClick = handleSubmit( () => {
  props.registerMode ? submitData() :'!'

});

const handleSubmitFormClickByEdit = (item)=>{
  handleSubmit( () => {
  props.editMode ? UpdateDialog(item) :'?'

});
}

const submitNewData = ()=>{
  // emit('update:modelState', false);
  state.form.fullname = fullname.value
  state.form.phoneNumber = phoneNumber.value
  state.form.selectedDate = selectedDate.value
  alert(state.form.fullname)
}

// const schema = yup.object({
//   phoneNumber: yup.string().required('شماره تلفن الزامی است').min(11, 'شماره تلفن باید حداقل 11 کاراکتر باشد'),
//   fullname: yup.string().required('نام و نام خانوادگی الزامی است'),
//   selectedDate: yup.string().required('تاریخ تولد الزامی است'),
// });


watch(() => props.allFormsFields, (newFields) => {
  // localFields.value = { ...newFields };
  Object.assign(localFields, newFields);

});


// const convertNumbersToPersian = (text) => {
//   const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//   const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

//   let result = text;
//   for (let i = 0; i < englishNumbers.length; i++) {
//     const regex = new RegExp(englishNumbers[i], 'g');
//     result = result.replace(regex, persianNumbers[i]);
//   }
//   return result;
// }








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
    phoneNumber: phoneNumber.value,
    fullname: fullname.value,
    selectedDate: selectedDate.value,
    isCoworker: state.form.isCoworker,
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
    phoneNumber.value = null
    fullname.value = null
    selectedDate.value = null
    state.form.isCoworker = false
    loading.value = false
  }, 1700);


}


const cancelDialog = () => {
console.log(localFields.phoneNumber);

  emit('update:modelState', false);
    phoneNumber.value = ''
    fullname.value = ''
    selectedDate.value = ''
    state.form.isCoworker = false
    if(props.editMode){

      emit('update:registerMode', false);
    }else if (props.registerMode){
      emit('update:editMode', false);
      
    }

  console.log(props.modelState);


};
const UpdateDialog = (idModel) => {
  console.log(localFields.phoneNumber);
  loading.value = true

  const updatedContact = {
    // id: props.currentData,
    // phoneNumber: phoneNumber.value,
    // fullname: fullname.value,
    // selectedDate: selectedDate.value,
    // isCoworker: state.form.isCoworker,
    id: props.currentData,
    phoneNumber: state.form.phoneNumber,
    fullname: state.form.fullname,
    selectedDate: state.form.selectedDate,
    isCoworker: state.form.isCoworker,
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
  phoneNumber.value = ''
     fullname.value = ''
    selectedDate.value = ''
    state.form.isCoworker= false
  }, 1700);


}

</script>
<template>
  <v-dialog
    v-model="props.modelState"
    max-width="800"
    class="bg-teal-400/0"
    @click:outside="cancelDialog"

  >
    <!-- :persistent="changePresistance" -->


    <v-card
      prepend-icon="mdi-account"
      :title="props.title"
      class="items-end "
    >
    <v-container>
      <v-card-text class="text-right bg-sky-700 w-full  ">
        <v-row class=" justify-end  bg-red-400  ">
          <v-col
            cols="24"
            md="4"
            sm="6"
            class="flex flex-col bg-black"
          >
            <v-text-field
              v-model="phoneNumber"
              label="شماره تلفن"
              placeholder="مثال : 09928717522"
            />
            <!-- :error-messages="phoneNumberError" -->

          <error-message name="phoneNumber" class=" text-red-500 text-center"></error-message>

          </v-col>

          <v-col
            cols="24"
            md="4"
            sm="6"
            class="flex flex-col w-full bg-white"
          >
            <v-text-field
              v-model="fullname"
              label="نام و نام خانوادگی"
              placeholder="مثال : علی علوی"
            />
          <error-message name="fullname" class=" text-red-500 text-center"></error-message>
          </v-col>
          <v-col cols="8">
            <date-picker
              v-model="selectedDate"
              format="YYYY-MM-DD"
              display-format="jYYYY-jMM-jDD"
              placeholder="تاریخ تولد خود را وارد کنید"

            />
          <error-message name="selectedDate" class="text-red-500 text-center"></error-message>

          </v-col>
          

          <v-col
            cols="8"
            class="d-flex justify-end"
          >
            <v-switch
              v-model="state.form.isCoworker"
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
              @click="handleSubmitFormClick()"
            >
              ثبت مخاطب
            </v-btn>
          </v-row>
        </v-col>
      </v-card-text>
    </v-container>

    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>