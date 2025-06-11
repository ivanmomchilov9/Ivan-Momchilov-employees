import moment from 'moment';

export const calculateOverlapDays = (
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date,
): number => {
  const overlapStart = moment.max(moment(start1), moment(start2));
  const overlapEnd = moment.min(moment(end1), moment(end2));

  if (overlapStart.isBefore(overlapEnd)) {
    return overlapEnd.diff(overlapStart, 'days');
  }
  return 0;
};
