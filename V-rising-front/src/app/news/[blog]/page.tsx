import { getSpecificNews } from "@/server/actions";
import { notFound } from "next/navigation";
import { FC } from "react";
import { imageUrl } from "@/utils/imageUrl";
import { Blog } from "@/components/Blog";

type Props = {
  params: Promise<{
    blog: string;
  }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { blog } = await params;

  try {
    const data = await getSpecificNews(blog);
    const { title, info, img } = data;
    const imgUrl = imageUrl(img);
    return <Blog title={title} info={info} imgUrl={imgUrl} />;
  } catch (e: unknown) {
    console.error(e);
    return notFound();
  }
};

export default Page;
