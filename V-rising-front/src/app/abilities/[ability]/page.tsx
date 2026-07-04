import { getAbility } from "@/server/actions";
import { FC } from "react";
import { notFound } from "next/navigation";
import { Ability } from "@/components/Ability";
type Props = {
  params: Promise<{ ability: string }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { ability } = await params;

  try {
    const data = await getAbility(ability);
    const {
      title,
      img,
      description,
      type,
      castTime,
      notes,
      getByBossId,
      boss,
    } = data;
    return (
      <Ability
        title={title}
        img={img}
        description={description}
        type={type}
        castTime={castTime}
        notes={notes}
        getByBossId={getByBossId}
        boss={boss}
      />
    );
  } catch (e) {
    console.error(e);
    return notFound();
  }
};

export default Page;
