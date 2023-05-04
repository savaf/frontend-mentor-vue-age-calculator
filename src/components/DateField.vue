<script setup lang="ts">
import { useField } from 'vee-validate';

const {
    name,
    label,
    placeholder,
    modelValue,
    rules
} = defineProps<{
    name: string
    label: string
    modelValue: string | null
    placeholder: string,
    rules: string
}>()

defineEmits(['update:modelValue']); 

const { errors } = useField(name, rules);
</script>

<template>
    <label 
        :for="name"
        class="
            flex
            flex-col
            heading-s
            text-grey not-italic
            font-bold
            uppercase
            w-[87.67px] lg:w-40
            h-[76px] lg:h-[101px] 
            p-0
            lg:gap-2
        "

        :class="{
            'text-red-light' : errors.length
        }"
    >
        {{ label }}
        <input 
            type="text"
            :name="name"
            :id="name"
            :value="modelValue"
            class="
                flex
                flex-row
                items-center
                heading-m
                text-black-off
                w-[87.67px] lg:w-40
                h-[54px] lg:h-[72px]
                rounded-lg
                border-line
                py-3
                px-4 lg:px-6
                placeholder:opacity-50
            "
            :class="{
                'text-red-light border-red-light' : errors.length
            }"
            :placeholder="placeholder"
            @input="(event) => $emit('update:modelValue', event.target.value)"
            :rules="rules"
        />

        <!-- <span>
            {{ errorMessage }}
        </span> -->
        <template v-if="errors.length">
            <p 
                v-for="message in errors"
                :key="message"
                class="text-body text-[10px] lg:text-sm  text-red-light normal-case"
            >
                <span class="capitalize">
                    {{ message.split(' ')[0] }}
                </span>
                {{ message.split(' ').slice(1).join(' ') }}
            </p>
        </template>
    </label>
</template>