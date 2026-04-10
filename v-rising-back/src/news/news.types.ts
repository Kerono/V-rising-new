export type NewsData = {
  title: string;
  info: string;
  id: string;
  img: string;
};

export type NewsResponce = {
  data: NewsData[];
  totalCount: number;
};
