const TagSearchInput = require("./TagSearchInput");
const ImageGallery = require("./ImageGallery");

// TODO: material UI
//https://github.com/developit/htm/issues/37

class DashboardPage {
  constructor(store) {
    this.store = store;
    this.rootId = "dashboard-page";

    // child components
    this.tagSearchInput = new TagSearchInput(this.store, "tag-search-input");
    this.imageGallery = new ImageGallery(this.store, "image-gallery");
  }

  mount() {
    console.log("mount dashboardPage");

    // create hook-div if not pressent in page
    if (!document.getElementById(this.rootId)) {
      let bodyElement = document.getElementsByTagName("BODY")[0];

      var dashboardPageElement = document.createElement("div");
      dashboardPageElement.setAttribute("id", this.rootId);

      bodyElement.appendChild(dashboardPageElement);
    }

    // add static html inside hook-div
    document.getElementById(this.rootId).innerHTML = `
      <div class="${this.rootId}-wrapper">
        <header id="tag-search-input" class="columns is-multiline is-mobile is-vcentered is-centered"></header>
        <div id="image-gallery"></div>
      </div>`;

    // initialize subcomponents
    this.tagSearchInput.mount();
    this.imageGallery.mount();

    // this.updateImages();
  }

  unmount() {
    console.log("unmount dashboardPage");
    let bodyElement = document.getElementsByTagName("BODY")[0];
    const dashboardPageElement = document.getElementById("dashboard-page");

    if (dashboardPageElement) bodyElement.removeChild(dashboardPageElement);
  }
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
