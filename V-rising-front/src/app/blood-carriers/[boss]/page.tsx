import { FC } from "react";
import { getBoss } from "@/server/actions";
import { notFound } from "next/navigation";
import { Boss } from "@/components/Boss";

type Props = {
  params: Promise<{ boss: string }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { boss: bossId } = await params;

  try {
    const boss = await getBoss(bossId);
    const {
      name,
      description,
      location,
      locations_details,
      img,
      level,
      ability,
      weaponsRecipe,
      resources,
      attacks,
    } = boss;
    return (
      <Boss
        name={name}
        description={description}
        location={location}
        locations_details={locations_details}
        img={img}
        level={level}
        ability={ability}
        weaponsRecipe={weaponsRecipe}
        resources={resources}
        attacks={attacks}
      />
    );
  } catch (e) {
    console.error(e);
    return notFound();
  }
};
export default Page;
