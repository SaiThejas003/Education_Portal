import { BarChart3, Download, Sparkles, ShieldAlert, TrendingUp, Award, Building2, FileBarChart } from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import BarChart from '../../components/BarChart';
import { generateAdminInsights } from '../../data/AIEngine';

export default function AdminAnalytics() {
  const insights = generateAdminInsights();

  const deptData = [
    { dept: 'CSE', attendance: 89, performance: 82, students: 480 },
    { dept: 'EEE', attendance: 82, performance: 71, students: 320 },
    { dept: 'MECH', attendance: 81, performance: 74, students: 290 },
    { dept: 'ECE', attendance: 85, performance: 78, students: 410 },
    { dept: 'IT', attendance: 87, performance: 80, students: 347 },
  ];

  const riskData = [
    { dept: 'EEE', atRisk: 5, total: 320 },
    { dept: 'MECH', atRisk: 3, total: 290 },
    { dept: 'ECE', atRisk: 2, total: 410 },
    { dept: 'CSE', atRisk: 1, total: 480 },
    { dept: 'IT', atRisk: 1, total: 347 },
  ];

  const insightCard = (ins: typeof insights[0]) => {
    const config = {
      risk: { icon: ShieldAlert, bg: 'border-crimson-200 bg-crimson-50/50', iconBg: 'bg-crimson-100 text-crimson-700' },
      recommendation: { icon: TrendingUp, bg: 'border-ai-200 bg-ai-50/50', iconBg: 'bg-ai-100 text-ai-700' },
      trend: { icon: TrendingUp, bg: 'border-amber-200 bg-amber-50/50', iconBg: 'bg-amber-100 text-amber-700' },
      achievement: { icon: Award, bg: 'border-mint-200 bg-mint-50', iconBg: 'bg-mint-100 text-mint-700' },
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
    <PortalLayout role="admin">
      <PageHeader
        title="Analytics"
        subtitle="Comprehensive performance reports and department analytics"
        icon={<BarChart3 className="h-5 w-5" />}
        actions={<button className="btn-primary"><Download className="h-4 w-4" /> Export to PDF</button>}
      />

      {/* AI Banner */}
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-ai-200 bg-gradient-to-r from-ai-50 to-white p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ai-500 text-white shadow-sm">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-ai-800">AI-Driven Institutional Analytics</h3>
          <p className="text-sm text-ai-600">Comparative department performance and automated risk summaries.</p>
        </div>
      </div>

      {/* Department Comparison */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Building2 className="h-4 w-4 text-crimson-600" /> Department Attendance Comparison
          </h3>
          <BarChart
            data={deptData.map((d) => ({
              label: d.dept,
              value: d.attendance,
              color: d.attendance >= 85 ? '#388E3C' : '#8A1B2F',
            }))}
          />
        </div>
        <div className="card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <FileBarChart className="h-4 w-4 text-ai-600" /> Department Performance Comparison
          </h3>
          <BarChart
            data={deptData.map((d) => ({
              label: d.dept,
              value: d.performance,
              color: d.performance >= 80 ? '#388E3C' : d.performance >= 70 ? '#8A1B2F' : '#B85967',
            }))}
          />
        </div>
      </div>

      {/* Department Table */}
      <div className="card mb-6 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-sm font-semibold text-gray-900">Department-wise Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Students</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">At-Risk</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deptData.map((d) => {
                const risk = riskData.find((r) => r.dept === d.dept);
                return (
                  <tr key={d.dept} className="table-row-hover">
                    <td className="px-6 py-3 font-medium text-gray-900">{d.dept}</td>
                    <td className="px-6 py-3 text-gray-600">{d.students}</td>
                    <td className="px-6 py-3"><span className={`font-semibold ${d.attendance >= 85 ? 'text-mint-700' : 'text-crimson-700'}`}>{d.attendance}%</span></td>
                    <td className="px-6 py-3"><span className={`font-semibold ${d.performance >= 80 ? 'text-mint-700' : 'text-crimson-700'}`}>{d.performance}%</span></td>
                    <td className="px-6 py-3"><span className="badge bg-crimson-50 text-crimson-700">{risk?.atRisk ?? 0}</span></td>
                    <td className="px-6 py-3">
                      {(risk?.atRisk ?? 0) > 2 ? (
                        <span className="badge bg-crimson-100 text-crimson-700">Critical</span>
                      ) : (risk?.atRisk ?? 0) > 0 ? (
                        <span className="badge bg-amber-100 text-amber-700">Monitor</span>
                      ) : (
                        <span className="badge bg-mint-100 text-mint-700">Healthy</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Risk Summary */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
          <Sparkles className="h-4 w-4 text-ai-600" /> AI-Driven Risk Summary
        </h3>
        <div className="grid gap-3 lg:grid-cols-2">
          {insights.map(insightCard)}
        </div>
      </div>
    </PortalLayout>
  );
}
