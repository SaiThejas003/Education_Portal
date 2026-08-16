import { useState } from 'react';
import { FileText, Upload, Clock, CheckCircle, Award, Sparkles, X } from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import { useApp } from '../../store/AppContext';
import type { Assignment } from '../../data/types';

type Tab = 'active' | 'submitted' | 'graded';

export default function StudentAssignments() {
  const { subjects, assignments, submitAssignment } = useApp();
  const [tab, setTab] = useState<Tab>('active');
  const [submitTarget, setSubmitTarget] = useState<Assignment | null>(null);
  const [fileName, setFileName] = useState('');

  const filtered = assignments.filter((a) => {
    if (tab === 'active') return a.status === 'pending';
    if (tab === 'submitted') return a.status === 'submitted';
    return a.status === 'graded';
  });

  const handleSubmit = () => {
    if (submitTarget && fileName) {
      submitAssignment(submitTarget.id, fileName);
      setSubmitTarget(null);
      setFileName('');
    }
  };

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'active', label: 'Active', count: assignments.filter((a) => a.status === 'pending').length },
    { key: 'submitted', label: 'Submitted', count: assignments.filter((a) => a.status === 'submitted').length },
    { key: 'graded', label: 'Graded', count: assignments.filter((a) => a.status === 'graded').length },
  ];

  return (
    <PortalLayout role="student">
      <PageHeader title="Assignments" subtitle="View, submit, and review your coursework" icon={<FileText className="h-5 w-5" />} />

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg border border-gray-200 bg-white p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key ? 'bg-crimson-700 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((a) => {
          const subject = subjects.find((s) => s.id === a.subjectId);
          const percentage = a.obtainedMarks !== undefined ? Math.round((a.obtainedMarks / a.maxMarks) * 100) : 0;
          return (
            <div key={a.id} className="card p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-crimson-50 text-crimson-700">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{a.title}</h3>
                      <p className="text-sm text-gray-500">{subject?.name} &middot; {subject?.code}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{a.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="h-3.5 w-3.5" /> Due: {a.dueDate}
                    </span>
                    <span className="badge bg-gray-100 text-gray-600">{a.maxMarks} marks</span>
                    {a.submittedAt && (
                      <span className="flex items-center gap-1.5 text-xs text-mint-700">
                        <CheckCircle className="h-3.5 w-3.5" /> Submitted: {a.submittedAt}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {a.status === 'pending' && (
                    <button onClick={() => setSubmitTarget(a)} className="btn-primary">
                      <Upload className="h-4 w-4" /> Submit
                    </button>
                  )}
                  {a.status === 'submitted' && (
                    <span className="badge bg-ai-50 text-ai-600">Awaiting Grading</span>
                  )}
                  {a.status === 'graded' && (
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${percentage >= 70 ? 'text-mint-700' : 'text-crimson-700'}`}>
                        {a.obtainedMarks}/{a.maxMarks}
                      </p>
                      <p className="text-xs text-gray-400">{percentage}%</p>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Feedback */}
              {a.status === 'graded' && a.aiFeedback && (
                <div className="mt-4 rounded-lg border border-ai-200 bg-ai-50 p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-ai-600" />
                    <span className="text-xs font-semibold text-ai-700">AI Feedback</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ai-700">{a.aiFeedback}</p>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="card flex flex-col items-center justify-center py-16 text-center">
            <FileText className="h-10 w-10 text-gray-300" />
            <p className="mt-4 text-sm font-medium text-gray-500">No {tab} assignments</p>
          </div>
        )}
      </div>

      {/* Submit Modal */}
      {submitTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSubmitTarget(null)} />
          <div className="relative z-10 w-full max-w-md animate-scale-in rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Submit Assignment</h3>
              <button onClick={() => setSubmitTarget(null)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">{submitTarget.title}</p>
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">Upload File</label>
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-crimson-400">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter file name (e.g. report.pdf)"
                  className="input-field mt-3 text-center"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setSubmitTarget(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleSubmit} disabled={!fileName} className="btn-primary flex-1">
                <Upload className="h-4 w-4" /> Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
