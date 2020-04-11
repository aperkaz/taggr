const debounce = require("lodash.debounce");

class TagSearchInput {
  constructor(store, rootId) {
    this.store = store;
    this.rootId = rootId;
  }

  mount() {
    document.getElementById(this.rootId).innerHTML = `
    <div class="column is-8 has-text-centered">
        <input id="input" class="input text is-info is-medium" type="text" placeholder="type tags, ex: dog, cat..."/>
    </div>
    `;

    // add listeners
    const tagSearchInputElement = document.getElementById("input");

    const inputHandler = (store) =>
      debounce((e) => {
        store.tagSearchValue = e.target.value;
      }, 300);

    tagSearchInputElement.addEventListener("input", inputHandler(this.store));
  }

  unmount() {}
}

module.exports = TagSearchInput;
