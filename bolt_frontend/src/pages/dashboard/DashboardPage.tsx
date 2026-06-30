import { motion } from 'framer-motion';
import {
  CheckCircle2, Clock, AlertTriangle, FolderKanban,
  TrendingUp, Calendar, ArrowUpRight, ArrowDownRight,
  ListTodo, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardStats } from '../../hooks/useDashboard';
import { useActivity } from '../../hooks/useActivity';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Skeleton } from '../../components/ui/Skeleton';
import { ActivityFeed } from '../../features/activity/components/ActivityFeed';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function StatCard({
  title, value, icon: Icon, trend, trendUp, color,
}: {
  title: string;
  value: number;
  icon: typeof CheckCircle2;
  trend?: string;
  trendUp?: boolean;
  color: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/20"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
          {trend && (
            <div className={`mt-1 flex items-center gap-1 text-xs ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
              {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {trend}
            </div>
          )}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

function TaskItem({ title, project, dueDate, priority }: {
  title: string;
  project?: string;
  dueDate: string;
  priority: string;
}) {
  const priorityColors: Record<string, string> = {
    Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    High: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <ListTodo className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        {project && <p className="text-xs text-muted-foreground">{project}</p>}
      </div>
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[priority] || priorityColors.Low}`}>
          {priority}
        </span>
        <span className="text-xs text-muted-foreground">{dueDate}</span>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{greeting()}, welcome back!</h1>
          <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your tasks today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/tasks">View All Tasks</Link>
          </Button>
          <Button asChild>
            <Link to="/tasks">New Task</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard
            title="Total Tasks"
            value={stats?.totalTasks || 0}
            icon={ListTodo}
            trend="12% this week"
            trendUp
            color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
          />
          <StatCard
            title="Completed"
            value={stats?.completedTasks || 0}
            icon={CheckCircle2}
            trend="8% this week"
            trendUp
            color="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          />
          <StatCard
            title="Pending"
            value={stats?.pendingTasks || 0}
            icon={Clock}
            trend="3% this week"
            color="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
          />
          <StatCard
            title="Overdue"
            value={stats?.overdueTasks || 0}
            icon={AlertTriangle}
            trend="5% this week"
            color="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          />
        </motion.div>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Today&apos;s Tasks</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/tasks">View all</Link>
            </Button>
          </div>
          <div className="space-y-2">
            <TaskItem
              title="Review Q3 marketing strategy"
              project="Marketing Campaign"
              dueDate="Today"
              priority="High"
            />
            <TaskItem
              title="Update user authentication flow"
              project="Platform v2"
              dueDate="Today"
              priority="Urgent"
            />
            <TaskItem
              title="Prepare sprint retrospective slides"
              project="Engineering"
              dueDate="Today"
              priority="Medium"
            />
            <TaskItem
              title="Client meeting preparation"
              project="Sales"
              dueDate="Today"
              priority="Low"
            />
          </div>
        </motion.div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Productivity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Weekly Productivity</h3>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="w-8 text-xs text-muted-foreground">{day}</span>
                  <ProgressBar value={[65, 80, 45, 90, 70][i]} max={100} size="sm" />
                  <span className="w-8 text-right text-xs text-muted-foreground">{[65, 80, 45, 90, 70][i]}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Projects Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Projects</h3>
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {[
                { name: 'Platform v2', progress: 75, color: 'bg-blue-500' },
                { name: 'Marketing Campaign', progress: 45, color: 'bg-green-500' },
                { name: 'Mobile App', progress: 30, color: 'bg-purple-500' },
              ].map(project => (
                <div key={project.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>{project.name}</span>
                    <span className="text-muted-foreground">{project.progress}%</span>
                  </div>
                  <ProgressBar
                    value={project.progress}
                    barClassName={project.color}
                    size="sm"
                  />
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
              <Link to="/projects">View all projects</Link>
            </Button>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Recent Activity</h3>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <ActivityFeed limit={5} />
            <Button variant="ghost" size="sm" className="mt-3 w-full" asChild>
              <Link to="/activity">View all activity</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
