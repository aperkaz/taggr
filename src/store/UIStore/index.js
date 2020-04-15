import { store, autoEffect } from "@risingstack/react-easy-state";
import { APP_STATUS } from "../../constants";
import AppStore from "../AppStore";

const defaultValues = [
  {
    hash: "13",
    path:
      "file:////home/alain/Downloads/test_pictures/13-201812-Softwerk_christmas_party - 13.jpg",
    tags: ["cat", "dog"],
  },
  {
    hash: "14",
    path: "file:////home/alain/Downloads/test_pictures/a.jpg",
    tags: ["cat", "dog"],
  },
];

const UIStore = store({
  appStatus: APP_STATUS.START_PAGE,
  tagSearchValue: "",
  filteredImageList: defaultValues,
});

autoEffect(() => console.log(UIStore.filteredImageList));

export default UIStore;

const setAppStatus = (status) => {
  logAction("setAppStatus", status);
  UIStore.appStatus = status;
};

const setTagSearchValue = (searchValue) => {
  logAction("setTagSearchValue", searchValue);
  UIStore.tagSearchValue = searchValue;

  if (searchValue === "") {
    UIStore.filteredImageList = defaultValues;
    return;
  }

  // TODONOW: recalculate images to show, using AppStore
  const filteredImages = [];
  let found = 0;

  Object.keys(AppStore.imageHashMap).some((key) => {
    const tags = AppStore.imageHashMap[key].tags;
    console.log("found: ", found);
    console.log(key);

    if (tags.filter((tag) => tag.includes(searchValue)).length > 0) {
      filteredImages.push(AppStore.imageHashMap[key]);

      found++;
    }
    if (found > 15) {
      console.log("break");
      return true;
    }
  });

  console.log(filteredImages.length);

  UIStore.filteredImageList = filteredImages;
};

const logAction = (name, payload) => {
  console.log(`%c A: ${name}: ${payload} `, "background: #222; color: #bada55");
};

const actions = { setAppStatus, setTagSearchValue };
export { actions };
