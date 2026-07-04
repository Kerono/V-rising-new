import { getNews } from "@/server/actions";
import { NewsList } from "@/components/NewsList";

export const NewsWrapper = async () => {
  const { data, totalCount } = await getNews(1);

  return <NewsList initialData={data} totalCount={totalCount} />;
};
