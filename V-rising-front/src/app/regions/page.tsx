import { getRegions } from "@/server/actions";
import { Regions } from "@/components/Regions";

const Page = async () => {
  const { img, data } = await getRegions();
  return <Regions data={data} img={img} />;
};

export default Page;
