import reset from "./reset";

describe("handler - reset", () => {
	it("should reset the currentImageHashes in the db", () => {
		const db = { set: jest.fn() } as any;

		const resetHandler = reset({ db });
		resetHandler();

		expect(db.set).toHaveBeenCalledWith("currentImageHashes", []);
	});
});
