export type Role = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface AdminUser extends User {
  role: 'admin';
  title: string;
}

export interface FacultyUser extends User {
  role: 'faculty';
  department: string;
  designation: string;
  employeeId: string;
}

export interface StudentUser extends User {
  role: 'student';
  rollNo: string;
  department: string;
  year: number;
  section: string;
  semester: number;
  advisor: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  department: string;
  credits: number;
  facultyId: string;
  facultyName: string;
  semester: number;
  category: string;
  syllabus: string[];
  description: string;
}

export interface AttendanceRecord {
  id: string;
  subjectId: string;
  date: string;
  status: 'present' | 'absent';
  period: number;
}

export interface SubjectAttendance {
  subjectId: string;
  totalClasses: number;
  attended: number;
  percentage: number;
}

export interface Assignment {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
  status: 'pending' | 'submitted' | 'graded';
  submittedAt?: string;
  obtainedMarks?: number;
  aiFeedback?: string;
  fileName?: string;
}

export interface Exam {
  id: string;
  subjectId: string;
  name: string;
  date: string;
  maxMarks: number;
  obtainedMarks?: number;
  type: 'internal' | 'external';
  semester: number;
  status: 'scheduled' | 'completed';
}

export interface Lecture {
  id: string;
  subjectId: string;
  subjectName: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  section: string;
}

export interface FacultyAssignment {
  id: string;
  subjectId: string;
  subjectName: string;
  section: string;
  title: string;
  dueDate: string;
  totalSubmissions: number;
  totalStudents: number;
  graded: number;
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  rollNo?: string;
  employeeId?: string;
  year?: number;
  designation?: string;
  status: 'active' | 'inactive';
  joinedDate: string;
}

export interface AIInsight {
  id: string;
  type: 'risk' | 'recommendation' | 'trend' | 'achievement';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  subjectId?: string;
  subjectName?: string;
}
