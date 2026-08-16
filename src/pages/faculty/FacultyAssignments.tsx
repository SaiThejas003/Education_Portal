import { useState } from 'react';
import { FileText, Plus, Clock, CheckCircle, Users, X, Save, Sparkles } from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import { useApp } from '../../store/AppContext';
import type { FacultyAssignment } from '../../data/types';

export default function FacultyAssignments() {
  const { subjects, facultyAssignments, addAssignment, gradeAssignment, assignments } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [gradeTarget, setGradeTarget] = useState<{ id: string; title: string; maxMarks: number } | null>(null);
  const [gradeMarks, setGradeMarks] = useState('');
  const [newAsg, setNewAsg] = useState({ subjectId: subjects[0]?.id ?? '', title: '', description: '', dueDate: '', maxMarks: 20 });

  const handleCreate = () => {
    if (newAsg.title && newAsg.dueDate) {
      addAssignment({
        subjectId: newAsg.subjectId,
        title: newAsg.title,
        description: newAsg.description,
        dueDate: newAsg.dueDate,
        maxMarks: newAsg.maxMarks,
      });
      setShowCreate(false);
      setNewAsg({ subjectId: subjects[0]?.id ?? '', title: '', description: '', dueDate: '', maxMarks: 20 });
    }
  };

  const handleGrade = () => {
    if (gradeTarget && gradeMarks) {
      gradeAssignment(gradeTarget.id, parseInt(gradeMarks));
      setGradeTarget(null);
      setGradeMarks('');
    }
  };

  const submittedAssignments = assignments.filter((a) => a.status === 'submitted' || a.status === 'graded');

  return (
    <PortalLayout role="faculty">
      <PageHeader
        title="Assignments"
        subtitle="Create coursework and grade student submissions"
        icon={<FileText className="h-5 w-5" />}
        actions={<button onClick={() => setShowCreate(true)} className="btn-primary"><Plus className="h-4 w-4" /> New Assignment</button>}
      />

      {/* Assignment Overview */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facultyAssignments.map((f: FacultyAssignment) => {
          const progress = f.totalSubmissions > 0 ? Math.round((f.graded / f.totalSubmissions) * 100) : 0;
          return (
            <div key={f.id} className="card p-5">
              <p className="text-sm font-semibold text-gray-900">{f.title}</p>
              <p className="text-xs text-gray-500">{f.subjectName}</p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-gray-500"><Users className="h-3.5 w-3.5" /> {f.totalSubmissions}/{f.totalStudents}</span>
                <span className="flex items-center gap-1 text-gray-500"><Clock className="h-3.5 w-3.5" /> {f.dueDate}</span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Grading progress</span>
                  <span className="font-semibold text-gray-700">{progress}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-gray-100">
                  <div className="h-1.5 rounded-full bg-crimson-700 transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submissions to Grade */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-sm font-semibold text-gray-900">Student Submissions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Assignment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submittedAssignments.map((a) => {
                const subject = subjects.find((s) => s.id === a.subjectId);
                return (
                  <tr key={a.id} className="table-row-hover">
                    <td className="px-6 py-3 font-medium text-gray-900">{a.title}</td>
                    <td className="px-6 py-3 text-gray-600">{subject?.name}</td>
                    <td className="px-6 py-3 text-gray-500">{a.submittedAt ?? '-'}</td>
                    <td className="px-6 py-3">
                      {a.status === 'graded' ? (
                        <span className="badge bg-mint-100 text-mint-700"><CheckCircle className="h-3 w-3" /> Graded: {a.obtainedMarks}/{a.maxMarks}</span>
                      ) : (
                        <span className="badge bg-ai-50 text-ai-600">Awaiting</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-right">
                      {a.status === 'submitted' && (
                        <button
                          onClick={() => setGradeTarget({ id: a.id, title: a.title, maxMarks: a.maxMarks })}
                          className="btn-ghost text-xs text-crimson-700"
                        >
                          Grade
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCreate(false)} />
          <div className="relative z-10 w-full max-w-lg animate-scale-in rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Create New Assignment</h3>
              <button onClick={() => setShowCreate(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Title</label>
                <input type="text" value={newAsg.title} onChange={(e) => setNewAsg({ ...newAsg, title: e.target.value })} className="input-field" placeholder="Assignment title" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Subject</label>
                <select value={newAsg.subjectId} onChange={(e) => setNewAsg({ ...newAsg, subjectId: e.target.value })} className="input-field">
                  {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
                <textarea rows={3} value={newAsg.description} onChange={(e) => setNewAsg({ ...newAsg, description: e.target.value })} className="input-field resize-none" placeholder="Assignment description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Due Date</label>
                  <input type="date" value={newAsg.dueDate} onChange={(e) => setNewAsg({ ...newAsg, dueDate: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Max Marks</label>
                  <input type="number" value={newAsg.maxMarks} onChange={(e) => setNewAsg({ ...newAsg, maxMarks: parseInt(e.target.value) || 0 })} className="input-field" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowCreate(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleCreate} disabled={!newAsg.title || !newAsg.dueDate} className="btn-primary flex-1"><Plus className="h-4 w-4" /> Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Grade Modal */}
      {gradeTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setGradeTarget(null)} />
          <div className="relative z-10 w-full max-w-md animate-scale-in rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Grade Submission</h3>
              <button onClick={() => setGradeTarget(null)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <p className="mt-2 text-sm text-gray-500">{gradeTarget.title}</p>
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Marks Obtained (out of {gradeTarget.maxMarks})</label>
              <input type="number" max={gradeTarget.maxMarks} value={gradeMarks} onChange={(e) => setGradeMarks(e.target.value)} className="input-field" placeholder="Enter marks" />
            </div>
            <div className="mt-4 rounded-lg border border-ai-200 bg-ai-50 p-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-ai-600" />
                <span className="text-xs font-semibold text-ai-700">AI Feedback Auto-Generation</span>
              </div>
              <p className="mt-1 text-xs text-ai-600">AI feedback will be automatically generated based on the marks entered.</p>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setGradeTarget(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleGrade} disabled={!gradeMarks} className="btn-primary flex-1"><Save className="h-4 w-4" /> Save Grade</button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
