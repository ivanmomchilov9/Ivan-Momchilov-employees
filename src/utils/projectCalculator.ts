import { calculateOverlapDays } from './dateUtils';
import { EmployeeProjectEntry } from '../types/EmployeeProjectEntry';
import { LongestPairResult } from '../types/longestPairResult';
import { CommonProjectDetail } from '../types/commonProjectDetail';

const initialLongestPairResult: LongestPairResult = {
  emp1: null,
  emp2: null,
  totalDays: 0,
  commonProjects: [],
};

export const findLongestWorkingPair = (
  employeesData: EmployeeProjectEntry[],
): LongestPairResult => {
  const projectsByEmployee = employeesData.reduce((acc, entry) => {
    if (!acc.has(entry.empId)) {
      acc.set(entry.empId, []);
    }
    acc.get(entry.empId)?.push(entry);
    return acc;
  }, new Map<string, EmployeeProjectEntry[]>());

  const employeeIds: string[] = Array.from(projectsByEmployee.keys());

  const employeePairs: [string, string][] = employeeIds.flatMap((emp1Id, i) =>
    employeeIds.slice(i + 1).map((emp2Id): [string, string] => [emp1Id, emp2Id]),
  );

  const longestPair = employeePairs.reduce(
    (currentLongest: LongestPairResult, [emp1Id, emp2Id]) => {
      const emp1Projects = projectsByEmployee.get(emp1Id) || [];
      const emp2Projects = projectsByEmployee.get(emp2Id) || [];

      const currentPairCommonProjects: CommonProjectDetail[] = emp1Projects.flatMap((p1) =>
        emp2Projects.flatMap((p2) => {
          if (p1.projectId === p2.projectId) {
            const overlap = calculateOverlapDays(p1.dateFrom, p1.dateTo, p2.dateFrom, p2.dateTo);
            return overlap > 0
              ? [
                  {
                    emp1Id: emp1Id,
                    emp2Id: emp2Id,
                    projectId: p1.projectId,
                    daysWorked: overlap,
                  },
                ]
              : [];
          }
          return [];
        }),
      );

      const currentPairTotalOverlapDays = currentPairCommonProjects.reduce(
        (sum, project) => sum + project.daysWorked,
        0,
      );

      return currentPairTotalOverlapDays > currentLongest.totalDays
        ? {
            emp1: emp1Id,
            emp2: emp2Id,
            totalDays: currentPairTotalOverlapDays,
            commonProjects: currentPairCommonProjects.sort((a, b) => b.daysWorked - a.daysWorked),
          }
        : currentLongest;
    },
    initialLongestPairResult,
  );

  return longestPair;
};
