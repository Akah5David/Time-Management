import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Button } from '../../../components/ui/Button';
import { SearchBar } from '../../../components/ui/SearchBar';
import { Select } from '../../../components/ui/Select';
import type { TaskFilters as TaskFiltersType, TaskSort } from '../../../types';

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
  sort: TaskSort;
  onSortChange: (sort: TaskSort) => void;
  className?: string;
}

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'Pending', label: 'Pending' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Cancelled', label: 'Cancelled' },
  { value: 'Archived', label: 'Archived' },
];

const priorityOptions = [
  { value: '', label: 'All Priorities' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Urgent', label: 'Urgent' },
];

const sortFieldOptions = [
  { value: 'dueDate', label: 'Due Date' },
  { value: 'createdAt', label: 'Created Date' },
  { value: 'updatedAt', label: 'Updated Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Alphabetically' },
];

const sortDirectionOptions = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

export function TaskFilters({ filters, onFiltersChange, sort, onSortChange, className }: TaskFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = filters.status || filters.priority || filters.search;

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          value={filters.search || ''}
          onChange={(search) => onFiltersChange({ ...filters, search: search || undefined })}
          placeholder="Search tasks..."
          className="flex-1"
        />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(hasActiveFilters && 'border-primary text-primary')}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {[filters.status, filters.priority, filters.search].filter(Boolean).length}
              </span>
            )}
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="grid gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-4">
          <Select
            options={statusOptions}
            value={filters.status || ''}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value ? [e.target.value as 'Pending' | 'In Progress' | 'Completed' | 'Cancelled' | 'Archived'] : undefined })}
            label="Status"
          />
          <Select
            options={priorityOptions}
            value={filters.priority || ''}
            onChange={(e) => onFiltersChange({ ...filters, priority: e.target.value ? [e.target.value as 'Low' | 'Medium' | 'High' | 'Urgent'] : undefined })}
            label="Priority"
          />
          <Select
            options={sortFieldOptions}
            value={sort.field}
            onChange={(e) => onSortChange({ ...sort, field: e.target.value as TaskSort['field'] })}
            label="Sort By"
          />
          <Select
            options={sortDirectionOptions}
            value={sort.direction}
            onChange={(e) => onSortChange({ ...sort, direction: e.target.value as TaskSort['direction'] })}
            label="Direction"
          />
        </div>
      )}
    </div>
  );
}
