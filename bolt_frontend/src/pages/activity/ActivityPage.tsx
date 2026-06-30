import { motion } from 'framer-motion';
import { Activity as ActivityIcon } from 'lucide-react';
import { ActivityFeed } from '../../features/activity/components/ActivityFeed';

export function ActivityPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Activity Log</h1>
        <p className="text-sm text-muted-foreground">Track all changes across your workspace</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <ActivityFeed />
      </div>
    </motion.div>
  );
}
