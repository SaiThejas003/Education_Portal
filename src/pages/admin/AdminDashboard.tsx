import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, CalendarCheck, TrendingUp, AlertTriangle, ArrowRight, FileBarChart, UserCog } from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import RingChart from '../../components/RingChart';
import { useApp } from '../../store/AppContext';

export default function AdminDashboard() {
  const { managedUsers } = useApp();
  const students = managedUsers.filter((u) => u.role === 'student' && u.status === 'active');
  const faculty = managedUsers.filter((u) => u.role === 'faculty' && u.status === 'active');

  return (
    <PortalLayout role="admin">
      <PageHeader title="System Overview" subtitle="Institutional metrics and administrative dashboard" icon={<LayoutDashboard className="h-5 w-5" />} />

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Enrolled Students" value="1,847" icon={<GraduationCap className="h-5 w-5" />} accent="crimson" trend={{ value: '+42 this sem', positive: true }} />
        <StatCard label="Active Faculty" value="124" icon={<Users className="h-5 w-5" />} accent="ai" trend={{ value: '+3 new', positive: true }} />
        <StatCard label="Institutional Attendance" value="84.2%" icon={<CalendarCheck className="h-5 w-5" />} accent="mint" trend={{ value: '+2.1%', positive: true }} />
        <StatCard label="At-Risk Students" value="12" icon={<AlertTriangle className="h-5 w-5" />} accent="crimson" trend={{ value: 'Action needed', positive: false }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Attendance Ring */}
        <div className="card p-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">Overall Attendance Rate</h3>
          <div className="flex justify-center">
            <RingChart percentage={84} label="Institution Average" sublabel="All departments" color="#388E3C" />
          </div>
          <div className="mt-5 space-y-2">
            {[
              { dept: 'CSE', rate: 89 },
              { dept: 'EEE', rate: 82 },
              { dept: 'MECH', rate: 81 },
              { dept: 'ECE', rate: 85 },
            ].map((d) => (
              <div key={d.dept} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{d.dept}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-20 rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full bg-crimson-700" style={{ width: `${d.rate}%` }} />
                  </div>
                  <span className="font-semibold text-gray-900">{d.rate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">System Activity Feed</h3>
          <div className="space-y-3">
            {[
              { icon: AlertTriangle, color: 'text-crimson-600 bg-crimson-50', text: 'AI Engine flagged 12 at-risk students across 3 departments', time: '2 hours ago' },
              { icon: GraduationCap, color: 'text-ai-600 bg-ai-50', text: '42 new students enrolled for Semester 1', time: '5 hours ago' },
              { icon: CalendarCheck, color: 'text-mint-600 bg-mint-100', text: 'Internal Assessment II schedule published for all departments', time: '1 day ago' },
              { icon: Users, color: 'text-crimson-600 bg-crimson-50', text: 'Dr. Kavitha Murugan (ECE) marked inactive', time: '2 days ago' },
              { icon: TrendingUp, color: 'text-mint-600 bg-mint-100', text: 'Overall attendance improved by 2.1% from last semester', time: '3 days ago' },
            ].map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-gray-100 p-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${a.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{a.text}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link to="/admin/manage-users" className="card flex items-center gap-4 p-5 transition-all hover:border-crimson-300 hover:shadow-elevated">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-crimson-50 text-crimson-700"><UserCog className="h-6 w-6" /></div>
          <div className="flex-1"><p className="text-sm font-semibold text-gray-900">Manage Users</p><p className="text-xs text-gray-500">CRUD operations on student & faculty profiles</p></div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </Link>
        <Link to="/admin/analytics" className="card flex items-center gap-4 p-5 transition-all hover:border-crimson-300 hover:shadow-elevated">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ai-50 text-ai-600"><FileBarChart className="h-6 w-6" /></div>
          <div className="flex-1"><p className="text-sm font-semibold text-gray-900">View Analytics</p><p className="text-xs text-gray-500">Department comparison & AI risk summaries</p></div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </Link>
      </div>
    </PortalLayout>
  );
}
