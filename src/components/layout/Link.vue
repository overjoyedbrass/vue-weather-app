<script setup>
const props = defineProps(['to'])
</script>

<template>
    <a :href="props.to" target="blank"> 
        <slot />
    </a>
</template>

<style scoped>
    a {
        text-decoration: none;
        color: inherit;
    }
</style>