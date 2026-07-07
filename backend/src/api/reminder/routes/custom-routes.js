module.exports = {
  routes: [
    {
      method: "POST",
      path: "/reminders/create",
      handler: "reminder.createReminders",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/reminders",
      handler: "reminder.fetchReminders",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/reminders/:documentId",
      handler: "reminder.fetchReminder",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/reminders/update/:documentId",
      handler: "reminder.updateReminder",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/reminders/delete/:documentId",
      handler: "reminder.deleteReminder",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/reminders/delete-all",
      handler: "reminder.deleteAllReminders",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
