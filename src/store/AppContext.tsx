import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Assignment, AttendanceRecord, Exam, ManagedUser } from '../data/types';
import {
  studentProfile,
  facultyProfile,
  adminProfile,
  subjects,
  attendanceRecords,
  assignments as initialAssignments,
  exams as initialExams,
  lectures,
  facultyAssignments,
  managedUsers as initialManagedUsers,
} from '../data/mockData';
import { generateAssignmentFeedback } from '../data/AIEngine';

interface AppContextValue {
  // Auth
  activeRole: 'student' | 'faculty' | 'admin';
  setActiveRole: (role: 'student' | 'faculty' | 'admin') => void;
  // Data
  subjects: typeof subjects;
  attendanceRecords: AttendanceRecord[];
  assignments: Assignment[];
  exams: Exam[];
  lectures: typeof lectures;
  facultyAssignments: typeof facultyAssignments;
  managedUsers: ManagedUser[];
  // Profiles
  studentProfile: typeof studentProfile;
  facultyProfile: typeof facultyProfile;
  adminProfile: typeof adminProfile;
  // Actions
  submitAssignment: (assignmentId: string, fileName: string) => void;
  gradeAssignment: (assignmentId: string, marks: number) => void;
  markAttendance: (recordId: string, status: 'present' | 'absent') => void;
  addAssignment: (assignment: Omit<Assignment, 'id' | 'status'>) => void;
  inputExamMarks: (examId: string, marks: number) => void;
  addManagedUser: (user: Omit<ManagedUser, 'id' | 'joinedDate' | 'status'> & { status?: ManagedUser['status'] }) => void;
  updateManagedUser: (id: string, updates: Partial<ManagedUser>) => void;
  deleteManagedUser: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeRole, setActiveRole] = useState<'student' | 'faculty' | 'admin'>('student');
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(attendanceRecords);
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [managedUsers, setManagedUsers] = useState<ManagedUser[]>(initialManagedUsers);

  const submitAssignment = (assignmentId: string, fileName: string) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? { ...a, status: 'submitted', submittedAt: new Date().toISOString().split('T')[0], fileName }
          : a
      )
    );
  };

  const gradeAssignment = (assignmentId: string, marks: number) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id !== assignmentId) return a;
        const updated = { ...a, status: 'graded' as const, obtainedMarks: marks };
        updated.aiFeedback = generateAssignmentFeedback(a, marks);
        return updated;
      })
    );
  };

  const markAttendance = (recordId: string, status: 'present' | 'absent') => {
    setAttendance((prev) =>
      prev.map((r) => (r.id === recordId ? { ...r, status } : r))
    );
  };

  const addAssignment = (assignment: Omit<Assignment, 'id' | 'status'>) => {
    const newAsg: Assignment = {
      ...assignment,
      id: `asg-${Date.now()}`,
      status: 'pending',
    };
    setAssignments((prev) => [...prev, newAsg]);
  };

  const inputExamMarks = (examId: string, marks: number) => {
    setExams((prev) =>
      prev.map((e) =>
        e.id === examId
          ? { ...e, obtainedMarks: marks, status: 'completed' as const }
          : e
      )
    );
  };

  const addManagedUser = (user: Omit<ManagedUser, 'id' | 'joinedDate' | 'status'> & { status?: ManagedUser['status'] }) => {
    const newUser: ManagedUser = {
      ...user,
      id: `u-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      status: user.status ?? 'active',
    };
    setManagedUsers((prev) => [...prev, newUser]);
  };

  const updateManagedUser = (id: string, updates: Partial<ManagedUser>) => {
    setManagedUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  };

  const deleteManagedUser = (id: string) => {
    setManagedUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        subjects,
        attendanceRecords: attendance,
        assignments,
        exams,
        lectures,
        facultyAssignments,
        managedUsers,
        studentProfile,
        facultyProfile,
        adminProfile,
        submitAssignment,
        gradeAssignment,
        markAttendance,
        addAssignment,
        inputExamMarks,
        addManagedUser,
        updateManagedUser,
        deleteManagedUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
