<template>
  <q-item>
    <q-item-section style="cursor: pointer">
      <q-item-label>
        <p style="margin: 0px">
          {{ task.content }}
        </p>
      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn class="gt-xs" size="12px" flat color="primary" dense round icon="edit"
          @click="$emit('updateTask', task._id)" />
        <q-btn class="gt-xs" size="12px" flat dense color="red" round icon="delete"
          @click="$emit('deleteTask', task._id)" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Task } from './models'

export default defineComponent({
  name: 'ItemComponent',
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true
    },
  },
  emits: ['updateTask', 'deleteTask'],
  setup() {
    return {
    }
  }
})
</script>
<style>
.textThrough {
  text-decoration: line-through;
}
</style>
