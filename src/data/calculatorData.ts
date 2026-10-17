export interface GradeScale {
  grade: string;
  point: number;
  minMark: number;
  maxMark: number;
}

export const BD_GPA_SCALE: GradeScale[] = [
  { grade: 'A+', point: 5.0, minMark: 80, maxMark: 100 },
  { grade: 'A', point: 4.0, minMark: 70, maxMark: 79 },
  { grade: 'A-', point: 3.5, minMark: 60, maxMark: 69 },
  { grade: 'B', point: 3.0, minMark: 50, maxMark: 59 },
  { grade: 'C', point: 2.0, minMark: 40, maxMark: 49 },
  { grade: 'D', point: 1.0, minMark: 33, maxMark: 39 },
  { grade: 'F', point: 0.0, minMark: 0, maxMark: 32 },
];

export const NU_GRADING_SYSTEM: { grade: string; point: number; marks: string }[] = [
  { grade: 'A+', point: 4.0, marks: '80% and above' },
  { grade: 'A', point: 3.75, marks: '75% to less than 80%' },
  { grade: 'A-', point: 3.5, marks: '70% to less than 75%' },
  { grade: 'B+', point: 3.25, marks: '65% to less than 70%' },
  { grade: 'B', point: 3.0, marks: '60% to less than 65%' },
  { grade: 'B-', point: 2.75, marks: '55% to less than 60%' },
  { grade: 'C+', point: 2.5, marks: '50% to less than 55%' },
  { grade: 'C', point: 2.25, marks: '45% to less than 50%' },
  { grade: 'D', point: 2.0, marks: '40% to less than 45%' },
  { grade: 'F', point: 0.0, marks: 'Less than 40%' },
];

export function getBDGradeFromMarks(marks: number): { grade: string; point: number } {
  if (marks >= 80) return { grade: 'A+', point: 5.0 };
  if (marks >= 70) return { grade: 'A', point: 4.0 };
  if (marks >= 60) return { grade: 'A-', point: 3.5 };
  if (marks >= 50) return { grade: 'B', point: 3.0 };
  if (marks >= 40) return { grade: 'C', point: 2.0 };
  if (marks >= 33) return { grade: 'D', point: 1.0 };
  return { grade: 'F', point: 0.0 };
}
