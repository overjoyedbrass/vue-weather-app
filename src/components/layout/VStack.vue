<script setup>
    const props = defineProps(['spacing'])
</script>

<template>
    <div :class="'vstack'">
        <slot/>
    </div>
</template>


<style scoped>
.vstack {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1 1 auto;
    height: 100%;
    overflow-y: auto;
    row-gap: v-bind('props.spacing || "1em"');
    /* flex: 1; */
}
</style>