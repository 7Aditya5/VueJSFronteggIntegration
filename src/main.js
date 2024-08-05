import './assets/main.css'

import { createApp } from "vue";
import App from "./App.vue";
import { Frontegg } from "@frontegg/vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    { name: "HomePage", path: "/", component: App },
  ],
});

const app = createApp(App).use(router);

app.use(Frontegg, {
  contextOptions: {
    baseUrl: "https://app-598ky32lm8w3.frontegg.com",
    clientId: '6ab6bcfa-829f-486b-a293-8a7503b8f907'
  },
   authOptions: {
     keepSessionAlive: true // Uncomment this in order to maintain the session alive
  },
  hostedLoginBox: true,
  router,
});


app.mount("#app");