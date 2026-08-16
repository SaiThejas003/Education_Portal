import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  ClipboardList,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  Upload,
  Award,
  BookOpen,
  BarChart3,
  ArrowRight,
  Plus,
  Save,
  Download,
  Users,
  UserCog,
  FileBarChart,
  GraduationCap,
  Target,
  Lightbulb,
  ShieldAlert,
  TrendingDown,
  X,
} from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import RingChart from '../../components/RingChart';
import BarChart from '../../components/BarChart';
import { useApp } from '../../store/AppContext';
import { getSubjectPerformance, generateStudentInsights } from '../../data/AIEngine';
import { useState } from 'react';

export default function StudentDashboard() {
  const { studentProfile, subjects, attendanceRecords, assignments, exams } = useApp();
  const performance = getSubjectPerformance(subjects, attendanceRecords, assignments, exams);
  const insights = generateStudentInsights(subjects, attendanceRecords, assignments, exams);

  const overallAttendance = Math.round(
    performance.reduce((sum, p) => sum + p.attendancePercentage, 0) / performance.length
  );
  const pendingAssignments = assignments.filter((a) => a.status === 'pending');
  const upcomingExams = exams.filter((e) => e.status === 'scheduled').slice(0, 3);
  const highRisk = insights.filter((i) => i.severity === 'high');

  return (
    <PortalLayout role="student">
      <PageHeader
        title={`Welcome, ${studentProfile.name.split(' ')[0]}`}
        subtitle={`${studentProfile.rollNo} &middot; ${studentProfile.department} &middot; Year ${studentProfile.year}`}
        icon={<LayoutDashboard className="h-5 w-5" />}
      />

      {/* Profile Summary */}
      <div className="card mb-6 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-crimson-700 text-lg font-bold text-white">
              {studentProfile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{studentProfile.name}</h2>
              <p className="text-sm text-gray-500">{studentProfile.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-gray-400">Roll No.</p>
              <p className="text-sm font-semibold text-gray-900">{studentProfile.rollNo}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Section</p>
              <p className="text-sm font-semibold text-gray-900">{studentProfile.section}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Semester</p>
              <p className="text-sm font-semibold text-gray-900">{studentProfile.semester}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Advisor</p>
              <p className="text-sm font-semibold text-gray-900">{studentProfile.advisor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall Attendance" value={`${overallAttendance}%`} icon={<CalendarCheck className="h-5 w-5" />} accent={overallAttendance >= 75 ? 'mint' : 'crimson'} trend={{ value: overallAttendance >= 75 ? 'On Track' : 'Below 75%', positive: overallAttendance >= 75 }} />
        <StatCard label="Pending Assignments" value={pendingAssignments.length} icon={<FileText className="h-5 w-5" />} accent="ai" />
        <StatCard label="Active Subjects" value={subjects.length} icon={<BookOpen className="h-5 w-5" />} accent="gray" />
        <StatCard label="AI Risk Alerts" value={highRisk.length} icon={<AlertTriangle className="h-5 w-5" />} accent="crimson" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Attendance Ring */}
        <div className="card p-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">Attendance Overview</h3>
          <div className="flex justify-center">
            <RingChart percentage={overallAttendance} label="Overall Attendance" sublabel="4 subjects" color={overallAttendance >= 75 ? '#388E3C' : '#8A1B2F'} />
          </div>
          <div className="mt-5 space-y-2">
            {performance.map((p) => (
              <div key={p.subjectId} className="flex items-center justify-between text-sm">
                <span className="truncate text-gray-600">{p.subjectName}</span>
                <span className={`font-semibold ${p.attendancePercentage >= 75 ? 'text-mint-700' : 'text-crimson-700'}`}>
                  {p.attendancePercentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Upcoming Assignments</h3>
            <Link to="/student/assignments" className="text-xs font-medium text-crimson-700 hover:text-crimson-800">View all</Link>
          </div>
          <div className="space-y-3">
            {pendingAssignments.map((a) => {
              const subject = subjects.find((s) => s.id === a.subjectId);
              return (
                <div key={a.id} className="rounded-lg border border-gray-100 p-3 transition-colors hover:bg-crimson-50/40">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900">{a.title}</p>
                      <p className="text-xs text-gray-500">{subject?.name}</p>
                    </div>
                    <span className="badge bg-ai-50 text-ai-600 shrink-0">{a.maxMarks} marks</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-crimson-600">
                    <Clock className="h-3.5 w-3.5" />
                    Due: {a.dueDate}
                  </div>
                </div>
              );
            })}
            {pendingAssignments.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-400">No pending assignments</p>
            )}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Upcoming Exams</h3>
            <Link to="/student/exams" className="text-xs font-medium text-crimson-700 hover:text-crimson-800">View all</Link>
          </div>
          <div className="space-y-3">
            {upcomingExams.map((e) => {
              const subject = subjects.find((s) => s.id === e.subjectId);
              return (
                <div key={e.id} className="rounded-lg border border-gray-100 p-3">
                  <p className="text-sm font-medium text-gray-900">{e.name}</p>
                  <p className="text-xs text-gray-500">{subject?.name}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{e.date}</span>
                    <span className={`badge ${e.type === 'internal' ? 'bg-crimson-50 text-crimson-700' : 'bg-ai-50 text-ai-600'}`}>
                      {e.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">Subject-wise Performance</h3>
          <BarChart
            data={performance.map((p) => ({
              label: p.subjectName.split(' ').slice(0, 2).join(' '),
              value: p.overallScore,
              color: p.overallScore >= 75 ? '#388E3C' : p.overallScore >= 50 ? '#8A1B2F' : '#B85967',
            }))}
          />
        </div>

        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">AI Insights Summary</h3>
            <Link to="/student/insights" className="text-xs font-medium text-ai-600 hover:text-ai-700">View all</Link>
          </div>
          <div className="space-y-3">
            {insights.slice(0, 4).map((ins) => (
              <div key={ins.id} className={`rounded-lg border p-3 ${
                ins.severity === 'high' ? 'border-crimson-200 bg-crimson-50/50' :
                ins.type === 'achievement' ? 'border-mint-200 bg-mint-50' :
                'border-ai-200 bg-ai-50/50'
              }`}>
                <div className="flex items-start gap-2">
                  {ins.type === 'risk' ? <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-crimson-600" /> :
                   ins.type === 'achievement' ? <Award className="mt-0.5 h-4 w-4 shrink-0 text-mint-600" /> :
                   <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-ai-600" />}
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{ins.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-600">{ins.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
