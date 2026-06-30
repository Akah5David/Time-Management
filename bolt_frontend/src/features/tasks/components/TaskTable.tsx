import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, MoreHorizontal, Pencil, Trash2, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Checkbox } from '../../../components/ui/Checkbox';
import { StatusBadge, PriorityBadge } from '../../../components/ui/StatusBadge';
import { Dropdown, DropdownItem, DropdownSeparator } from '../../../components/ui/Dropdown';
import type { Task, TaskSort } from '../../../types';

interface TaskTableProps {
  tasks: Task[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  sort: TaskSort;
  onSortChange: (sort: TaskSort) => void;
  className?: string;
}

export function TaskTable({
  tasks,
  selectedIds,
  onSelect,
  onSelectAll,
  onEdit,
  onDelete,
  onToggleComplete,
  sort,
  onSortChange,
  className,
}: TaskTableProps) {
  const allSelected = tasks.length > 0 && selectedIds.length === tasks.length;

  const handleSort = (field: TaskSort['field']) => {
    onSortChange({
      field,
      direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const SortIcon = ({ field }: { field: TaskSort['field'] }) => {
    if (sort.field !== field) return <ChevronUp className="h-3 w-3 opacity-0 group-hover:opacity-50" />;
    return sort.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
  };

  return (
    <div className={cn('overflow-hidden rounded-xl border border-border', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="w-10 px-4 py-3">
                <Checkbox
                  checked={allSelected}
                  onChange={onSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <button onClick={() => handleSort('title')} className="group flex items-center gap-1">
                  Task <SortIcon field="title" />
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Priority</th>
              <th className="px-4 py-3 text-left font-medium">
                <button onClick={() => handleSort('dueDate')} className="group flex items-center gap-1">
                  Due Date <SortIcon field="dueDate" />
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium">Project</th>
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <motion.tr
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  'border-b border-border transition-colors hover:bg-accent/50',
                  selectedIds.includes(task.id) && 'bg-primary/5'
                )}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIds.includes(task.id)}
                    onChange={() => onSelect(task.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleComplete(task.id, task.status !== 'Completed')}
                      className={cn(
                        'flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors',
                        task.status === 'Completed'
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-muted-foreground/30 hover:border-primary'
                      )}
                    >
                      {task.status === 'Completed' && <CheckCircle2 className="h-3 w-3" />}
                    </button>
                    <Link
                      to={`/tasks/${task.id}`}
                      className={cn(
                        'font-medium hover:text-primary',
                        task.status === 'Completed' && 'text-muted-foreground line-through'
                      )}
                    >
                      {task.title}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={task.status} />
                </td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={task.priority} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                </td>
                <td className="px-4 py-3">
                  {task.project ? (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: task.project.color }}
                      />
                      {task.project.name}
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-4 py-3">
                  <Dropdown
                    trigger={
                      <button className="rounded-md p-1 hover:bg-accent">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    }
                  >
                    <DropdownItem onSelect={() => onEdit(task)}>
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </DropdownItem>
                    <DropdownItem onSelect={() => onToggleComplete(task.id, task.status !== 'Completed')}>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {task.status === 'Completed' ? 'Mark Pending' : 'Mark Complete'}
                    </DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem onSelect={() => onDelete(task)} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownItem>
                  </Dropdown>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
