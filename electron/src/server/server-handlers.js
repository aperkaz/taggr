let handlers = {};

handlers._history = [];

handlers["make-factorial"] = async ({ num }) => {
  handlers._history.push(num);

  function fact(n) {
    if (n === 1) {
      return 1;
    }
    return n * fact(n - 1);
  }

  console.log("making factorial");
  return fact(num);
};

handlers["create-project"] = async ({ projectRootFolderPath }) => {
  console.log("creating project for ", projectRootFolderPath);
};

handlers["filter-images"] = async ({ filter }) => {
  console.log("filtering images: ", filter);
};

module.exports = handlers;
