import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Monitor, Globe, Bell, Clock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Switch } from '../../components/ui/Switch';
import { Select } from '../../components/ui/Select';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    reminders: true,
    mentions: true,
  });

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
  ];

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'America/Chicago', label: 'Central Time' },
    { value: 'America/Denver', label: 'Mountain Time' },
    { value: 'America/Los_Angeles', label: 'Pacific Time' },
    { value: 'Europe/London', label: 'London' },
    { value: 'Europe/Paris', label: 'Paris' },
    { value: 'Asia/Tokyo', label: 'Tokyo' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Customize your experience</p>
      </div>

      {/* Appearance */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <h3 className="font-semibold">Appearance</h3>
        </div>
        <div className="space-y-4">
          <Select
            label="Theme"
            options={themeOptions}
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
          />
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent'
              }`}
            >
              <Sun className="h-6 w-6" />
              <span className="text-sm">Light</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent'
              }`}
            >
              <Moon className="h-6 w-6" />
              <span className="text-sm">Dark</span>
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent'
              }`}
            >
              <Monitor className="h-6 w-6" />
              <span className="text-sm">System</span>
            </button>
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          <h3 className="font-semibold">Language & Region</h3>
        </div>
        <div className="space-y-4">
          <Select label="Language" options={languageOptions} />
          <Select label="Timezone" options={timezoneOptions} />
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <div className="space-y-4">
          <Switch
            label="Email notifications"
            checked={notifications.email}
            onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
          />
          <Switch
            label="Push notifications"
            checked={notifications.push}
            onChange={(e) => setNotifications(prev => ({ ...prev, push: e.target.checked }))}
          />
          <Switch
            label="Task reminders"
            checked={notifications.reminders}
            onChange={(e) => setNotifications(prev => ({ ...prev, reminders: e.target.checked }))}
          />
          <Switch
            label="Mentions & replies"
            checked={notifications.mentions}
            onChange={(e) => setNotifications(prev => ({ ...prev, mentions: e.target.checked }))}
          />
        </div>
      </div>
    </motion.div>
  );
}
