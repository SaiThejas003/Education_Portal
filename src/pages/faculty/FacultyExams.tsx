import { useState } from 'react';
import { ClipboardList, Save, CheckCircle } from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import { useApp } from '../../store/AppContext';

export default function FacultyExams() {
  const { subjects, exams, inputExamMarks } = useApp();
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const scheduledExams = exams.filter((e) => e.status === 'scheduled');

  const handleSave = (examId: string) => {
    const value = marks[examId];
    if (value !== undefined && value !== '') {
      inputExamMarks(examId, parseInt(value));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const completedExams = exams.filter((e) => e.status === 'completed');

  return (
    <PortalLayout role="faculty">
      <PageHeader title="Exam Marks" subtitle="Input internal and external examination marks" icon={<ClipboardList className="h-5 w-5" />} />

      {/* Input Marks */}
      <div className="card mb-6 overflow-hidden">
        <div className="border-b border-gray-200 bg-crimson-50 px-6 py-4">
          <h3 className="text-sm font-semibold text-crimson-800">Pending Mark Entry</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Exam</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Max Marks</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Enter Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scheduledExams.map((e) => {
                const subject = subjects.find((s) => s.id === e.subjectId);
                return (
                  <tr key={e.id} className="table-row-hover">
                    <td className="px-6 py-3 font-medium text-gray-900">{e.name}</td>
                    <td className="px-6 py-3 text-gray-600">{subject?.name}</td>
                    <td className="px-6 py-3"><span className={`badge ${e.type === 'internal' ? 'bg-crimson-50 text-crimson-700' : 'bg-ai-50 text-ai-600'}`}>{e.type}</span></td>
                    <td className="px-6 py-3 text-gray-500">{e.date}</td>
                    <td className="px-6 py-3 text-gray-600">{e.maxMarks}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <input
                          type="number"
                          max={e.maxMarks}
                          value={marks[e.id] ?? ''}
                          onChange={(ev) => setMarks({ ...marks, [e.id]: ev.target.value })}
                          className="w-20 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-crimson-500 focus:outline-none focus:ring-2 focus:ring-crimson-500/20"
                          placeholder="0"
                        />
                        <button onClick={() => handleSave(e.id)} className="btn-ghost text-xs text-crimson-700"><Save className="h-3.5 w-3.5" /> Save</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {scheduledExams.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-400">All exams have been graded</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {saved && (
          <div className="border-t border-gray-200 bg-mint-50 px-6 py-3">
            <span className="flex items-center gap-2 text-sm text-mint-700 animate-fade-in"><CheckCircle className="h-4 w-4" /> Marks saved successfully.</span>
          </div>
        )}
      </div>

      {/* Completed Marks */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-sm font-semibold text-gray-900">Completed Mark Entry</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Exam</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Marks</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {completedExams.map((e) => {
                const subject = subjects.find((s) => s.id === e.subjectId);
                const pct = e.obtainedMarks !== undefined ? Math.round((e.obtainedMarks / e.maxMarks) * 100) : 0;
                return (
                  <tr key={e.id} className="table-row-hover">
                    <td className="px-6 py-3 font-medium text-gray-900">{e.name}</td>
                    <td className="px-6 py-3 text-gray-600">{subject?.name}</td>
                    <td className="px-6 py-3"><span className={`badge ${e.type === 'internal' ? 'bg-crimson-50 text-crimson-700' : 'bg-ai-50 text-ai-600'}`}>{e.type}</span></td>
                    <td className="px-6 py-3 text-gray-900">{e.obtainedMarks}/{e.maxMarks}</td>
                    <td className={`px-6 py-3 font-semibold ${pct >= 75 ? 'text-mint-700' : 'text-crimson-700'}`}>{pct}%</td>
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
