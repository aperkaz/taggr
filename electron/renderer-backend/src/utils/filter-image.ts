import { FiltersType, ImageType } from "../../shared/entities";

/**
 * Determine if date is in range
 * Dates in UNIX EPOCH format
 */
const isDateInRange = ({
  date,
  fromDate,
  toDate,
}: {
  date?: number;
  fromDate?: number;
  toDate?: number;
}) => {
  if (!date && date !== 0) {
    if (!fromDate && !toDate) {
      return true;
    }
  }

  if (!fromDate) {
    if (date <= toDate) {
      return true;
    }
  }

  if (!toDate) {
    if (fromDate <= date) {
      return true;
    }
  }

  if (fromDate <= date && date <= toDate) {
    return true;
  }

  return false;
};

/**
 * Check if array A contains all the elements of array B
 */
const arrayContains = (arrayA: string[], arrayB: string[]): boolean => {
  if (arrayB.length === 0) return true;

  return arrayB.every((bItem) => arrayA.includes(bItem));
};

export default (image: ImageType, filters: FiltersType) => {
  const { fromDate, toDate, tags: filterTags } = filters;
  const { creationDate, tags: imageTags } = image;

  return (
    isDateInRange({ date: creationDate, fromDate, toDate }) &&
    arrayContains(imageTags, filterTags)
  );
};