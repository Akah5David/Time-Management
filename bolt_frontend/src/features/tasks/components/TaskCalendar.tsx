import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { cn } from '../../../utils/cn';
import type { Task } from '../../../types';

interface TaskCalendarProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  className?: string;
}

export function TaskCalendar({ tasks, onTaskClick, className }: TaskCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getTasksForDay = (day: Date) =>
    tasks.filter(task => task.dueDate && isSameDay(new Date(task.dueDate), day));

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={cn('rounded-xl border border-border bg-card p-4', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h3>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="rounded-md p-1 hover:bg-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="rounded-md p-1 hover:bg-accent"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="py-2 text-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {days.map(day => {
          const dayTasks = getTasksForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={day.toISOString()}
              onClick={() => dayTasks[0] && onTaskClick(dayTasks[0])}
              className={cn(
                'relative min-h-[80px] rounded-lg border p-1 text-left transition-colors',
                isCurrentMonth ? 'bg-background' : 'bg-muted/50',
                isToday && 'border-primary',
                dayTasks.length > 0 && 'hover:bg-accent/50'
              )}
            >
              <span className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full text-xs',
                isToday && 'bg-primary text-primary-foreground'
              )}>
                {format(day, 'd')}
              </span>
              <div className="mt-1 space-y-0.5">
                {dayTasks.slice(0, 3).map(task => (
                  <div
                    key={task.id}
                    className={cn(
                      'truncate rounded px-1 py-0.5 text-[10px]',
                      task.status === 'Completed' && 'bg-green-100 text-green-700 dark:bg-green-900/30',
                      task.status === 'In Progress' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30',
                      task.status === 'Pending' && 'bg-gray-100 text-gray-700 dark:bg-gray-800'
                    )}
                  >
                    {task.title}
                  </div>
                ))}
                {dayTasks.length > 3 && (
                  <span className="text-[10px] text-muted-foreground">+{dayTasks.length - 3} more</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
