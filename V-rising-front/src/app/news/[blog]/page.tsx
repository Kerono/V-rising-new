import { getSpecificNews } from "@/server/actions";
import Image from "next/image";
import styles from "./page.module.scss";
import { notFound } from "next/navigation";
import { FC } from "react";
import { imageUrl } from "@/utils/imageUrl";

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
    return (
      <div className={styles.wrapper}>
        <div className={styles["image-wrapper"]}>
          <Image src={imgUrl} alt={title} width={"200"} height={"200"} />
        </div>
        <div className={styles.title}>{title}</div>
        <div>{info}</div>
      </div>
    );
  } catch (e: unknown) {
    console.error(e);
    return notFound();
  }
};

export default Page;
