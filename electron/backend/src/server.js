let serverHandlers = require('./server-handlers');
let ipc = require('./server-ipc');

let isDev, version;

if (process.argv[2] === '--subprocess') {
  isDev = false;
  version = process.argv[3];

  let socketName = process.argv[4];
  ipc.init(socketName, serverHandlers);
} else {
  let { ipcRenderer, remote } = require('electron');
  isDev = true;
  version = remote.app.getVersion();

  ipcRenderer.on('set-socket', (event, { name }) => {
    ipc.init(name, serverHandlers);
  });
}

console.log(version, isDev);

(async () => {
  const sharp = require('sharp');

  const imagePath = `/Users/alain/Downloads/test.jpg`;
  const outputPath = `/Users/alain/Downloads/output.jpg`;

  await sharp(imagePath, {
    failOnError: false
  }) // failOnError: true, fixes Samsung corrupted pictures
    .jpeg({ quality: 80 })
    .resize(200, 200, { fit: sharp.fit.outside, withoutEnlargement: true })
    .toFile(outputPath);
})();
