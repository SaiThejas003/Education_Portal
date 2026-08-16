import { useState } from 'react';
import { CalendarCheck, Check, X, Save, Users } from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import { useApp } from '../../store/AppContext';

interface StudentRow {
  id: string;
  name: string;
  rollNo: string;
  status: 'present' | 'absent';
}

export default function FacultyAttendance() {
  const { subjects, markAttendance } = useApp();
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.id ?? '');
  const [date, setDate] = useState('2026-08-30');
  const [students, setStudents] = useState<StudentRow[]>([
    { id: 's1', name: 'Arjun Karthikeyan', rollNo: '24EEE042', status: 'present' },
    { id: 's2', name: 'Priya Venkatesan', rollNo: '24EEE043', status: 'present' },
    { id: 's3', name: 'Karthik Raja', rollNo: '24EEE044', status: 'absent' },
    { id: 's4', name: 'Divya Lakshmi', rollNo: '24EEE045', status: 'present' },
    { id: 's5', name: 'Surya Prakash', rollNo: '24EEE046', status: 'present' },
    { id: 's6', name: 'Anitha Rajan', rollNo: '24EEE047', status: 'present' },
    { id: 's7', name: 'Vigneshwaran S', rollNo: '24EEE048', status: 'absent' },
    { id: 's8', name: 'Bhavana R', rollNo: '24EEE049', status: 'present' },
  ]);
  const [saved, setSaved] = useState(false);

  const toggleStatus = (id: string) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s)));
  };

  const markAll = (status: 'present' | 'absent') => {
    setStudents((prev) => prev.map((s) => ({ ...s, status })));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const presentCount = students.filter((s) => s.status === 'present').length;
  const subject = subjects.find((s) => s.id === selectedSubject);

  return (
    <PortalLayout role="faculty">
      <PageHeader title="Mark Attendance" subtitle="Record daily attendance for your classes" icon={<CalendarCheck className="h-5 w-5" />} />

      {/* Controls */}
      <div className="card mb-6 p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Subject</label>
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="input-field">
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Section</label>
            <input type="text" value="A" readOnly className="input-field bg-gray-50" />
          </div>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="font-semibold text-gray-900">{students.length}</span>
            <span className="text-gray-500">students</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-mint-600" />
            <span className="font-semibold text-mint-700">{presentCount}</span>
            <span className="text-gray-500">present</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <X className="h-4 w-4 text-crimson-600" />
            <span className="font-semibold text-crimson-700">{students.length - presentCount}</span>
            <span className="text-gray-500">absent</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => markAll('present')} className="btn-ghost text-xs text-mint-700 hover:bg-mint-50">Mark All Present</button>
          <button onClick={() => markAll('absent')} className="btn-ghost text-xs text-crimson-700 hover:bg-crimson-50">Mark All Absent</button>
        </div>
      </div>

      {/* Student List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Roll No.</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Student Name</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((s) => (
                <tr key={s.id} className="table-row-hover">
                  <td className="px-6 py-3 font-medium text-gray-900">{s.rollNo}</td>
                  <td className="px-6 py-3 text-gray-600">{s.name}</td>
                  <td className="px-6 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setStudents((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: 'present' } : x)))}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                          s.status === 'present' ? 'bg-mint-100 text-mint-700' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => setStudents((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: 'absent' } : x)))}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                          s.status === 'absent' ? 'bg-crimson-50 text-crimson-700' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          {saved ? (
            <span className="text-sm font-medium text-mint-700 animate-fade-in">Attendance saved successfully for {subject?.name}.</span>
          ) : (
            <span className="text-sm text-gray-500">Changes are not saved until you click Save.</span>
          )}
          <button onClick={handleSave} className="btn-primary">
            <Save className="h-4 w-4" /> Save Attendance
          </button>
        </div>
      </div>
    </PortalLayout>
  );
}
