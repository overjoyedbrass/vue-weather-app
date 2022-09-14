<script setup>
    const props = defineProps(['spacing'])
</script>

<template>
    <div :class="'hstack'">
        <slot/>
    </div>
</template>


<style scoped>
.hstack {
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: v-bind('props.spacing || "1em"');
}
</style>