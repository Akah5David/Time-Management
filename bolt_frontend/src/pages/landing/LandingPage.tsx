import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Zap, Users, BarChart3, Shield, Clock,
  ChevronRight, Star, ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Accordion } from '../../components/ui/Accordion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: CheckCircle2,
    title: 'Task Management',
    description: 'Create, organize, and track tasks with powerful tools designed for productivity.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with instant updates and real-time collaboration.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with shared projects and team workspaces.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Track productivity with detailed analytics and progress reports.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and role-based access control for your data.',
  },
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Built-in time tracking to understand where your time goes.',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager at TechCorp',
    content: 'TaskFlow transformed how our team manages projects. The intuitive interface and powerful features have increased our productivity by 40%.',
    rating: 5,
  },
  {
    name: 'Michael Torres',
    role: 'Freelance Developer',
    content: 'I have tried dozens of task managers. TaskFlow is the only one that actually helps me stay organized without getting in the way.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'Design Lead at Creative Studio',
    content: 'The kanban board and calendar views are exactly what our design team needed. Beautiful and functional.',
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals getting started.',
    features: ['Up to 3 projects', '100 tasks', 'Basic analytics', 'Email support'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per user/month',
    description: 'For professionals and small teams.',
    features: ['Unlimited projects', 'Unlimited tasks', 'Advanced analytics', 'Priority support', 'Custom fields', 'API access'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large organizations with advanced needs.',
    features: ['Everything in Pro', 'SSO & SAML', 'Dedicated support', 'Custom integrations', 'SLA guarantee', 'On-premise option'],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqItems = [
  {
    id: '1',
    title: 'What is TaskFlow and who is it for?',
    content: 'TaskFlow is a modern task management platform designed for individuals and teams who want to stay organized and productive. It is suitable for freelancers, small businesses, and enterprise teams.',
  },
  {
    id: '2',
    title: 'Can I import tasks from other tools?',
    content: 'Yes! TaskFlow supports importing tasks from popular tools like Trello, Asana, Monday.com, and CSV files. Our migration wizard makes the process seamless.',
  },
  {
    id: '3',
    title: 'Is there a mobile app available?',
    content: 'TaskFlow is fully responsive and works great on mobile browsers. Native iOS and Android apps are coming soon to the App Store and Google Play.',
  },
  {
    id: '4',
    title: 'How does the free plan work?',
    content: 'The free plan includes up to 3 projects and 100 tasks with basic analytics. It is perfect for personal use and trying out TaskFlow before upgrading.',
  },
  {
    id: '5',
    title: 'Can I cancel my subscription anytime?',
    content: 'Absolutely. You can cancel your subscription at any time from your account settings. Your data will remain accessible even after cancellation.',
  },
];

export function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Now in public beta
            </span>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Manage tasks like a{' '}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                pro
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              The modern task management platform that helps teams and individuals stay organized, 
              collaborate effectively, and ship faster.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/register">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16"
          >
            <div className="relative mx-auto max-w-4xl rounded-xl border border-border bg-card p-2 shadow-2xl">
              <div className="overflow-hidden rounded-lg bg-background">
                <div className="flex h-8 items-center gap-2 border-b border-border bg-muted/50 px-4">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="grid grid-cols-4 gap-4 p-6">
                  <div className="col-span-1 space-y-3">
                    <div className="h-8 w-full rounded bg-muted" />
                    <div className="h-8 w-full rounded bg-muted" />
                    <div className="h-8 w-full rounded bg-muted" />
                    <div className="h-8 w-full rounded bg-muted" />
                  </div>
                  <div className="col-span-3 space-y-3">
                    <div className="h-32 rounded-lg bg-muted/60" />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-24 rounded-lg bg-muted/40" />
                      <div className="h-24 rounded-lg bg-muted/40" />
                      <div className="h-24 rounded-lg bg-muted/40" />
                    </div>
                    <div className="h-40 rounded-lg bg-muted/50" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to stay productive
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Powerful features designed to help you and your team accomplish more with less effort.
            </p>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-muted/30 px-4 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by teams worldwide
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              See what our users have to say about their experience with TaskFlow.
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-sm text-foreground">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Start free, upgrade when you need more. No hidden fees, no surprises.
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`
                  relative rounded-xl border p-6 transition-colors
                  ${plan.popular ? 'border-primary bg-primary/5' : 'border-border bg-card'}
                `}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="mb-2 text-lg font-semibold">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="mb-6 text-sm text-muted-foreground">{plan.description}</p>
                <ul className="mb-6 space-y-3">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border bg-muted/30 px-4 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about TaskFlow.
            </p>
          </motion.div>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Join thousands of teams already using TaskFlow to ship faster and stay organized.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/register">Get Started Free <ChevronRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">TaskFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Modern task management for teams that ship.
              </p>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
