import { useStrapiApp } from '@strapi/strapi/admin';
import { Button } from '@strapi/design-system';

import { useSelector, useDispatch } from 'react-redux';

export default function TextDashboard() {
  const app = useStrapiApp('TaskVaultDashboard', (app) => app);
  console.log('app', app);

  const selectedProject = useSelector((state) => state['task-vault']);

  console.log(selectedProject);

  const dispatch = useDispatch();

  //action creator
  function dispatchProject() {
    console.log('reddy to trigger task-vault setProject reducer function');
    dispatch({
      type: 'task-vault/setProject',
      payload: 'i have been selecte',
    });
  }

  const defaultCards = [
    {
      id: 'tasks',
      title: 'My Tasks',
    },
    {
      id: 'deadlines',
      title: "Today's Deadlines",
    },
  ];
  const cards = app.runHookWaterfall('task-vault/Dashboard/cards', defaultCards);
  console.log('cards: ', cards);

  const defaultReminders = [
    { remindAt: '2026-07-21T09:30:00.000Z', sent: false, message: 'Welcome Home', task: 'wake up' },
  ];

  const reminders = app.runHookSeries('task-vault/Dashboard/reminders', defaultReminders);

  console.log('reminders: ', reminders);

  const defaultSubtasks = [{ title: 'Eat', completed: false, task: 'wake up' }];

  const subtasks = app.runHookParallel('task-vault/Dashboard/subtasks', defaultSubtasks);
  console.log('reminders: ', subtasks);

  return (
    <section>
      <Button onClick={dispatchProject}>select Project</Button>
      <ol>
        {cards.map((card) => (
          <li key={card.id}>
            <p>{card.id}</p>
            <p>{card.title}</p>
          </li>
        ))}
      </ol>
      <h1>Plugin Status</h1>
      <h1>Total Users</h1>
      <h1>Total Tasks</h1>
      <h1>Completed Today</h1>
      <h1>Overdue Tasks</h1>
      <h1>Last Weekly Report</h1>
      <h1>Last Cron Run</h1>
      <div>
        <h1>Quick Actions</h1>
        <div>
          <h1>Generate Report</h1>
          <h1>Recalculate Statistics</h1>
        </div>
      </div>
    </section>
  );
}
