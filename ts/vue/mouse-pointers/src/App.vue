<template>
  <mouse-canvas participantName="Zeus" :roomId="roomId"/>
  <mouse-canvas participantName="Hera" :roomId="roomId"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import MouseCanvas from './components/MouseCanvas.vue';

import { v4 as uuidv4 } from "uuid";


export default defineComponent({
  name: 'App',
  components: { MouseCanvas }, 
  setup() {
    const roomId = ref(uuidv4()).value;

    return {
      roomId,
    };
  }
});
</script>