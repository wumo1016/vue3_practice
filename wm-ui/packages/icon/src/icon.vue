<template>
  <i :class="`wm-icon-${name}`"></i>
</template>

<script>
  export default {
    name: 'WmIcon',
    props: {
      name: {
        type: String,
        default: ''
      }
    }
  }
</script>
