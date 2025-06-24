<template>
  <div class="app">
    <h1>線上小測驗</h1>
    <div v-if="currentQuestion < questions.length">
      <p>第 {{ currentQuestion + 1 }} 題：{{ questions[currentQuestion].question }}</p>
      <ul>
        <li v-for="(option, index) in questions[currentQuestion].options" :key="index">
          <button @click="selectOption(index)" :disabled="answered">{{ option }}</button>
        </li>
      </ul>
      <p v-if="answered">
        <span v-if="isCorrect">✅ 答對了！</span>
        <span v-else>❌ 答錯了</span>
      </p>
    </div>
    <div v-else>
      <h2>🎉 測驗完成！</h2>
      <p>總得分：{{ score }} / {{ questions.length }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentQuestion: 0,
      score: 0,
      answered: false,
      isCorrect: false,
      questions: [
        {
          question: "台灣的首都是哪裡？",
          options: ["台中", "台北", "高雄"],
          answer: 1,
        },
        {
          question: "1 + 2 = ?",
          options: ["2", "3", "4"],
          answer: 1,
        },
        {
          question: "哪一個是水果？",
          options: ["蘋果", "番茄醬", "米飯"],
          answer: 0,
        },
      ],
    };
  },
  methods: {
    selectOption(index) {
      this.answered = true;
      this.isCorrect = index === this.questions[this.currentQuestion].answer;
      if (this.isCorrect) {
        this.score++;
      }
      setTimeout(() => {
        this.currentQuestion++;
        this.answered = false;
        this.isCorrect = false;
      }, 1000);
    },
  },
};
</script>

<style>
.app {
  font-family: 'Arial', sans-serif;
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  line-height: 1.6;
}
button {
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
}
</style>
