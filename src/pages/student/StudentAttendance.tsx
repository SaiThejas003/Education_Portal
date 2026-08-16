import { CalendarCheck, Check, X, TrendingUp } from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import BarChart from '../../components/BarChart';
import { useApp } from '../../store/AppContext';
import { getSubjectPerformance } from '../../data/AIEngine';

export default function StudentAttendance() {
  const { subjects, attendanceRecords } = useApp();
  const performance = getSubjectPerformance(subjects, attendanceRecords, [], []);

  return (
    <PortalLayout role="student">
      <PageHeader
        title="Attendance"
        subtitle="Daily log and subject-wise breakdown"
        icon={<CalendarCheck className="h-5 w-5" />}
      />

      {/* Subject-wise Breakdown */}
      <div className="card mb-6 p-6">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">Subject-wise Attendance Percentage</h3>
        <BarChart
          data={performance.map((p) => ({
            label: p.subjectName.split(' ').slice(0, 2).join(' '),
            value: p.attendancePercentage,
            color: p.attendancePercentage >= 75 ? '#388E3C' : '#8A1B2F',
          }))}
        />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {performance.map((p) => {
            const records = attendanceRecords.filter((r) => r.subjectId === p.subjectId);
            const attended = records.filter((r) => r.status === 'present').length;
            return (
              <div key={p.subjectId} className={`rounded-lg border p-4 ${p.attendancePercentage < 75 ? 'border-crimson-200 bg-crimson-50/50' : 'border-mint-200 bg-mint-50'}`}>
                <p className="text-xs font-medium text-gray-500">{p.subjectName}</p>
                <p className={`mt-1 text-2xl font-bold ${p.attendancePercentage >= 75 ? 'text-mint-700' : 'text-crimson-700'}`}>
                  {p.attendancePercentage}%
                </p>
                <p className="mt-1 text-xs text-gray-500">{attended}/{records.length} classes attended</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Log */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-sm font-semibold text-gray-900">Daily Attendance Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Period</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[...attendanceRecords].reverse().map((r) => {
                const subject = subjects.find((s) => s.id === r.subjectId);
                return (
                  <tr key={r.id} className="table-row-hover">
                    <td className="px-6 py-3 text-gray-900">{r.date}</td>
                    <td className="px-6 py-3 text-gray-600">{subject?.name}</td>
                    <td className="px-6 py-3 text-gray-600">Period {r.period}</td>
                    <td className="px-6 py-3">
                      {r.status === 'present' ? (
                        <span className="badge bg-mint-100 text-mint-700"><Check className="h-3 w-3" /> Present</span>
                      ) : (
                        <span className="badge bg-crimson-50 text-crimson-700"><X className="h-3 w-3" /> Absent</span>
                      )}
                    </td>
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
