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

  render() {
    document.getElementById("dashboard-page").innerHTML = `
    <div class="dashboard-page-wrapper">

      <header class="columns is-multiline is-mobile is-vcentered is-centered">
        <div class="column is-8 has-text-centered">
          <input id="tag-input"class="input text is-info is-medium" placeholder='type dog, cat...' />
        </div>
      </header>

     <main>
        <div class="grid">
          <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1562887189-e5d078343de4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;"></div> 
          <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1586278587646-1dee11228ac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;"></div>
          <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1558980664-2cd663cf8dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;"></div>
          <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1586394026111-22274dfcfa2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;"></div>
          <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1586379186050-acef54ad1a21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;"></div>
          <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1586399254549-e273758e873f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;"></div>
          <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1586508015783-0cf09dd554ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;"></div>
          <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1586326448521-3f05373f8140?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;"></div>
          <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1586399256831-d455908a1e61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;"></div>
          
     </div>
     </main>
  </div>`;
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
