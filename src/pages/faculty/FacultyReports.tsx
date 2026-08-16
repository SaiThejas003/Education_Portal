import { BarChart3, Sparkles, ShieldAlert, TrendingUp, Lightbulb, Users, AlertTriangle } from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import BarChart from '../../components/BarChart';
import { useApp } from '../../store/AppContext';
import { generateFacultyInsights, getSubjectPerformance } from '../../data/AIEngine';

export default function FacultyReports() {
  const { subjects, attendanceRecords, assignments, exams } = useApp();
  const insights = generateFacultyInsights(subjects, attendanceRecords, assignments, exams);
  const performance = getSubjectPerformance(subjects, attendanceRecords, assignments, exams);

  const atRiskStudents = [
    { name: 'Arjun Karthikeyan', rollNo: '24EEE042', subject: 'Circuit Theory', attendance: 68, overall: 48 },
    { name: 'Karthik Raja', rollNo: '24EEE044', subject: 'Circuit Theory', attendance: 72, overall: 52 },
  ];

  const insightCard = (ins: typeof insights[0]) => {
    const config = {
      risk: { icon: ShieldAlert, bg: 'border-crimson-200 bg-crimson-50/50', iconBg: 'bg-crimson-100 text-crimson-700' },
      recommendation: { icon: Lightbulb, bg: 'border-ai-200 bg-ai-50/50', iconBg: 'bg-ai-100 text-ai-700' },
      trend: { icon: TrendingUp, bg: 'border-amber-200 bg-amber-50/50', iconBg: 'bg-amber-100 text-amber-700' },
      achievement: { icon: Users, bg: 'border-mint-200 bg-mint-50', iconBg: 'bg-mint-100 text-mint-700' },
    };
    const c = config[ins.type];
    const Icon = c.icon;
    return (
      <div key={ins.id} className={`rounded-lg border p-4 ${c.bg}`}>
        <div className="flex items-start gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${c.iconBg}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">{ins.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">{ins.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PortalLayout role="faculty">
      <PageHeader title="AI Reports" subtitle="Class-wide performance trends and at-risk student flags" icon={<BarChart3 className="h-5 w-5" />} />

      {/* AI Banner */}
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-ai-200 bg-gradient-to-r from-ai-50 to-white p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ai-500 text-white shadow-sm">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-ai-800">AI Class Analytics</h3>
          <p className="text-sm text-ai-600">Automated performance analysis across all assigned subjects.</p>
        </div>
      </div>

      {/* Class Performance Chart */}
      <div className="card mb-6 p-6">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">Class-wide Subject Performance</h3>
        <BarChart
          data={performance.map((p) => ({
            label: p.subjectName.split(' ').slice(0, 2).join(' '),
            value: p.overallScore,
            color: p.overallScore >= 75 ? '#388E3C' : p.overallScore >= 50 ? '#8A1B2F' : '#B85967',
          }))}
        />
      </div>

      {/* At-Risk Students */}
      <div className="card mb-6 overflow-hidden">
        <div className="border-b border-gray-200 bg-crimson-50 px-6 py-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-crimson-800">
            <AlertTriangle className="h-4 w-4" /> At-Risk Students (Auto-Flagged by AI)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Student</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Roll No.</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Flagged Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Overall</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {atRiskStudents.map((s) => (
                <tr key={s.rollNo} className="table-row-hover">
                  <td className="px-6 py-3 font-medium text-gray-900">{s.name}</td>
                  <td className="px-6 py-3 text-gray-600">{s.rollNo}</td>
                  <td className="px-6 py-3 text-gray-600">{s.subject}</td>
                  <td className="px-6 py-3"><span className="badge bg-crimson-50 text-crimson-700">{s.attendance}%</span></td>
                  <td className="px-6 py-3"><span className="badge bg-crimson-100 text-crimson-700">{s.overall}%</span></td>
                  <td className="px-6 py-3"><span className="badge bg-crimson-700 text-white">High</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid gap-3 lg:grid-cols-2">
        {insights.map(insightCard)}
      </div>
    </PortalLayout>
  );
}
