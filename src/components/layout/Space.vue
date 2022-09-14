<script setup>
    const props = defineProps(['space']);
</script>

<template>
    <div class="space">

    </div>
</template>
<style>
    .space {
        content: " ";
        height: v-bind("props.space || '1em'")
    }
</style>