<template>
    <q-card style="min-width: 350px">
        <q-card-section>
            <div class="text-h6">{{ title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-input
                dense
                v-model="name"
                autofocus
            />
        </q-card-section>

        <q-card-actions
            align="right"
            class="text-primary"
        >
            <q-btn
                flat
                label="Close"
                no-caps
                v-close-popup
            />
            <q-btn
                flat
                :label="title"
                no-caps
                v-close-popup
                @click="addName"
            />
        </q-card-actions>
    </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: {
        title: {
            require: true,
            type: String
        }
    },
    emits: ['addName'],
    setup(props, { emit }) {
        const name = ref('')
        const addName = () => {
            emit('addName', name.value)
        }
        return { name, addName }
    }
})
</script>

<style scoped>
</style>