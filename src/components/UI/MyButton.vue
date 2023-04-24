<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>

export default {
    name: 'my-button'
}
</script>
<style scoped>
button {
    background: none;
    border: 1px solid #000;
    width: 100px;
    display: inline;
    padding: 10px;
    font-weight: bold;
}
</style>