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
    return <Ability data={data} />;
  } catch (e) {
    console.error(e);
    return notFound();
  }
};

export default Page;
