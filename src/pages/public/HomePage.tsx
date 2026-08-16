import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Sparkles,
  Calendar,
  Megaphone,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
  Building2,
} from 'lucide-react';
import PublicHeader from '../../components/PublicHeader';
import PublicFooter from '../../components/PublicFooter';
import { announcements, facultyDirectory } from '../../data/mockData';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-crimson-800 via-crimson-700 to-crimson-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-20 h-56 w-56 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-crimson-100 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Education Management System
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              KIT Education Management Portal
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-crimson-100">
              KalaignarKarunanidhi Institute of Technology's unified platform for academic management —
              attendance tracking, assignment evaluation, examination scheduling, and AI-driven student insights.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-crimson-700 shadow-lg transition-all hover:bg-crimson-50 hover:shadow-xl"
              >
                Access Portal
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <BookOpen className="h-4 w-4" />
                Browse Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { icon: Users, label: 'Enrolled Students', value: '1,847' },
              { icon: GraduationCap, label: 'Active Faculty', value: '124' },
              { icon: BookOpen, label: 'Courses Offered', value: '86' },
              { icon: Award, label: 'Placement Rate', value: '94%' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-crimson-50 text-crimson-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-crimson-700 text-white">
            <Megaphone className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Academic Announcements</h2>
            <p className="text-sm text-gray-500">Latest updates from the academic office</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {announcements.map((a) => {
            const isAlert = a.category === 'Alert';
            return (
              <div
                key={a.id}
                className={`card p-5 transition-shadow hover:shadow-elevated ${
                  isAlert ? 'border-l-4 border-l-crimson-500' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-gray-900">{a.title}</h3>
                  <span
                    className={`badge shrink-0 ${
                      isAlert
                        ? 'bg-crimson-50 text-crimson-700'
                        : a.category === 'Examination'
                        ? 'bg-ai-50 text-ai-600'
                        : a.category === 'Event'
                        ? 'bg-mint-100 text-mint-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {a.category}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{a.content}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {a.date}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Feature Highlight */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-ai-50 px-3 py-1 text-xs font-semibold text-ai-600">
                <Sparkles className="h-3.5 w-3.5" />
                AI Insights Engine
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                Predictive analytics for student success
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                The KIT AI Engine continuously analyzes attendance patterns, assignment performance,
                and examination scores to identify at-risk students, generate personalized study
                recommendations, and provide automated feedback — all in real time.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  { icon: ShieldCheck, text: 'Attendance deficit detection with automatic risk flags below 75%' },
                  { icon: TrendingUp, text: 'Subject-wise performance trend analysis and lowest-scoring subject identification' },
                  { icon: Sparkles, text: 'AI-generated personalized study recommendations for each student' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ai-50 text-ai-600">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm leading-relaxed text-gray-700">{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="rounded-2xl border border-ai-200 bg-gradient-to-br from-ai-50 to-white p-6">
              <div className="card p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-ai-600" />
                  <span className="text-sm font-semibold text-ai-700">AI Recommendation Preview</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  "AI Recommendation: Your performance in Circuit Theory is dropping. Focus on nodal
                  analysis modules before the upcoming Internal Assessment II."
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="badge bg-crimson-50 text-crimson-700">Attendance Deficit - At Risk</span>
                  <span className="badge bg-ai-50 text-ai-600">Circuit Theory - 68%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Directory Preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-crimson-700 text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Faculty Directory</h2>
              <p className="text-sm text-gray-500">Meet our distinguished academic team</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facultyDirectory.map((f) => (
            <div key={f.id} className="card p-5 transition-shadow hover:shadow-elevated">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-crimson-700 text-lg font-bold text-white">
                {f.name.split(' ').map((n) => n[n.length - 1]?.[0] ?? '').join('')}
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{f.name}</h3>
              <p className="text-xs text-crimson-700">{f.designation}</p>
              <p className="mt-1 text-xs text-gray-500">{f.department}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {f.expertise.slice(0, 2).map((e) => (
                  <span key={e} className="badge bg-gray-100 text-gray-600">{e}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-crimson-700">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
            <div>
              <h2 className="text-2xl font-bold text-white">Access the KIT Portal</h2>
              <p className="mt-2 text-crimson-100">
                Sign in to view attendance, assignments, exam schedules, and AI-powered insights.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-crimson-700 shadow-lg transition-all hover:bg-crimson-50"
            >
              Portal Login
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
