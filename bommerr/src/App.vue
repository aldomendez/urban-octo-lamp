<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <p>{{ author }}</p>
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  props: ['author'],
  components: {
    Hello
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
