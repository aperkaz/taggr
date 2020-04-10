class DashboardPage {
  mount() {
    console.log("mount dashboardPage");
    let bodyElement = document.getElementsByTagName("BODY")[0];

    var dashboardPageElement = document.createElement("div");
    dashboardPageElement.setAttribute("id", "dashboard-page");

    bodyElement.appendChild(dashboardPageElement);
  }

  unmount() {
    console.log("unmount dashboardPage");
    let bodyElement = document.getElementsByTagName("BODY")[0];
    const dashboardPageElement = document.getElementById("dashboard-page");

    if (dashboardPageElement) bodyElement.removeChild(dashboardPageElement);
  }

  show() {
    document.getElementById("dashboard-page").style.visibility = "visible";
  }

  hide() {
    document.getElementById("dashboard-page").style.visibility = "hidden";
  }

  render() {
    document.getElementById("dashboard-page").innerHTML = `
    <p>dashboard page</p>`;
  }
}

module.exports = DashboardPage;
