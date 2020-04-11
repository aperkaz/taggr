const { observe } = require("@nx-js/observer-util");
const { Queue, priorities } = require("@nx-js/queue-util");

class ImageGallery {
  constructor(store, rootId) {
    this.store = store;
    this.rootId = rootId;

    // Setup prioritized queue for batching up observable reactions in render
    this.scheduler = new Queue(priorities.LOW);
  }

  mount() {
    console.log(document);
    document.getElementById(this.rootId).innerHTML = `
    <div id="image-grid" class="grid">
    </div>
    `;
  }

  unmount() {}

  // TODO: connect to result set only
  updateImages = observe(
    () => {
      const { tagSearchValue } = store;
      const imageHashMap = store.imageHashMap;

      console.log("updateImages()");

      if (!document.getElementById("dashboard-page")) return;

      let results = {};
      // only filter when there is something to filter
      if (tagSearchValue) {
        Object.keys(imageHashMap).forEach((key) => {
          if (
            imageHashMap[key].tags.filter((tag) => tag.includes(tagSearchValue))
              .length > 0
          ) {
            results[key] = imageHashMap[key];
          }
        });
      } else {
        results = imageHashMap;
      }

      let imagesElement = ``;
      Object.keys(results)
        .slice(0, 9) // only display 9 results, to match the layout
        .forEach((imageKey) => {
          const imagePath = results[imageKey].path;
          imagesElement += `<div class="image-container" style="background-image: url(${imagePath}); background-repeat:no-repeat; background-position: center center; background-size: cover;"></div>`;
        });

      if (imagesElement.length === 0)
        imagesElement = "<div>sorry, no results</div>";

      document.getElementById("image-grid").innerHTML = imagesElement;
    },
    { scheduler: this.scheduler }
  );
}

module.exports = ImageGallery;
