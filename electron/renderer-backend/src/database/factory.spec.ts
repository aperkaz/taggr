import dbFactory from "./factory";
import db from "./factory";

const IMAGES = [
	{
		hash: "10c483cc2ef59dcc2009ae662917e704",
		path:
			"file:///Users/alain/Library/Application Support/taggr-nodejs/10c483cc2ef59dcc2009ae662917e704.jpeg",
		rawPath: "/Users/alain/temp/pictures/surface-aqdPtCtq3dY-unsplash.jpg",
		tags: ["people"],
		location: null,
		creationDate: 1613300791762,
	},
	{
		hash: "1469690b94ff799038735e2813ea607f",
		path:
			"file:///Users/alain/Library/Application Support/taggr-nodejs/1469690b94ff799038735e2813ea607f.jpeg",
		rawPath: "/Users/alain/temp/pictures/wexor-tmg-L-2p8fapOA8-unsplash.jpg",
		tags: ["animals"],
		location: null,
		creationDate: 1613300789393,
	},
	{
		hash: "f3a868effff645384d46dabaf7d9dcaf",
		path:
			"file:///Users/alain/Library/Application Support/taggr-nodejs/f3a868effff645384d46dabaf7d9dcaf.jpeg",
		rawPath: "/Users/alain/temp/pictures/will-norbury--aDYQJdETkA-unsplash.jpg",
		tags: [],
		location: null,
		creationDate: 1616707235139,
	},
];

describe("database module", () => {
	beforeEach(() => {
		// clean up dbs

		// dev db
		dbFactory(true).clear();

		// non-dev db
		dbFactory(false).clear();
	});

	it("should create db with default values", () => {
		const db = dbFactory(true);

		expect(db.get("allImages")).toEqual({});
		expect(db.get("currentImageHashes")).toEqual([]);
	});

	it("should create db when in development mode", () => {
		const db = dbFactory(true);

		const insertedImages = {
			hash1: IMAGES[0],
		};

		db.set("allImages", insertedImages);

		const images = db.get("allImages");
		expect(images).toEqual(insertedImages);
	});

	it("should create db when in non-development mode", () => {
		const db = dbFactory(false);

		const insertedImages = {
			hash1: IMAGES[0],
		};

		db.set("allImages", insertedImages);

		const images = db.get("allImages");
		expect(images).toEqual(insertedImages);
	});
});
