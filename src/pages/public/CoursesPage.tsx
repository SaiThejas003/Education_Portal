import { useState } from 'react';
import { Search, X, BookOpen, User, CreditCard, Layers, Filter } from 'lucide-react';
import PublicHeader from '../../components/PublicHeader';
import PublicFooter from '../../components/PublicFooter';
import { courseCatalog, subjects } from '../../data/mockData';

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [department, setDepartment] = useState('All');
  const [selected, setSelected] = useState<string | null>(null);

  const departments = ['All', ...Array.from(new Set(courseCatalog.map((c) => c.department)))];
  const categories = ['All', ...Array.from(new Set(courseCatalog.map((c) => c.category)))];

  const filtered = courseCatalog.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    const matchDept = department === 'All' || c.department === department;
    return matchSearch && matchCat && matchDept;
  });

  const selectedSubject = subjects.find((s) => s.code === selected);

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <div className="bg-gradient-to-br from-crimson-800 to-crimson-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Academic Curriculum</h1>
          <p className="mt-2 text-crimson-100">
            Explore courses offered across departments at KIT
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Search & Filters */}
        <div className="card mb-8 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by course name or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 focus:border-crimson-500 focus:outline-none focus:ring-2 focus:ring-crimson-500/20"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
                  ))}
                </select>
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 focus:border-crimson-500 focus:outline-none focus:ring-2 focus:ring-crimson-500/20"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="mb-4 text-sm text-gray-500">{filtered.length} course(s) found</p>

        {/* Course Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelected(course.code)}
              className="card group p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-elevated hover:border-crimson-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-crimson-50 text-crimson-700">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className={`badge ${course.category === 'Core' ? 'bg-crimson-50 text-crimson-700' : 'bg-ai-50 text-ai-600'}`}>
                  {course.category}
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900 group-hover:text-crimson-700">{course.name}</h3>
              <p className="mt-1 text-xs font-medium text-crimson-600">{course.code}</p>
              <p className="mt-2 text-xs text-gray-500">{course.department}</p>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <CreditCard className="h-3.5 w-3.5" />
                  {course.credits} Credits
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Layers className="h-3.5 w-3.5" />
                  Sem {course.semester}
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card flex flex-col items-center justify-center py-16 text-center">
            <Search className="h-10 w-10 text-gray-300" />
            <p className="mt-4 text-sm font-medium text-gray-500">No courses match your search</p>
          </div>
        )}
      </div>

      {/* Course Details Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-2xl animate-scale-in overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between bg-crimson-700 px-6 py-5">
              <div>
                <span className="badge bg-white/20 text-white">{selectedSubject.category}</span>
                <h2 className="mt-2 text-xl font-bold text-white">{selectedSubject.name}</h2>
                <p className="text-sm text-crimson-100">{selectedSubject.code} &middot; {selectedSubject.credits} Credits &middot; Semester {selectedSubject.semester}</p>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
              <p className="text-sm leading-relaxed text-gray-600">{selectedSubject.description}</p>

              <div className="mt-5 flex items-center gap-3 rounded-lg bg-crimson-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-crimson-700 text-sm font-bold text-white">
                  {selectedSubject.facultyName.split(' ').map((n) => n[n.length - 1]?.[0] ?? '').join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{selectedSubject.facultyName}</p>
                  <p className="text-xs text-gray-500">Course Faculty</p>
                </div>
              </div>

              <h3 className="mt-6 text-sm font-semibold text-gray-900">Syllabus Modules</h3>
              <ol className="mt-3 space-y-2">
                {selectedSubject.syllabus.map((mod, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-lg border border-gray-100 p-3 text-sm text-gray-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-xs font-bold text-crimson-700">
                      {i + 1}
                    </span>
                    {mod}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
