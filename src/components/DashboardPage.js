const { observe } = require("@nx-js/observer-util");
const { Queue, priorities } = require("@nx-js/queue-util");
const debounce = require("lodash.debounce");

class DashboardPage {
  inputValue;

  constructor(store) {
    this.store = store;

    // Setup prioritized queue for batching up observable reactions in render
    this.scheduler = new Queue(priorities.LOW);
  }

  mount() {
    console.log("mount dashboardPage");

    // create hook-div if not pressent in page
    if (!document.getElementById("dashboard-page")) {
      let bodyElement = document.getElementsByTagName("BODY")[0];

      var dashboardPageElement = document.createElement("div");
      dashboardPageElement.setAttribute("id", "dashboard-page");

      bodyElement.appendChild(dashboardPageElement);
    }

    // add static html inside hook-div
    document.getElementById("dashboard-page").innerHTML = `
      <div class="dashboard-page-wrapper">

        <header class="columns is-multiline is-mobile is-vcentered is-centered">
          <div class="column is-8 has-text-centered">
            <input id="tag-search-input" class="input text is-info is-medium" type="text" placeholder="type tags, ex: dog, cat..."/>
          </div>
        </header>

        <main>
          <div id="image-grid" class="grid">
          </div>
        </main>
      </div>`;

    this.updateImages();

    // add listeners
    const tagSearchInputElement = document.getElementById("tag-search-input");

    const inputHandler = (store) =>
      debounce((e) => {
        store.tagSearchValue = e.target.value;
      }, 300);

    tagSearchInputElement.addEventListener("input", inputHandler(this.store));
  }

  unmount() {
    console.log("unmount dashboardPage");
    let bodyElement = document.getElementsByTagName("BODY")[0];
    const dashboardPageElement = document.getElementById("dashboard-page");

    if (dashboardPageElement) bodyElement.removeChild(dashboardPageElement);
  }

  updateImages = observe(() => {
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
  });
}

/*
TODO: add navbar
<div id="dashboard-page--pagination" class="column is-12 has-text-centered">
          <nav class="pagination is-small" role="navigation" aria-label="pagination">
            <a class="pagination-previous">Previous</a>
            <a class="pagination-next">Next page</a>
            <ul class="pagination-list">
              <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
              <li><span class="pagination-ellipsis">&hellip;</span></li>
              <li><a class="pagination-link" aria-label="Goto page 5">5</a></li>
              <li><a class="pagination-link is-current" aria-label="Page 6" aria-current="page">6</a></li>
              <li><a class="pagination-link" aria-label="Goto page 7">7</a></li>
              <li><span class="pagination-ellipsis">&hellip;</span></li>
              <li><a class="pagination-link" aria-label="Goto page 10">10</a></li>
            </ul>
          </nav>
        </div>
*/

module.exports = DashboardPage;
