import { FiltersType, ImageType, ProgressType } from "./entities";

export const CHANNEL = "taggr-message-passing";

export enum MessageType {
  // BE
  BE_INITIALIZE_PROJECT = "BE_INITIALIZE_PROJECT",
  BE_FILTER_IMAGES = "BE_FILTER_IMAGES",
  BE_RESET = "BE_RESET",
  BE_DESTROY = "BE_DESTROY",
  BE_CHECK_IS_SUPPORTER = "BE_CHECK_IS_SUPPORTER",
  // FE
  FE_SET_ROUTE = "FE_SET_ROUTE",
  FE_SET_IMAGES = "FE_SET_IMAGES",
  FE_SET_PROGRESS = "FE_SET_PROGRESS",
  FE_SET_IS_PROCESSING = "FE_SET_IS_PROCESSING",
  FE_SET_IS_SUPPORTER = "FE_SET_IS_SUPPORTER",
}

interface BE_INITIALIZE_PROJECT {
  type: MessageType.BE_INITIALIZE_PROJECT;
  payload: string;
}
interface BE_FILTER_IMAGES {
  type: MessageType.BE_FILTER_IMAGES;
  payload: FiltersType;
}
interface BE_RESET {
  type: MessageType.BE_RESET;
}
interface BE_DESTROY {
  type: MessageType.BE_DESTROY;
}

interface BE_CHECK_IS_SUPPORTER {
  type: MessageType.BE_CHECK_IS_SUPPORTER;
  payload: string;
}

export type BE_MESSAGES =
  | BE_INITIALIZE_PROJECT
  | BE_FILTER_IMAGES
  | BE_RESET
  | BE_DESTROY
  | BE_CHECK_IS_SUPPORTER;

interface FE_SET_ROUTE {
  type: MessageType.FE_SET_ROUTE;
  payload: string;
}

interface FE_SET_IMAGES {
  type: MessageType.FE_SET_IMAGES;
  payload: ImageType[];
}

interface FE_SET_PROGRESS {
  type: MessageType.FE_SET_PROGRESS;
  payload: ProgressType;
}

interface FE_SET_IS_PROCESSING {
  type: MessageType.FE_SET_IS_PROCESSING;
  payload: boolean;
}

interface FE_SET_IS_SUPPORTER {
  type: MessageType.FE_SET_IS_SUPPORTER;
  payload: boolean;
}

export type FE_MESSAGES =
  | FE_SET_ROUTE
  | FE_SET_IMAGES
  | FE_SET_PROGRESS
  | FE_SET_IS_PROCESSING
  | FE_SET_IS_SUPPORTER;
