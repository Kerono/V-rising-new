import { getResources } from "@/server/actions";
import { ResourcesGroups } from "@/components/ResourcesGroups";

const Page = async () => {
  const data = await getResources();
  const { resourcesGroups, resourcesList } = data;

  return (
    <ResourcesGroups
      resourcesGroups={resourcesGroups}
      resourcesList={resourcesList}
    />
  );
};
export default Page;
