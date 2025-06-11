import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import moment from 'moment';
import { findLongestWorkingPair } from './projectCalculator';
import { EmployeeProjectEntry } from '../types/EmployeeProjectEntry';
import { LongestPairResult } from '../types/longestPairResult';

export const parseCSVAndCalculate = async (fileUri: string): Promise<LongestPairResult> => {
  try {
    const fileContent = await RNFS.readFile(fileUri, 'utf8');

    return new Promise((resolve, reject) => {
      Papa.parse(fileContent, {
        header: false,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<string[]>) => {
          if (results.errors.length) {
            console.error('PapaParse errors: ', results.errors);
            return reject(new Error('Error parsing CSV. Please check the format.'));
          }

          const employeesData = results.data.map((row) => {
            const [empId, projectId, dateFromStr, dateToStr] = row.map((s) => s.trim());

            const dateFrom = parseDate(dateFromStr);
            const dateTo =
              dateToStr && dateToStr.toUpperCase() !== 'NULL' ? parseDate(dateToStr) : moment();

            if (
              !dateFrom?.isValid() ||
              (dateToStr && dateToStr.toUpperCase() !== 'NULL' && !dateTo?.isValid())
            ) {
              throw new Error(
                `Invalid date format found for EmpID: ${empId}, ProjectID: ${projectId}. Please ensure consistent date formats.`,
              );
            }

            return {
              empId: empId,
              projectId: projectId,
              dateFrom: dateFrom.toDate(),
              dateTo: dateTo?.toDate(),
            };
          });

          const longestPairResult: LongestPairResult = findLongestWorkingPair(
            employeesData as EmployeeProjectEntry[],
          );
          resolve(longestPairResult);
        },
        error: (error: Papa.ParseError) => {
          reject(error);
        },
      });
    });
  } catch (e: any) {
    console.error('Error in parseCSVAndCalculate:', e);
    throw e;
  }
};

export const parseDate = (dateString: string | null): moment.Moment | null => {
  if (dateString === null || dateString.toUpperCase() === 'NULL') {
    return moment();
  }

  const m = moment(dateString);

  if (m.isValid()) {
    return m;
  }

  console.warn(`Could not parse date: "${dateString}". Returning null.`);
  return null;
};
