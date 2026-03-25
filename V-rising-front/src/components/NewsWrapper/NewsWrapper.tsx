import { News } from "../News";
import { getNews } from "@/server/actions";

export const NewsWrapper = async () => {
  const { data, totalCount } = await getNews(1);
  return <News initialData={data} totalCount={totalCount} />;
};
