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
          <input class="input text is-info is-medium" placeholder='type dog, cat...' />
        </div>

        <div id="dashboard-page--pagination" class="column is-12 has-text-centered">
          <nav class="pagination is-small" role="navigation" aria-label="pagination">
            <a class="pagination-previous">Previous</a>
            <a class="pagination-next">Next page</a>
            <ul class="pagination-list">
              <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
              <li><span class="pagination-ellipsis">&hellip;</span></li>
              <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
              <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
              <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
              <li><span class="pagination-ellipsis">&hellip;</span></li>
              <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
            </ul>
          </nav>
        </div>
      </header>

     <main>
      <div class="columns is-centered">
        <div class="column is-12">
          <div class="columns is-gapless is-multiline is-mobile">
    
            <div class="column is-one-quarter">
              <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1558980664-2cd663cf8dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;">
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1586394026111-22274dfcfa2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;">
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1586379186050-acef54ad1a21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;">
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1558980664-2cd663cf8dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;">
              </div>
            </div>
    
            <div class="column is-one-quarter">
              <div class="image-container" style="background-color: red">
                a
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="image-container" style="background-color: green">
                b
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="image-container" style="background-color: pink">
                c
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="image-container" style="background-color: blue">
                d
              </div>
            </div>
    
            <div class="column is-one-quarter">
              <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1558980664-2cd663cf8dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;">
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1586394026111-22274dfcfa2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;">
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1586379186050-acef54ad1a21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;">
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1558980664-2cd663cf8dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80); background-repeat:no-repeat; background-position: center center; background-size: cover;">
              </div>
            </div>
    
            
    
          </div>
    
        </div>
      </div>
     </main>
  </div>`;
  }
}

/*

*/

module.exports = DashboardPage;
