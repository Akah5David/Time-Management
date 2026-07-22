import BottomHomeComponent from "./components/BottomHomeComponent";
import TopHomeComponent from "./components/TopHomeComponent";
import WidgetsComponent from "./components/WidgetsComponent";

import { getFetchClient } from "@strapi/strapi/admin";

const config = {
  locales: ["ar", "fr", "cs", "en"],

  translations: {
    en: {
      "task-vault.create": "Create Work Item",
    },
  },
};

const { get } = getFetchClient();

export default {
  config: config,
  bootstrap(app) {
    const taskVault = app.getPlugin("task-vault");
    console.log(taskVault);
    console.log(Object.keys(taskVault));

    if (taskVault) {
      taskVault.apis.injectComponent("HomePage", "top", {
        name: "hello Plugin top",
        Component: TopHomeComponent,
      });

      taskVault.apis.injectComponent("HomePage", "bottom", {
        name: "hello Plugin bottom",
        Component: BottomHomeComponent,
      });
    }

    app.registerHook("task-vault/Dashboard/cards", (cards) => {
      cards.push({
        title: "Darlington Nnam",
        id: 28,
      });

      return cards;
    });
    app.registerHook("task-vault/Dashboard/subtasks", async (subtasks) => {
      try {
        const { data } = await get("/subtasks");

        console.log("Fetched:", data);
        console.log("subtasks:", subtasks);

        const updateSubTask = [subtasks, data];

        return updateSubTask;
      } catch (err) {
        console.error(err);
        return subtasks;
      }
    });
    app.registerHook("task-vault/Dashboard/reminders", async (reminders) => {
      try {
        const { data } = await get("/reminders");

        console.log("Fetched:", data);
        console.log("reminders:", reminders);

        const updateReminder = [reminders, data];

        return updateReminder;
      } catch (err) {
        console.error(err);
        return reminders;
      }
    });
  },
};
