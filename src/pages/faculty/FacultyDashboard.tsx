import { Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, Clock, MapPin, Users, FileText, ClipboardList, BarChart3, ArrowRight } from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import { useApp } from '../../store/AppContext';

export default function FacultyDashboard() {
  const { facultyProfile, subjects, lectures, facultyAssignments } = useApp();
  const todayLectures = lectures.filter((l) => l.date === '2026-08-30');
  const pendingGrading = facultyAssignments.filter((f) => f.graded < f.totalSubmissions);

  return (
    <PortalLayout role="faculty">
      <PageHeader
        title={`Welcome, ${facultyProfile.name}`}
        subtitle={`${facultyProfile.designation} &middot; ${facultyProfile.department}`}
        icon={<LayoutDashboard className="h-5 w-5" />}
      />

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned Subjects" value={subjects.length} icon={<FileText className="h-5 w-5" />} accent="crimson" />
        <StatCard label="Today's Lectures" value={todayLectures.length} icon={<Calendar className="h-5 w-5" />} accent="ai" />
        <StatCard label="Active Assignments" value={facultyAssignments.length} icon={<ClipboardList className="h-5 w-5" />} accent="gray" />
        <StatCard label="Pending Grading" value={pendingGrading.reduce((s, a) => s + (a.totalSubmissions - a.graded), 0)} icon={<Users className="h-5 w-5" />} accent="crimson" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Today's Lecture Schedule</h3>
            <span className="text-xs text-gray-400">August 30, 2026</span>
          </div>
          <div className="space-y-3">
            {todayLectures.map((l) => (
              <div key={l.id} className="flex items-center gap-4 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-crimson-50/30">
                <div className="flex w-14 flex-col items-center rounded-lg bg-crimson-700 py-2 text-white">
                  <span className="text-xs font-medium">{l.startTime}</span>
                  <span className="text-[10px] text-crimson-100">{l.endTime}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{l.subjectName}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {l.room}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Section {l.section}</span>
                  </div>
                </div>
                <Link to="/faculty/attendance" className="btn-ghost text-xs text-crimson-700">
                  Mark <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Assignment Overview */}
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Assignment Status</h3>
            <Link to="/faculty/assignments" className="text-xs font-medium text-crimson-700 hover:text-crimson-800">Manage</Link>
          </div>
          <div className="space-y-3">
            {facultyAssignments.map((f) => {
              const progress = f.totalSubmissions > 0 ? Math.round((f.graded / f.totalSubmissions) * 100) : 0;
              return (
                <div key={f.id} className="rounded-lg border border-gray-100 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900">{f.title}</p>
                      <p className="text-xs text-gray-500">{f.subjectName} &middot; Section {f.section}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">Due {f.dueDate}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1.5 flex-1 rounded-full bg-gray-100">
                      <div className="h-1.5 rounded-full bg-crimson-700 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{f.graded}/{f.totalSubmissions}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Link to="/faculty/attendance" className="card flex items-center gap-3 p-4 transition-all hover:border-crimson-300 hover:shadow-elevated">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-crimson-50 text-crimson-700"><Calendar className="h-5 w-5" /></div>
          <div><p className="text-sm font-semibold text-gray-900">Mark Attendance</p><p className="text-xs text-gray-500">Record today's class</p></div>
        </Link>
        <Link to="/faculty/assignments" className="card flex items-center gap-3 p-4 transition-all hover:border-crimson-300 hover:shadow-elevated">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ai-50 text-ai-600"><FileText className="h-5 w-5" /></div>
          <div><p className="text-sm font-semibold text-gray-900">Create Assignment</p><p className="text-xs text-gray-500">Set new coursework</p></div>
        </Link>
        <Link to="/faculty/reports" className="card flex items-center gap-3 p-4 transition-all hover:border-crimson-300 hover:shadow-elevated">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint-100 text-mint-700"><BarChart3 className="h-5 w-5" /></div>
          <div><p className="text-sm font-semibold text-gray-900">AI Reports</p><p className="text-xs text-gray-500">View class insights</p></div>
        </Link>
      </div>
    </PortalLayout>
  );
}
