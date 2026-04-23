import { FC } from "react";
import { getResource } from "@/server/actions";
import { notFound } from "next/navigation";
import { Resource } from "@/components/Resource";

type Props = {
  params: Promise<{ resourceId: string }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { resourceId } = await params;
  try {
    const data = await getResource(resourceId);
    const { id, enemiesList, resourcesList, recipesList } = data;
    return (
      <Resource
        id={id}
        enemiesList={enemiesList}
        resourcesList={resourcesList}
        recipesList={recipesList}
      />
    );
  } catch (e) {
    console.error(e);
    return notFound();
  }
};
export default Page;
