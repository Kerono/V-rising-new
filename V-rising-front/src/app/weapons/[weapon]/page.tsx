import { FC } from "react";
import { getWeapon } from "@/server/actions";
import { notFound } from "next/navigation";
import { Weapon } from "@/components/Weapon";

type Props = {
  params: Promise<{
    weapon: string;
  }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { weapon } = await params;

  try {
    const data = await getWeapon(weapon);
    const { name, boss, description, skills } = data;
    return (
      <Weapon
        name={name}
        boss={boss}
        description={description}
        skills={skills}
      />
    );
  } catch (e) {
    console.error(e);
    return notFound();
  }
};

export default Page;
