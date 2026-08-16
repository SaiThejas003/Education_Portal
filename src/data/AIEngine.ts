import type { AIInsight, Assignment, AttendanceRecord, Exam, Subject } from './types';

const ATTENDANCE_THRESHOLD = 75;

interface SubjectPerformance {
  subjectId: string;
  subjectName: string;
  attendancePercentage: number;
  avgExamScore: number;
  avgAssignmentScore: number;
  overallScore: number;
}

function getSubjectName(subjects: Subject[], id: string): string {
  return subjects.find((s) => s.id === id)?.name ?? 'Unknown Subject';
}

function calculateAttendance(
  records: AttendanceRecord[],
  subjectId: string
): { total: number; attended: number; percentage: number } {
  const subjectRecords = records.filter((r) => r.subjectId === subjectId);
  const total = subjectRecords.length;
  const attended = subjectRecords.filter((r) => r.status === 'present').length;
  const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;
  return { total, attended, percentage };
}

function calculateExamAverage(exams: Exam[], subjectId: string): number {
  const completed = exams.filter(
    (e) => e.subjectId === subjectId && e.status === 'completed' && e.obtainedMarks !== undefined
  );
  if (completed.length === 0) return 0;
  const avg =
    completed.reduce((sum, e) => sum + ((e.obtainedMarks ?? 0) / e.maxMarks) * 100, 0) /
    completed.length;
  return Math.round(avg);
}

function calculateAssignmentAverage(assignments: Assignment[], subjectId: string): number {
  const graded = assignments.filter(
    (a) => a.subjectId === subjectId && a.status === 'graded' && a.obtainedMarks !== undefined
  );
  if (graded.length === 0) return 0;
  const avg =
    graded.reduce((sum, a) => sum + ((a.obtainedMarks ?? 0) / a.maxMarks) * 100, 0) / graded.length;
  return Math.round(avg);
}

export function getSubjectPerformance(
  subjects: Subject[],
  attendance: AttendanceRecord[],
  assignments: Assignment[],
  exams: Exam[]
): SubjectPerformance[] {
  return subjects.map((subject) => {
    const att = calculateAttendance(attendance, subject.id);
    const examAvg = calculateExamAverage(exams, subject.id);
    const asgAvg = calculateAssignmentAverage(assignments, subject.id);
    const overall = Math.round(att.percentage * 0.2 + examAvg * 0.5 + asgAvg * 0.3);
    return {
      subjectId: subject.id,
      subjectName: subject.name,
      attendancePercentage: att.percentage,
      avgExamScore: examAvg,
      avgAssignmentScore: asgAvg,
      overallScore: overall,
    };
  });
}

export function generateStudentInsights(
  subjects: Subject[],
  attendance: AttendanceRecord[],
  assignments: Assignment[],
  exams: Exam[]
): AIInsight[] {
  const insights: AIInsight[] = [];
  const performance = getSubjectPerformance(subjects, attendance, assignments, exams);

  // 1. Attendance deficit flags
  performance.forEach((p) => {
    if (p.attendancePercentage < ATTENDANCE_THRESHOLD) {
      insights.push({
        id: `ins-att-${p.subjectId}`,
        type: 'risk',
        severity: 'high',
        title: `Attendance Deficit - At Risk`,
        description: `Your attendance in ${p.subjectName} is ${p.attendancePercentage}%, which is below the mandatory 75% threshold. Continued absence may result in debarment from the end-semester examination.`,
        subjectId: p.subjectId,
        subjectName: p.subjectName,
      });
    } else if (p.attendancePercentage < 80) {
      insights.push({
        id: `ins-att-warn-${p.subjectId}`,
        type: 'risk',
        severity: 'medium',
        title: `Attendance Caution`,
        description: `Your attendance in ${p.subjectName} is ${p.attendancePercentage}%. Maintain regular attendance to stay above the 75% requirement.`,
        subjectId: p.subjectId,
        subjectName: p.subjectName,
      });
    }
  });

  // 2. Lowest-scoring subject analysis
  const sortedByScore = [...performance].sort((a, b) => a.overallScore - b.overallScore);
  const lowest = sortedByScore[0];
  if (lowest && lowest.overallScore < 60) {
    const moduleMap: Record<string, string> = {
      'Circuit Theory': 'nodal analysis and network theorems',
      'Embedded Systems Integration': 'RTOS scheduling and interrupt handling',
      'Microprocessors & Microcontrollers': 'assembly programming and memory interfacing',
      'Engineering Mathematics': 'numerical methods and contour integration',
    };
    const focusModule = moduleMap[lowest.subjectName] ?? 'core fundamentals';
    insights.push({
      id: 'ins-lowest-subject',
      type: 'recommendation',
      severity: 'high',
      title: 'AI Recommendation: Focus Area Identified',
      description: `AI Recommendation: Your performance in ${lowest.subjectName} is dropping (overall ${lowest.overallScore}%). Focus on ${focusModule} before the upcoming Internal Assessment II.`,
      subjectId: lowest.subjectId,
      subjectName: lowest.subjectName,
    });
  }

  // 3. Subject-specific recommendations based on exam + assignment gaps
  performance.forEach((p) => {
    if (p.avgExamScore < 50 && p.avgExamScore > 0) {
      insights.push({
        id: `ins-exam-${p.subjectId}`,
        type: 'recommendation',
        severity: 'medium',
        title: `Exam Performance Gap`,
        description: `Your internal exam average in ${p.subjectName} is ${p.avgExamScore}%. Schedule a doubt-clearing session with the faculty and review previous internal question papers.`,
        subjectId: p.subjectId,
        subjectName: p.subjectName,
      });
    }
    if (p.avgAssignmentScore < 60 && p.avgAssignmentScore > 0) {
      insights.push({
        id: `ins-asg-${p.subjectId}`,
        type: 'recommendation',
        severity: 'low',
        title: `Assignment Improvement Needed`,
        description: `Assignment scores in ${p.subjectName} average ${p.avgAssignmentScore}%. Review AI feedback on graded submissions to identify recurring mistakes.`,
        subjectId: p.subjectId,
        subjectName: p.subjectName,
      });
    }
  });

  // 4. Achievement insights
  const highest = sortedByScore[sortedByScore.length - 1];
  if (highest && highest.overallScore >= 75) {
    insights.push({
      id: 'ins-achievement',
      type: 'achievement',
      severity: 'low',
      title: 'Strong Performance Detected',
      description: `You're performing well in ${highest.subjectName} (overall ${highest.overallScore}%). Consider peer mentoring — teaching reinforces your own understanding and earns co-curricular credits.`,
      subjectId: highest.subjectId,
      subjectName: highest.subjectName,
    });
  }

  // 5. Trend insight
  const atRiskCount = performance.filter((p) => p.attendancePercentage < 75).length;
  if (atRiskCount > 0) {
    insights.push({
      id: 'ins-trend',
      type: 'trend',
      severity: 'high',
      title: 'Overall Risk Trend',
      description: `${atRiskCount} subject(s) below the 75% attendance threshold. Immediate corrective action is recommended to maintain academic standing.`,
    });
  }

  return insights;
}

