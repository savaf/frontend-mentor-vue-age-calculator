<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate';
// import { useField } from 'vee-validate';
import { ref } from 'vue';
import DateField from '~/components/DateField.vue';
import ActionDivider from '~/components/ActionDivider.vue';
import Durations, { durationsLabels } from '~/components/Durations.vue';


const dateForm = ref(null)
const dayText = ref<String|null>(null);
const monthText = ref<String|null>(null);
const yearText = ref<String | null>(null);
let durationsValues = ref<any>(null);


function computeDuration() : durationsLabels {
  const day = parseInt(dayText.value);
  const month = parseInt(monthText.value);
  const year = parseInt(yearText.value);

  const dateFrom = new Date(year, month, day);
  const dateTo = new Date();

  let diffYears = dateTo.getFullYear() - dateFrom.getFullYear();
  let diffMonths= dateTo.getMonth() - dateFrom.getMonth();
  let diffDays = dateTo.getDate() - dateFrom.getDate();

  if (diffMonths < 0 || (diffMonths === 0 && diffDays < 0)) {
    diffYears--;
    if (dateTo.getMonth() < dateFrom.getMonth()) {
      diffMonths = 12 - dateFrom.getMonth() + dateTo.getMonth();
    } else {
      diffMonths = dateTo.getMonth() - dateFrom.getMonth();
    }
    if (dateTo.getDate() < dateFrom.getDate()) {
      diffDays = new Date(dateTo.getFullYear(), dateTo.getMonth(), 0).getDate() - dateFrom.getDate() + dateTo.getDate();
    } else {
      diffDays = dateTo.getDate() - dateFrom.getDate();
    }
  }

  return {
    diffYears,
    diffMonths,
    diffDays
  } as durationsLabels
}



const { validate : validateDateForm } = useForm();
async function showDuration() {
  console.log("run showDuration")
  const { valid: isValid } = await validateDateForm()

  console.log(isValid)
  if (isValid) {
    durationsValues.value = computeDuration();
  }
}


</script>

<template>
  <main class="flex justify-center items-center w-full h-screen">
    <div class="
      w-[343px]
      h-[486px]
      lg:w-[840px]
      lg:h-[651px]
    bg-white rounded-convex
      p-6
      pb-12
      lg:p-14
    ">
      <Form ref="dateForm" class="flex gap-4 lg:gap-8 w-full" @submit.prevent="onSubmit">
        <DateField
          name="day"
          label="day"
          v-model="dayText"
          placeholder="DD"
          rules="required|integer|min_value:1|max_value:31"
        />
        <DateField
          name="month"
          label="month"
          v-model="monthText"
          placeholder="MM"
          rules="required|integer|min_value:1|max_value:12"
        />
        <DateField
          name="year"
          label="year"
          v-model="yearText"
          placeholder="YYYY"
          :rules="`required|integer|min_value:1|max_value:${(new Date()).getFullYear()}`"
        />
      </Form>
      <ActionDivider @click="showDuration" class="my-8 lg:m-0" />
      <Durations :durations="durationsValues" />
    </div>
  </main>
  
</template>

<style>

</style>
