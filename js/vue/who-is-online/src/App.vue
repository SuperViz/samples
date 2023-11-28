<template>
  <main>
    <!-- We are initializing multiple rooms for demo purposes. -->
    <who-is-online-container participantName="Zeus" :roomId="roomId"/>
    <who-is-online-container participantName="Hera" :roomId="roomId"/>
    <who-is-online-container participantName="Apollo" :roomId="roomId"/>
    <who-is-online-container participantName="Artemis" :roomId="roomId"/>
    <who-is-online-container participantName="Dionysus" :roomId="roomId"/>
    <who-is-online-container participantName="Athena" :roomId="roomId"/>
  </main>
</template>

<script>
import { defineComponent, ref } from 'vue';

import WhoIsOnlineContainer from './components/WhoIsOnlineContainer.vue';

import { v4 as uuidv4 } from "uuid";


export default defineComponent({
  name: 'App',
  components: { WhoIsOnlineContainer }, 
  setup() {
    const roomId = ref(uuidv4()).value;

    return {
      roomId,
    };
  }
});
</script>