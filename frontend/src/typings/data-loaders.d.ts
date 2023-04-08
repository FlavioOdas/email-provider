import { Email } from "./email";

type DataLoader = {
  loader: (user: string) => Promise<Email[]>;
  data: Email[];
};

export interface DataLoaders {
  [key: string]: DataLoader;
}
