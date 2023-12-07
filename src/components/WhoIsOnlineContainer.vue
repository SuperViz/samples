<template>
  <section>
    <button @click="initWhoIsOnline">Enter Who-is-Online as {{ participantName }}</button>
    <div :id="containerId" />
  </section>
</template>

<script lang="ts">
import SuperVizRoom from "@superviz/sdk";
import { WhoIsOnline } from "@superviz/sdk/lib/components";

import { ref, defineComponent } from "vue";

const groupId = "sv-sample-room-vue-ts-who-is-online";
const groupName = "Sample Room for Who Is Online (Vue/TS)";

const DEVELOPER_KEY = process.env.VUE_APP_SUPERVIZ_DEVELOPER_TOKEN as string;

export default defineComponent({
  name: "WhoIsOnlineContainer",
  props: {
    participantName: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const containerId = ref(props.participantName + "-container");
    const userId = ref(props.participantName.toLowerCase());
    const loaded = ref(false);

    async function initWhoIsOnline() {
      const room = await SuperVizRoom(DEVELOPER_KEY, {
        roomId: props.roomId,
        group: {
          id: groupId,
          name: groupName,
        },
        participant: {
          id: userId.value,
          name: props.participantName,
        },
      });

      const mousePointer = new WhoIsOnline(containerId.value);
      room.addComponent(mousePointer);
    }

    return {
      containerId,
      initWhoIsOnline,
    };
  },
});
</script>
