import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { types } from "taggr-shared";

type InitialState = {
  activeRoute: types.FrontendRoutes;
  images: types.Image[];
  imagesWithLocation: types.ImageWithLocation[];
  progress: types.Progress;
  isProcessing: boolean;
};

// TODONOW: clean up after setup, these are real paths
const initialState: InitialState = {
  activeRoute: "START_PAGE",
  images: [
    {
      hash: "202d81bad5ecb603d6bda9db46512d56",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/202d81bad5ecb603d6bda9db46512d56.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/aleksandra-tanasiienko-bV25rEvXBhI-unsplash.jpg",
      tags: ["animals"],
      creationDate: 1616707242202,
    },
    {
      hash: "9f0fe727c8600712ff1ecc7f5057e4f4",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/9f0fe727c8600712ff1ecc7f5057e4f4.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/bobby-stevenson-KJtbBUnKRRQ-unsplash.jpg",
      tags: ["people"],
      creationDate: 1616707278277,
    },
    {
      hash: "9c6227acb6af0200d81fac61f146c6f6",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/9c6227acb6af0200d81fac61f146c6f6.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/boris-smokrovic-lyvCvA8sKGc-unsplash.jpg",
      tags: ["animals"],

      creationDate: 1613300779220,
    },
    {
      hash: "923516be3a28a6392e5a6bbd35d0916b",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/923516be3a28a6392e5a6bbd35d0916b.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/deva-williamson-sjsG1yrwJxY-unsplash.jpg",
      tags: ["food"],

      creationDate: 1613300787047,
    },
    {
      hash: "3d2a0dd303b7a81176d0ec7482ea92e9",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/3d2a0dd303b7a81176d0ec7482ea92e9.jpeg",
      rawPath: "/Users/alain/temp/pictures/docusign-XMQHdgirB0U-unsplash.jpg",
      tags: ["people", "vehicles"],

      creationDate: 1616707227450,
    },
    {
      hash: "beddf4f7bef1f91b9cc1c7784772dbad",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/beddf4f7bef1f91b9cc1c7784772dbad.jpeg",
      rawPath: "/Users/alain/temp/pictures/docusign-ujkG7mTs7IM-unsplash.jpg",
      tags: ["people"],

      creationDate: 1613300817009,
    },
    {
      hash: "1512d5050e7541bce92984ec76285568",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/1512d5050e7541bce92984ec76285568.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/dominik-lange-BFsm5vldl2I-unsplash.jpg",
      tags: ["animals"],

      creationDate: 1613300796539,
    },
    {
      hash: "9d84672ad620280b92c4cb948403bd95",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/9d84672ad620280b92c4cb948403bd95.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/francesco-de-tommaso-ZxNKxnR32Ng-unsplash.jpg",
      tags: ["animals"],

      creationDate: 1613300788109,
    },
    {
      hash: "d5ec34f7acc3c174dd4dab302c55e006",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/d5ec34f7acc3c174dd4dab302c55e006.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/franzi-meyer-Fdd0kJtqtSI-unsplash.jpg",
      tags: ["people", "food", "drinks"],

      creationDate: 1616707251203,
    },
    {
      hash: "c5ebfa8d7695bc73ee9177cb8839e12b",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/c5ebfa8d7695bc73ee9177cb8839e12b.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/frosty-ilze-tfYL1j1jKNo-unsplash.jpg",
      tags: [],

      creationDate: 1613300782856,
    },
    {
      hash: "c5c51cc88e99b9f2e65559ff0517604c",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/c5c51cc88e99b9f2e65559ff0517604c.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/harold-wainwright-awHDN3WUCOo-unsplash.jpg",
      tags: [],

      creationDate: 1616707281930,
    },
    {
      hash: "9cae8370e47129e303c59dc13d1dbecf",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/9cae8370e47129e303c59dc13d1dbecf.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/joshua-mcarthur-KNejiz13lCs-unsplash.jpg",
      tags: ["people"],

      creationDate: 1616707254389,
    },
    {
      hash: "20e900946abfd17613c1659a9108fc1a",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/20e900946abfd17613c1659a9108fc1a.jpeg",
      rawPath: "/Users/alain/temp/pictures/junho-4AXPcy361tk-unsplash.jpg",
      tags: ["people"],

      creationDate: 1613300796142,
    },
    {
      hash: "9bd8c8f68735e6868dabb52ba5318612",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/9bd8c8f68735e6868dabb52ba5318612.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/laura-college-K_Na5gCmh38-unsplash.jpg",
      tags: ["animals"],

      creationDate: 1613300779091,
    },
    {
      hash: "8b5fb9e41a0a76322a12b25629a5e4bb",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/8b5fb9e41a0a76322a12b25629a5e4bb.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/lilian-velet-X2gQ8xI5PNI-unsplash.jpg",
      tags: [],

      creationDate: 1616707257995,
    },
    {
      hash: "71649f525935d350c37b05e249da6d16",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/71649f525935d350c37b05e249da6d16.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/lisha-riabinina-p-6CXeowTMU-unsplash.jpg",
      tags: ["people"],

      creationDate: 1616707265537,
    },
    {
      hash: "16cd82771fdddb08d489c3568c8ff240",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/16cd82771fdddb08d489c3568c8ff240.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/naraa-in-ub-T_kTdILw9uo-unsplash.jpg",
      tags: ["vehicles"],

      creationDate: 1613300804071,
    },
    {
      hash: "fb77f3e86b2337e6fa6ce62818e7505d",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/fb77f3e86b2337e6fa6ce62818e7505d.jpeg",
      rawPath: "/Users/alain/temp/pictures/omar-ram-iU1Pu16JN7k-unsplash.jpg",
      tags: ["animals"],

      creationDate: 1613300822396,
    },
    {
      hash: "654e9faf65df7b99a17bba76ae88e327",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/654e9faf65df7b99a17bba76ae88e327.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/rasmus-smedstrup-mortensen-vsWAMgLmo-0-unsplash.jpg",
      tags: [],

      creationDate: 1613300819701,
    },
    {
      hash: "ec898435657a5eb39d35bc730938418b",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/ec898435657a5eb39d35bc730938418b.jpeg",
      rawPath: "/Users/alain/temp/pictures/surface-N--7q6GwL84-unsplash.jpg",
      tags: ["people"],

      creationDate: 1613300802347,
    },
    {
      hash: "10c483cc2ef59dcc2009ae662917e704",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/10c483cc2ef59dcc2009ae662917e704.jpeg",
      rawPath: "/Users/alain/temp/pictures/surface-aqdPtCtq3dY-unsplash.jpg",
      tags: ["people"],

      creationDate: 1613300791762,
    },
    {
      hash: "1469690b94ff799038735e2813ea607f",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/1469690b94ff799038735e2813ea607f.jpeg",
      rawPath: "/Users/alain/temp/pictures/wexor-tmg-L-2p8fapOA8-unsplash.jpg",
      tags: ["animals"],

      creationDate: 1613300789393,
    },
    {
      hash: "f3a868effff645384d46dabaf7d9dcaf",
      path:
        "file:///Users/alain/Library/Application Support/taggr-nodejs/f3a868effff645384d46dabaf7d9dcaf.jpeg",
      rawPath:
        "/Users/alain/temp/pictures/will-norbury--aDYQJdETkA-unsplash.jpg",
      tags: [],

      creationDate: 1616707235139,
    },
  ],
  imagesWithLocation: [],
  isProcessing: true,
  progress: {
    current: 0,
    total: 0,
  },
};

// TODONOW: add tests to this
const stateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    resetState: () => initialState,
    setActiveRoute: (state, action: PayloadAction<types.FrontendRoutes>) => {
      state.activeRoute = action.payload;
    },
    setImages: (state, action: PayloadAction<types.Image[]>) => {
      state.images = action.payload;
    },
    setImagesWithLocation: (
      state,
      action: PayloadAction<types.ImageWithLocation[]>
    ) => {
      state.imagesWithLocation = action.payload;
    },
    setIsProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setProgress: (state, action: PayloadAction<types.Progress>) => {
      state.progress = { ...state.progress, ...action.payload };
    },
  },
});

export const ACTIONS = {
  ...stateSlice.actions,
};

const store = configureStore({ reducer: stateSlice.reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
