import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Shield, User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Logo from '../../components/Logo';
import { useApp } from '../../store/AppContext';

type Role = 'student' | 'faculty' | 'admin';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setActiveRole } = useApp();
  const [role, setRole] = useState<Role>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const roleConfig: Record<Role, { icon: typeof GraduationCap; label: string; desc: string; email: string; route: string }> = {
    student: { icon: GraduationCap, label: 'Student', desc: 'Access attendance, assignments & AI insights', email: 'arjun.k@kit.edu.in', route: '/student/dashboard' },
    faculty: { icon: User, label: 'Faculty', desc: 'Mark attendance, grade assignments & view reports', email: 'rajesh.sharma@kit.edu.in', route: '/faculty/dashboard' },
    admin: { icon: Shield, label: 'Administrator', desc: 'Manage users & view institutional analytics', email: 'admin@kit.edu.in', route: '/admin/dashboard' },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveRole(role);
    navigate(roleConfig[role].route);
  };

  const current = roleConfig[role];
  const CurrentIcon = current.icon;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Branding Panel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-br from-crimson-800 via-crimson-700 to-crimson-900 p-12 lg:flex">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-10 top-20 h-48 w-48 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-10 h-64 w-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative">
          <Logo size="lg" variant="light" />
        </div>
        <div className="relative">
          <h1 className="text-4xl font-bold leading-tight text-white">
            KIT Education Management Portal
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-crimson-100">
            A unified academic platform powered by AI-driven insights for students, faculty, and administrators.
          </p>
          <div className="mt-8 space-y-3">
            {[
              'Real-time attendance tracking with deficit alerts',
              'AI-generated study recommendations & risk flags',
              'Comprehensive analytics for institutional oversight',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-crimson-100">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-crimson-200">
          &copy; 2026 KalaignarKarunanidhi Institute of Technology
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo size="md" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">Portal Login</h2>
          <p className="mt-1 text-sm text-gray-500">Select your role and sign in to continue</p>

          {/* Role Selector */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {(Object.keys(roleConfig) as Role[]).map((r) => {
              const cfg = roleConfig[r];
              const Icon = cfg.icon;
              const active = role === r;
              return (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setEmail('');
                    setPassword('');
                  }}
                  className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${
                    active
                      ? 'border-crimson-700 bg-crimson-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Icon className={`h-6 w-6 ${active ? 'text-crimson-700' : 'text-gray-400'}`} />
                  <span className={`text-xs font-semibold ${active ? 'text-crimson-700' : 'text-gray-600'}`}>
                    {cfg.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-lg bg-crimson-50 p-3">
            <div className="flex items-center gap-2">
              <CurrentIcon className="h-4 w-4 text-crimson-700" />
              <span className="text-xs font-medium text-crimson-700">{current.label} Portal</span>
            </div>
            <p className="mt-1 text-xs text-crimson-600">{current.desc}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={current.email}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-crimson-700 focus:ring-crimson-500" />
                Remember me
              </label>
              <button type="button" className="text-sm font-medium text-crimson-700 hover:text-crimson-800">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign in to {current.label} Portal
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            Demo mode — enter any email and password to access the portal
          </p>
        </div>
      </div>
    </div>
  );
}
