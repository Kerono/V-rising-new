import { getSpecificNews } from "@/server/actions";
import { NewsIds } from "@/variables";
import Image from "next/image";
import styles from "./page.module.scss";
import { notFound } from "next/navigation";
import { FC } from "react";

type Props = {
  params: Promise<{
    blog: NewsIds;
  }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { blog } = await params;
  //TODO error in render component ?
  try {
    const responce = await getSpecificNews(blog);
    const { title, info, img } = responce;
    return (
      <div className={styles.wrapper}>
        <div className={styles["image-wrapper"]}>
          <Image src={img} alt={title} width={"200"} height={"200"} />
        </div>
        <div className={styles.title}>{title}</div>
        <div>{info}</div>
      </div>
    );
  } catch (e: unknown) {
    const errorMessage = (await e) as { message: string };
    console.log(errorMessage.message);
    notFound();
  }
};

export default Page;
