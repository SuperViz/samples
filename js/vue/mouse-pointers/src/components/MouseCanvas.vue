<template>
  <section>
    <h1>View from "{{ participantName }}" participant</h1>
    <canvas :id="canvasId" />
  </section>
</template>
  
<script>
  import SuperVizRoom from "@superviz/sdk";
  import { MousePointers } from "@superviz/sdk/lib/components";
  
  import { ref, onMounted, defineComponent } from "vue";
  
  const groupId = "sv-sample-room-vue-js-mouse-pointers";
  const groupName = "Sample Room for Mouse Pointers (Vue/JS)";

  const DEVELOPER_KEY = process.env.VUE_APP_SUPERVIZ_DEVELOPER_TOKEN;
  
  export default defineComponent({
    name: 'MouseCanvas',
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
      const canvasId = ref(props.participantName + "-canvas");
      const userId = ref(props.participantName.toLowerCase());
      const loaded = ref(false);
      
      async function InitSuperVizMousePointers() {
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
          environment: "dev",
        });
  
        const mousePointer = new MousePointers(canvasId.value);
        room.addComponent(mousePointer);
      }
  
      onMounted(async () => {
        if (loaded.value) return;
        await InitSuperVizMousePointers();
        
        return () => {
          loaded.value = true;
        };
      });
  
      return {
        canvasId,
      };
    },
  });
  </script>