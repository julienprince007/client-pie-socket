<template>
  <q-page class="row  justify-evenly q-mt-xl">
    <div v-if="identified" style="width: 450px; margin: 5px">
      <div class="q-mb-md text-h6">Bonjour {{ user }}</div>
      <div>
        <q-input v-model="newTask" outlined dense placeholder="New Todo" />
        <div class="full-widht row justify-end q-mt-sm">
          <q-btn flat dense color="primary" no-caps :label="taskId.length ? 'Update task' : 'New task'" @click="addTodo"
            :disable="!newTask.length" />
        </div>
      </div>
      <div class="q-mb-lg">
        <q-list v-for="task in tasks" :key="task._id" bordered class="rounded-borders q-mb-sm">
          <TodoItem :task="task" @updateTask="updateTask" @deleteTask="deleteTask" />
        </q-list>
      </div>
    </div>
    <q-dialog v-model="prompt" persistent>
      <Add_name @add-name="addName" />
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Add_name from 'components/dialogs/Add_name.vue';
import TodoItem from 'components/TodoItem.vue';
import { Task } from 'src/components/models';
import { ITask, taskCollection } from 'src/boot/pouchOrm';

export default defineComponent({
  name: 'IndexPage',
  components: { Add_name, TodoItem },
  setup() {

    const prompt = ref(false)
    const identified = ref(false)
    const user = ref('')
    const newTask = ref('')
    const tasks = ref<Task[]>([])
    const taskId = ref('')

    const addName = async (name: string) => {
      user.value = name
      identified.value = true
      tasks.value = await taskCollection.find({ user_name: name })
    }

    const addTodo = async () => {
      if (!newTask.value) return
      if (!taskId.value.length) {
        let task: ITask = {
          content: newTask.value,
          user_name: user.value,
        }
        await taskCollection.upsert(task).then((task) => {
          tasks.value.push(task)
          newTask.value = ''
        })
      } else {
        let taskOnBase = await taskCollection.findById(taskId.value)
        taskOnBase.content = newTask.value
        await taskCollection.upsert(taskOnBase).then(() => {
          let task = findTask(taskId.value)
          if (task) { task.content = newTask.value }
        })
        newTask.value = ''
        taskId.value = ''
      }
    }

    const updateTask = (task_id: string) => {
      taskId.value = task_id
      let task = findTask(task_id)
      if (task && task.content) {
        newTask.value = task.content
      }
    }

    const deleteTask = async (task_id: string) => {
      await taskCollection.removeById(task_id)
      tasks.value.filter((task) => task._id !== task_id)
    }

    const findTask = (id: string) => {
      return tasks.value.find((task) => task._id === id)
    }

    onMounted(async () => {
      prompt.value = true
    })


    return { prompt, identified, user, newTask, tasks, taskId, addName, addTodo, updateTask, deleteTask };
  }
});
</script>
