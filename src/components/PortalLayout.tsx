import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  ClipboardList,
  Sparkles,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronLeft,
} from 'lucide-react';
import Logo from './Logo';
import { useApp } from '../store/AppContext';

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const navConfig: Record<'student' | 'faculty' | 'admin', { title: string; items: NavItem[] }> = {
  student: {
    title: 'Student Portal',
    items: [
      { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/student/attendance', label: 'Attendance', icon: CalendarCheck },
      { to: '/student/assignments', label: 'Assignments', icon: FileText },
      { to: '/student/exams', label: 'Exams & Grades', icon: ClipboardList },
      { to: '/student/insights', label: 'AI Insights', icon: Sparkles },
    ],
  },
  faculty: {
    title: 'Faculty Portal',
    items: [
      { to: '/faculty/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/faculty/attendance', label: 'Mark Attendance', icon: CalendarCheck },
      { to: '/faculty/assignments', label: 'Assignments', icon: FileText },
      { to: '/faculty/exams', label: 'Exam Marks', icon: ClipboardList },
      { to: '/faculty/reports', label: 'AI Reports', icon: BarChart3 },
    ],
  },
  admin: {
    title: 'Admin Area',
    items: [
      { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/admin/manage-users', label: 'Manage Users', icon: Users },
      { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
};

interface PortalLayoutProps {
  children: ReactNode;
  role: 'student' | 'faculty' | 'admin';
}

export default function PortalLayout({ children, role }: PortalLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentProfile, facultyProfile, adminProfile } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const config = navConfig[role];
  const profile = role === 'student' ? studentProfile : role === 'faculty' ? facultyProfile : adminProfile;
  const roleBadge = role === 'student' ? 'Student' : role === 'faculty' ? 'Faculty' : 'Administrator';

  const handleLogout = () => {
    navigate('/login');
  };

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-gray-200 px-5">
        <Link to="/" onClick={() => setSidebarOpen(false)}>
          <Logo size="sm" />
        </Link>
      </div>

      <div className="border-b border-gray-200 px-4 py-4">
        <div className="rounded-lg bg-crimson-50 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crimson-700 text-sm font-bold text-white">
              {profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-gray-900">{profile.name}</div>
              <div className="text-xs text-gray-500">{roleBadge}</div>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          {config.title}
        </p>
        <ul className="space-y-1">
          {config.items.map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`nav-link ${active ? 'nav-link-active' : ''}`}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {role === 'student' && (
          <div className="mt-6 mx-1">
            <div className="rounded-lg border border-ai-200 bg-ai-50 p-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-ai-600" />
                <span className="text-xs font-semibold text-ai-700">AI Engine Active</span>
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-ai-600">
                Continuously analyzing your academic data for risk alerts and recommendations.
              </p>
            </div>
          </div>
        )}
      </nav>

      <div className="border-t border-gray-200 p-3">
        <button onClick={handleLogout} className="nav-link w-full text-gray-500 hover:text-crimson-700 hover:bg-crimson-50">
          <LogOut className="h-[18px] w-[18px]" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 animate-slide-down bg-white shadow-xl">
            <button
              className="absolute right-2 top-3 rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            {SidebarContent}
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="lg:hidden">
              <Logo size="sm" />
            </div>
            <div className="hidden lg:block">
              <h2 className="text-sm font-semibold text-gray-900">
                {config.items.find((i) => i.to === location.pathname)?.label ?? 'KIT Portal'}
              </h2>
              <p className="text-xs text-gray-400">KalaignarKarunanidhi Institute of Technology</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-crimson-600" />
            </button>
            <Link to="/" className="hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 sm:block">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
