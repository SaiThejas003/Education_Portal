import { ClipboardList, Calendar, Award, Clock, CheckCircle } from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import { useApp } from '../../store/AppContext';

export default function StudentExams() {
  const { subjects, exams } = useApp();
  const scheduled = exams.filter((e) => e.status === 'scheduled');
  const completed = exams.filter((e) => e.status === 'completed');

  return (
    <PortalLayout role="student">
      <PageHeader title="Exams & Grades" subtitle="Examination schedule and academic grade history" icon={<ClipboardList className="h-5 w-5" />} />

      {/* Scheduled Exams */}
      <div className="card mb-6 overflow-hidden">
        <div className="border-b border-gray-200 bg-crimson-50 px-6 py-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-crimson-800">
            <Calendar className="h-4 w-4" /> Upcoming Examination Schedule
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {scheduled.map((e) => {
            const subject = subjects.find((s) => s.id === e.subjectId);
            return (
              <div key={e.id} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-crimson-50/30">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-crimson-700 text-white">
                    <span className="text-[10px] font-medium uppercase">{e.date.split('-')[1]}</span>
                    <span className="text-lg font-bold leading-none">{e.date.split('-')[2]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{e.name}</p>
                    <p className="text-sm text-gray-500">{subject?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="badge bg-gray-100 text-gray-600">{e.maxMarks} marks</span>
                  <span className={`badge ${e.type === 'internal' ? 'bg-crimson-50 text-crimson-700' : 'bg-ai-50 text-ai-600'}`}>
                    {e.type}
                  </span>
                </div>
              </div>
            );
          })}
          {scheduled.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-gray-400">No scheduled exams</p>
          )}
        </div>
      </div>

      {/* Grade History */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Award className="h-4 w-4" /> Academic Grade History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Exam</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Marks</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {completed.map((e) => {
                const subject = subjects.find((s) => s.id === e.subjectId);
                const pct = e.obtainedMarks !== undefined ? Math.round((e.obtainedMarks / e.maxMarks) * 100) : 0;
                const grade = pct >= 85 ? 'A+' : pct >= 75 ? 'A' : pct >= 65 ? 'B+' : pct >= 55 ? 'B' : pct >= 45 ? 'C' : 'F';
                const gradeColor = pct >= 75 ? 'text-mint-700' : pct >= 55 ? 'text-amber-600' : 'text-crimson-700';
                return (
                  <tr key={e.id} className="table-row-hover">
                    <td className="px-6 py-3 font-medium text-gray-900">{e.name}</td>
                    <td className="px-6 py-3 text-gray-600">{subject?.name}</td>
                    <td className="px-6 py-3">
                      <span className={`badge ${e.type === 'internal' ? 'bg-crimson-50 text-crimson-700' : 'bg-ai-50 text-ai-600'}`}>{e.type}</span>
                    </td>
                    <td className="px-6 py-3 text-gray-500">{e.date}</td>
                    <td className="px-6 py-3 text-gray-900">{e.obtainedMarks}/{e.maxMarks}</td>
                    <td className={`px-6 py-3 font-bold ${gradeColor}`}>{grade}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PortalLayout>
  );
}
