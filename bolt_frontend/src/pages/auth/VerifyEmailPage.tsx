import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';

export function VerifyEmailPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <div className="mb-4 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Verify your email</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        We&apos;ve sent a verification link to your email address.
        Please check your inbox and click the link to verify your account.
      </p>
      <Button variant="outline" asChild>
        <Link to="/login">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Link>
      </Button>
    </motion.div>
  );
}
