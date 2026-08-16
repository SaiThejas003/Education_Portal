import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Monitor, Server, CheckCircle } from 'lucide-react';
import PublicHeader from '../../components/PublicHeader';
import PublicFooter from '../../components/PublicFooter';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', category: 'Portal Access', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', category: 'Portal Access', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const supportChannels = [
    {
      icon: Monitor,
      title: 'IT Helpdesk',
      desc: 'Portal login, account access, and browser issues',
      contact: 'ithelpdesk@kit.edu.in',
      phone: '+91 422 234 5679',
    },
    {
      icon: Server,
      title: 'System Administration',
      desc: 'Data errors, grade corrections, and technical escalations',
      contact: 'sysadmin@kit.edu.in',
      phone: '+91 422 234 5680',
    },
    {
      icon: Mail,
      title: 'Academic Office',
      desc: 'Attendance regularization and exam-related queries',
      contact: 'academic@kit.edu.in',
      phone: '+91 422 234 5681',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <div className="bg-gradient-to-br from-crimson-800 to-crimson-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Contact & Support</h1>
          <p className="mt-2 text-crimson-100">
            Get in touch with the KIT administrative and IT support teams
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Support Channels */}
          <div className="lg:col-span-2">
            <h2 className="mb-5 text-lg font-bold text-gray-900">Support Channels</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {supportChannels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <div key={ch.title} className="card p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-crimson-50 text-crimson-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold text-gray-900">{ch.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{ch.desc}</p>
                    <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {ch.contact}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {ch.phone}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Campus Info */}
            <div className="card mt-4 p-5">
              <h3 className="font-semibold text-gray-900">Campus Location</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-crimson-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">KIT Campus</p>
                    <p className="text-sm text-gray-500">Coimbatore, Tamil Nadu 641001, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-crimson-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Office Hours</p>
                    <p className="text-sm text-gray-500">Monday - Friday, 9:00 AM - 5:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Form */}
          <div>
            <h2 className="mb-5 text-lg font-bold text-gray-900">Submit a Ticket</h2>
            <form onSubmit={handleSubmit} className="card p-5">
              {submitted && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-mint-100 px-3 py-2.5 text-sm text-mint-700 animate-fade-in">
                  <CheckCircle className="h-4 w-4" />
                  Your support ticket has been submitted. We'll respond within 24 hours.
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                    placeholder="you@kit.edu.in"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="input-field"
                  >
                    <option>Portal Access</option>
                    <option>Grade Correction</option>
                    <option>Attendance Query</option>
                    <option>Technical Issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-field resize-none"
                    placeholder="Describe your issue..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  <Send className="h-4 w-4" />
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
