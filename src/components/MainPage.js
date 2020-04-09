class MainPage {
  render() {
    document.getElementById("app").innerHTML = `
    <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1586379186050-acef54ad1a21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60); background-repeat:no-repeat; background-position: center center;" onclick="alert('hi')">
    </div>
    <br/>
     <div class="image-container" style="background-image: url(https://images.unsplash.com/photo-1558980664-2cd663cf8dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80); background-repeat:no-repeat; background-position: center center;">
    </div>`;
  }
}

module.exports = MainPage;
