<template>
  <button :disabled="isRunning" @click="initSuperVizRoom">Join Video Conference</button>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue';
import { v4 as uuidv4 } from "uuid";
import SuperVizRoom from "@superviz/sdk";
import { VideoConference } from "@superviz/sdk/lib/components";

const groupId = "sv-sample-room-vue-js-video-conference";
const groupName = "Sample Room for Video Conference (Vue/JS)";
const DEVELOPER_KEY = process.env.VUE_APP_SUPERVIZ_DEVELOPER_TOKEN;


export default defineComponent({
  name: 'App',
  setup() {
    const isRunning = ref(false);

    const initSuperVizRoom = async () => {
      isRunning.value = true;
      const roomId = uuidv4();
      const room = await SuperVizRoom(DEVELOPER_KEY, {
        roomId: roomId,
        group: {
          id: groupId,
          name: groupName,
        },
        participant: {
          id: "zeus",
          name: "Zeus",
        },

      });

      const video = new VideoConference({
        participantType: "host",
      });

      room.addComponent(video);
    };

    return {
      isRunning,
      initSuperVizRoom,
    };
  }
});
</script>
