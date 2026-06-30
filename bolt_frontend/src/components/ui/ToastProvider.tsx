import { Toaster } from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';

export function ToastProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: resolvedTheme === 'dark' ? '#1e293b' : '#ffffff',
          color: resolvedTheme === 'dark' ? '#f8fafc' : '#0f172a',
          border: `1px solid ${resolvedTheme === 'dark' ? '#334155' : '#e2e8f0'}`,
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: resolvedTheme === 'dark' ? '#1e293b' : '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: resolvedTheme === 'dark' ? '#1e293b' : '#ffffff',
          },
        },
      }}
    />
  );
}
