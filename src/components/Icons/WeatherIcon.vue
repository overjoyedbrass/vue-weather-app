<script setup>
const props = defineProps(['icon_id', 'description'])

</script>


<template>
    <img
        class="wIcon"
        :src="`http://openweathermap.org/img/wn/${props?.icon_id.replace('n', 'd')}@2x.png`"
        :alt="props.description || 'bad src'"
    />
</template>

<style scope>
    .wIcon {
        max-width: 100px;
        max-height: 100px;
    }
</style>