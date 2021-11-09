/**
 * All dates are in Unix Epoch format.
 * They may be changed in the UI, but not in the backend.
 */

class DateService {
	/**
	 * Determine if date is in range.
	 * All dates are in Unix Epoch.
	 */
	isDateInRange({
		date,
		fromDate,
		toDate,
	}: {
		date: number | null;
		fromDate: number | null;
		toDate: number | null;
	}): boolean {
		if (date === null) {
			return !fromDate && !toDate;
		}

		if (fromDate === null && toDate === null) return true;

		if (fromDate === null) {
			return toDate ? date <= toDate : true;
		}

		if (toDate === null) {
			return fromDate ? fromDate <= date : true;
		}

		return fromDate <= date && date <= toDate;
	}

	/**
	 * Transform string to Unix EPOCH time. Uses local timezone for conversion.
	 * Returns null if conversion fails.
	 *
	 * @param exifDateString ex. "2013:01:01 01:01:01"
	 */
	exifDateStringToDate(exifDateString?: string): number | null {
		if (!exifDateString) return null;

		var str = exifDateString.split(" ");
		//get date part and replace ':' with '-'
		var dateStr = str[0].replace(/:/g, "-");
		//concat the strings (date and time part)
		var properDateStr = dateStr + " " + str[1];
		//pass to Date
		var date = new Date(properDateStr);
		const epochTime = date.getTime();
		if (Number.isNaN(epochTime)) {
			console.error(`${properDateStr} is not a valid date`);
			return null;
		}

		return epochTime;
	}
}

export type Type = DateService;

export default new DateService();
