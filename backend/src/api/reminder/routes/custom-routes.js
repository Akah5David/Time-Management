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
      path: "/reminders/:documentId",
      handler: "reminder.updateReminder",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/reminders/:documentId",
      handler: "reminder.deleteReminder",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/reminders",
      handler: "reminder.deleteAllReminders",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
