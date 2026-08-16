import { Sparkles, ShieldAlert, Lightbulb, TrendingUp, Award, Target, AlertTriangle } from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import { useApp } from '../../store/AppContext';
import { generateStudentInsights, getSubjectPerformance } from '../../data/AIEngine';

export default function StudentInsights() {
  const { subjects, attendanceRecords, assignments, exams } = useApp();
  const insights = generateStudentInsights(subjects, attendanceRecords, assignments, exams);
  const performance = getSubjectPerformance(subjects, attendanceRecords, assignments, exams);

  const risks = insights.filter((i) => i.type === 'risk');
  const recommendations = insights.filter((i) => i.type === 'recommendation');
  const trends = insights.filter((i) => i.type === 'trend');
  const achievements = insights.filter((i) => i.type === 'achievement');

  const insightCard = (ins: typeof insights[0]) => {
    const config = {
      risk: { icon: ShieldAlert, bg: 'border-crimson-200 bg-crimson-50/50', iconBg: 'bg-crimson-100 text-crimson-700', label: 'Risk Alert' },
      recommendation: { icon: Lightbulb, bg: 'border-ai-200 bg-ai-50/50', iconBg: 'bg-ai-100 text-ai-700', label: 'Recommendation' },
      trend: { icon: TrendingUp, bg: 'border-amber-200 bg-amber-50/50', iconBg: 'bg-amber-100 text-amber-700', label: 'Trend' },
      achievement: { icon: Award, bg: 'border-mint-200 bg-mint-50', iconBg: 'bg-mint-100 text-mint-700', label: 'Achievement' },
    };
    const c = config[ins.type];
    const Icon = c.icon;
    return (
      <div key={ins.id} className={`rounded-lg border p-4 ${c.bg}`}>
        <div className="flex items-start gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${c.iconBg}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{c.label}</span>
              {ins.severity === 'high' && <span className="badge bg-crimson-100 text-crimson-700">High Priority</span>}
            </div>
            <h4 className="mt-1 text-sm font-semibold text-gray-900">{ins.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">{ins.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PortalLayout role="student">
      <PageHeader title="AI Insights" subtitle="Personalized academic analysis and recommendations" icon={<Sparkles className="h-5 w-5" />} />

      {/* AI Engine Banner */}
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-ai-200 bg-gradient-to-r from-ai-50 to-white p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ai-500 text-white shadow-sm">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-ai-800">KIT AI Engine - Active</h3>
          <p className="text-sm text-ai-600">Continuously analyzing your attendance, assignments, and exam performance to generate real-time insights.</p>
        </div>
      </div>

      {/* Risk Summary */}
      {risks.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
            <AlertTriangle className="h-4 w-4 text-crimson-600" /> Risk Alerts ({risks.length})
          </h3>
          <div className="grid gap-3 lg:grid-cols-2">
            {risks.map(insightCard)}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
            <Target className="h-4 w-4 text-ai-600" /> AI Recommendations ({recommendations.length})
          </h3>
          <div className="grid gap-3 lg:grid-cols-2">
            {recommendations.map(insightCard)}
          </div>
        </div>
      )}

      {/* Trends & Achievements */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {trends.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
              <TrendingUp className="h-4 w-4 text-amber-600" /> Trend Analysis
            </h3>
            <div className="space-y-3">{trends.map(insightCard)}</div>
          </div>
        )}
        {achievements.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
              <Award className="h-4 w-4 text-mint-600" /> Achievements
            </h3>
            <div className="space-y-3">{achievements.map(insightCard)}</div>
          </div>
        )}
      </div>

      {/* Subject Performance Matrix */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-sm font-semibold text-gray-900">Subject Performance Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Exam Avg</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Assignment Avg</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Overall</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {performance.map((p) => (
                <tr key={p.subjectId} className="table-row-hover">
                  <td className="px-6 py-3 font-medium text-gray-900">{p.subjectName}</td>
                  <td className={`px-6 py-3 font-semibold ${p.attendancePercentage >= 75 ? 'text-mint-700' : 'text-crimson-700'}`}>{p.attendancePercentage}%</td>
                  <td className="px-6 py-3 text-gray-600">{p.avgExamScore}%</td>
                  <td className="px-6 py-3 text-gray-600">{p.avgAssignmentScore}%</td>
                  <td className={`px-6 py-3 font-bold ${p.overallScore >= 75 ? 'text-mint-700' : p.overallScore >= 50 ? 'text-amber-600' : 'text-crimson-700'}`}>{p.overallScore}%</td>
                  <td className="px-6 py-3">
                    {p.attendancePercentage < 75 ? (
                      <span className="badge bg-crimson-100 text-crimson-700">At Risk</span>
                    ) : p.overallScore >= 75 ? (
                      <span className="badge bg-mint-100 text-mint-700">On Track</span>
                    ) : (
                      <span className="badge bg-amber-100 text-amber-700">Needs Attention</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalLayout>
  );
}
