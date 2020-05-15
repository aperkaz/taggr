# taggr

Rediscover your memories while keeping your privacy.

Powered by machine learning.

## Architecture

Inspiration: https://blog.axosoft.com/electron-things-to-know/

Main structure separated between UI and backend. 

The UI follow an unidirectional dataflow pattern with React and a reactive uiStore.


## Notes 
Sometimes windows build fails. Try to clean cache and delete package-lock as in: https://github.com/cncjs/cncjs/issues/172

## Future features

- JUST because something work in development, it doesnt mean it will work in prod. Make sure the encodings are set up in the index.html of EACH process (rendere, background...). The TO string methods will behave crazy...
- TODO: Clean up notification code part
- TODO: chrome cache hogs the ram: https://github.com/electron/electron/blob/master/docs/api/session.md#sesclearcachecallback
- TODO: look into mapbox performance: https://docs.mapbox.com/help/troubleshooting/mapbox-gl-js-performance/ and https://docs.mapbox.com/help/glossary/style-optimized-vector-tiles/
- TODO: add image manipulation: https://github.com/EyalAr/lwip#rotate
- TODO: replace gallery view, with lazy loading: https://github.com/xiaolin/react-image-gallery
- TODO: speeding up the classification: https://github.com/tensorflow/tfjs-examples/blob/master/mnist-node/data.js
- TODO: look into tensorflow alternatives: evaluate performance: with article https://learn.ml5js.org/docs/#/reference/face-api?id=demo
- TODO: future-feature: timeline with pictures https://github.com/rmariuzzo/react-chronos
- TODO: future-feature: timeline display of images per day http://tany.kim/quantify-your-year/#/
IDEA: https://www.electronjs.org/devtron

- TODO: look into reading thumbnails.
- TODO: consider loading images with canvas element and proper size: https://codesandbox.io/s/compare-im-loading-5tptn?file=/src/index.js

## Releases

https://github.com/aperkaz/taggr-releases/releases