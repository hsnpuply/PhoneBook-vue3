<script setup>
import {ref , defineProps, defineEmits , watch } from 'vue';
import { useContactStore } from '../stores/contacts.js';
import Swal from "sweetalert2";
const contactsStore = useContactStore();

const props = defineProps({
  title: String,
  changePresistance: Boolean,
  modelState:Boolean,
  phoneModel:String,
  fullname:String,
  birthDate:String,
  isCoworker:Boolean,
  openMyDialog : Function,
  submitData:Function,
  editMode:Boolean,
  registerMode:Boolean,
  currentData:Object,
  UpdateDialog:Function

})

const phoneModel = ref(props.phoneModel || '');
const fullname = ref(props.fullname || '');
const birthDate = ref(props.birthDate || '');
const isCoworker = ref(props.isCoworker || false);


// Watch for changes in props and update the reactive variables
watch(() => props.phoneModel, (newVal) => {
  phoneModel.value = newVal;
});

watch(() => props.fullname, (newVal) => {
  fullname.value = newVal;
});

watch(() => props.birthDate, (newVal) => {
  birthDate.value = newVal;
});

watch(() => props.isCoworker, (newVal) => {
  isCoworker.value = newVal;
});
const emit = defineEmits();


const cancelDialog = () => {
  emit('update:modelState', false);
  console.log(props.modelState);
  
};
const UpdateDialog = (idModel) => {
  alert(idModel)
  const updatedContact = {
    id: props.currentData,
    phoneNumber: phoneModel.value,
    fullname: fullname.value,
    birthDate: birthDate.value,
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
      title: 'ویرایش مخاطب با موفقیت انجام شد',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }, 1700);
  

}

</script>
<template>
  <v-dialog
    v-model="props.modelState"
    max-width="800"
    class="bg-teal-400/5"
  >
    <!-- :persistent="changePresistance" -->


    <v-card
      prepend-icon="mdi-account"
      :title="props.title"
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
              v-model="phoneModel"
              label="شماره تلفن"
              :placeholder="props.phoneModel"
            />
          </v-col>

          <v-col
            cols="24"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="fullname"
              label="نام و نام خانوادگی"
              :placeholder="props.fullname"

            />
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="birthDate"
              type="date"
              label="انتخاب تاریخ تولد"
            />
          </v-col>

          <v-col
            cols="8"
            class="d-flex justify-end"
          >
            <v-switch
              v-model="isCoworker"
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
              v-if="props.editMode"
              :loading="loading"
              variant="flat"
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