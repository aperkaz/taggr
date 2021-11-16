import dateService from "./index";

describe("services - date", () => {
	describe("isDateInRange", () => {
		it("should return false when `date` is not set", () => {
			const isDateInRange = dateService.isDateInRange({
				date: null,
				fromDate: 100,
				toDate: 999,
			});

			expect(isDateInRange).toBe(false);
		});

		it("should return true when `fromDate` is not set and `date` is smaller than `toDate`", () => {
			const isDateInRange = dateService.isDateInRange({
				date: 100,
				fromDate: null,
				toDate: 999,
			});

			expect(isDateInRange).toBe(true);
		});

		it("should return true when `toDate` is not set and `date` is bigger than `fromDate`", () => {
			const isDateInRange = dateService.isDateInRange({
				date: 100,
				fromDate: 50,
				toDate: null,
			});

			expect(isDateInRange).toBe(true);
		});

		it("should return true when `fromDate` and `toDate`	are not set", () => {
			let isDateInRange = dateService.isDateInRange({
				date: 50,
				fromDate: null,
				toDate: null,
			});

			expect(isDateInRange).toBe(true);
			isDateInRange = dateService.isDateInRange({
				date: null,
				fromDate: null,
				toDate: null,
			});

			expect(isDateInRange).toBe(true);
		});

		it("should return false when `date` is not between `fromDate` and `toDate`", () => {
			let isDateInRange = dateService.isDateInRange({
				date: 50,
				fromDate: 10,
				toDate: 0,
			});

			expect(isDateInRange).toBe(false);

			isDateInRange = dateService.isDateInRange({
				date: 50,
				fromDate: 100,
				toDate: 200,
			});

			expect(isDateInRange).toBe(false);

			isDateInRange = dateService.isDateInRange({
				date: 300,
				fromDate: 100,
				toDate: 200,
			});

			expect(isDateInRange).toBe(false);
		});

		it("should return true when `date` is between `fromDate` and `toDate`", () => {
			let isDateInRange = dateService.isDateInRange({
				date: -50,
				fromDate: -100,
				toDate: 0,
			});

			expect(isDateInRange).toBe(true);

			isDateInRange = dateService.isDateInRange({
				date: 150,
				fromDate: 100,
				toDate: 200,
			});

			expect(isDateInRange).toBe(true);
		});
	});

	describe("exifDateStringToDate", () => {
		it("should return null when the param is undefined", () => {
			expect(dateService.exifDateStringToDate(undefined)).toBe(null);
		});

		it("should return the epoch time when the param is a valid date string", () => {
			expect(dateService.exifDateStringToDate("2013:01:01 01:01:01")).toBe(
				1356998461000
			);
		});

		it("should return null when the param is not a valid date string", () => {
			expect(dateService.exifDateStringToDate("2013:0101 01:01:01")).toBe(null);
		});
	});
});
