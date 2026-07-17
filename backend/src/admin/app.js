import BottomHomeComponent from "./components/BottomHomeComponent";
import TopHomeComponent from "./components/TopHomeComponent";

const config = {
  locales: [
    // 'ar',
    // 'fr',
    // 'cs',
  ],
};

export default {
  config,
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
  },
};
