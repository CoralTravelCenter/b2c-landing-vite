<script setup>
import {ref} from "vue";

const counter = ref(0)

function increment() {
	counter.value++
}
</script>

<template>
	<h2>Я код который рендерит Vue</h2>
	<p>{{ counter }}</p>
	<button class="prime-btn" @click="increment">Клик ми</button>
</template>