export function generateFacultyInsights(
  subjects: Subject[],
  attendance: AttendanceRecord[],
  assignments: Assignment[],
  exams: Exam[]
): AIInsight[] {
  const insights: AIInsight[] = [];
  const performance = getSubjectPerformance(subjects, attendance, assignments, exams);

  // Class-wide at-risk flags
  const atRisk = performance.filter((p) => p.attendancePercentage < 75);
  atRisk.forEach((p) => {
    insights.push({
      id: `fac-risk-${p.subjectId}`,
      type: 'risk',
      severity: 'high',
      title: 'At-Risk Student Flagged',
      description: `Student Arjun Karthikeyan (24EEE042) has attendance at ${p.attendancePercentage}% in ${p.subjectName}. Recommend a one-on-one counseling session.`,
      subjectId: p.subjectId,
      subjectName: p.subjectName,
    });
  });

  // Lowest performing subject for the class
  const sorted = [...performance].sort((a, b) => a.overallScore - b.overallScore);
  const lowest = sorted[0];
  if (lowest) {
    insights.push({
      id: 'fac-lowest',
      type: 'trend',
      severity: 'medium',
      title: 'Class Performance Trend',
      description: `${lowest.subjectName} shows the lowest overall performance (${lowest.overallScore}%). Consider scheduling a revision session before Internal Assessment II.`,
      subjectId: lowest.subjectId,
      subjectName: lowest.subjectName,
    });
  }

  // Assignment grading pending
  const pendingGrading = assignments.filter((a) => a.status === 'submitted').length;
  if (pendingGrading > 0) {
    insights.push({
      id: 'fac-grading',
      type: 'recommendation',
      severity: 'low',
      title: 'Grading Pending',
      description: `${pendingGrading} assignment submission(s) await grading. Timely feedback improves student learning outcomes.`,
    });
  }

  return insights;
}

export function generateAdminInsights(): AIInsight[] {
  return [
    {
      id: 'admin-1',
      type: 'trend',
      severity: 'medium',
      title: 'Department Performance Comparison',
      description:
        'EEE department shows a 4% attendance deficit in Circuit Theory across the 2nd-year cohort. Recommend a departmental review of teaching methodology.',
    },
    {
      id: 'admin-2',
      type: 'risk',
      severity: 'high',
      title: 'Institutional Risk Summary',
      description:
        '12 students across 3 departments flagged as at-risk by the AI Engine. Auto-notifications have been dispatched to respective faculty advisors.',
    },
    {
      id: 'admin-3',
      type: 'achievement',
      severity: 'low',
      title: 'Positive Trend',
      description:
        'Overall institutional attendance rate is 84.2%, up 2.1% from last semester. CSE department leads with 89.5%.',
    },
  ];
}

export function generateAssignmentFeedback(
  assignment: Assignment,
  obtainedMarks: number
): string {
  const percentage = Math.round((obtainedMarks / assignment.maxMarks) * 100);
  const subjectName = assignment.title;

  if (percentage >= 85) {
    return `Excellent work on "${subjectName}". Your submission demonstrates strong conceptual clarity and technical accuracy. Consider exploring advanced topics to further deepen your understanding.`;
  } else if (percentage >= 70) {
    return `Good submission on "${subjectName}". Core concepts are well-applied. Minor errors in edge-case handling suggest reviewing the specific modules where marks were deducted.`;
  } else if (percentage >= 55) {
    return `Adequate submission on "${subjectName}". Foundational understanding is present but application gaps are visible. Revisit the relevant chapter examples and reattempt the incorrect problems.`;
  } else {
    return `Improvement needed on "${subjectName}". The submission indicates gaps in core concepts. Schedule a doubt-clearing session and review the fundamental theory before reattempting.`;
  }
}
