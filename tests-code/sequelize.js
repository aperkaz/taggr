const { Sequelize, DataTypes } = require("sequelize");

const dbFactory = () => {
  let sequelize,
    models = {};

  const initialize = async () => {
    // return new Sequelize('sqlite::memory:') // Example for sqlite
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "test.sqlite",
    });

    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  const initModels = async () => {
    const PhotosToTags = sequelize.define("PhotosToTags", {});

    const Photo = sequelize.define(
      "photo",
      {
        hash: {
          primaryKey: true,
          type: DataTypes.STRING,
          allowNull: false,
        },
        path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {}
    );

    const Tag = sequelize.define("tag", {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    });

    // https://sequelize.org/master/class/lib/associations/has-many.js~HasMany.html
    // relationshipts many-many, Photo <-> Tags
    Photo.belongsToMany(Tag, { through: PhotosToTags });
    Tag.belongsToMany(Photo, { through: PhotosToTags });

    // sync all created models with DB (create DB structure)
    await sequelize.sync();

    // update model
    models = { Photo, Tag };
  };

  return {
    initialize,
    initModels,
    get: () => sequelize,
    getModels: () => models,
  };
};

const populate = async ({ Tag, Photo }) => {
  // create tags
  const tagAnimal = await Tag.create({
    name: "animal",
  });
  const tagFood = await Tag.create({
    name: "food",
  });

  //   create photos
  console.time("create");
  for (var i = 0; i < 100000; i++) {
    const photo = await Photo.create({
      hash: `hash${i}`,
      path: `/photo${i}.png`,
    });
    await photo.addTag(tagAnimal);
  }
  console.timeEnd("create");

  const photo1 = await Photo.create({
    hash: "hash",
    path: "/photo.png",
  });
  await photo1.addTag(tagAnimal);
  await photo1.addTag(tagFood);

  const tags = [tagAnimal, tagFood];
};

const searchPhotos = async ({ tags }) => {
  const photos = [];

  for (const tag of tags) {
    const result = await tag.getPhotos({ limit: 1000 });
    photos.push(result);
  }

  return photos;
};

// TEST
(async () => {
  const db = dbFactory();
  await db.initialize();
  await db.initModels();

  const { Photo, Tag } = db.getModels();

  // populate({Photo, Tags});

  const tagAnimal = Tag.build({ name: "animal" });
  const tagFood = await Tag.build({
    name: "food",
  });

  const tags = [tagAnimal, tagFood];

  console.time("calc");
  const results = await searchPhotos({
    tags,
  });
  console.timeEnd("calc");

  //   console.log(JSON.stringify(results, null, 2));
})();

// migrations: https://sequelize.org/master/manual/migrations.html
