<script setup>
import VStack from '../layout/VStack.vue'

const props = defineProps(['code'])
</script>

<template>
    <div>
        <VStack spacing="0em">
            <span class="error">{{ code }}</span>
            <span class="error-text">
                <slot />
            </span>
        </VStack>

        </div>
</template>
<style scoped>
    .error {
        font-size: 5em;
        color: rgb(255, 1, 120);
    }
    .error-text {
        color: rgba(255, 230, 0, 0.76);
        font-size: 1.5em;
    }
</style>