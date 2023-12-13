<script lang="ts" setup>
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";
import {computed, onMounted, ref} from "vue";
import type {Emoji} from "@/types/Emoji";
import type {Entry} from "@/types/Entry";

const body = ref('');
const emoji = ref<Emoji | null>(null);
const textarea = ref<HTMLTextAreaElement | null>(null);
const charCount = computed(() => body.value.length);
const maxChars = 280;

const emit = defineEmits<{ (e: 'create', entry: Entry): void }>();

const handleTextInput = (event: Event) => {
  const textArea = event.target as HTMLTextAreaElement;
  if (textArea.value.length <= maxChars) {
    body.value = textArea.value;
  } else {
    body.value = textArea.value = textArea.value.substring(0, maxChars);
  }
};

const handleSubmit = () => {
  emit('create', { body: body.value, emoji: emoji.value, createdAt: new Date(), userId: 1, id: Math.random() });
  body.value = '';
  emoji.value = null;
}

onMounted(() => {
  textarea.value?.focus();
});
</script>

<template>
  <form class="entry-form" @submit.prevent="handleSubmit">
    <textarea :value="body" ref="textarea" @keyup="handleTextInput" placeholder="New Journal Entry for vmelnikova_io"></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span>{{ charCount }} / {{ maxChars }}</span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>
