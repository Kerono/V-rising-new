import type { ResourceIds } from "@/variables";
import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;
  img: string;
  id: ResourceIds;
  isCurrentlySelected: boolean;
};

export const Item = ({ name, img, isCurrentlySelected, id }: Props) => {
  return (
    <>
      <Image width={30} height={30} src={img} alt={name} />
      {isCurrentlySelected ? (
        <div>{name}</div>
      ) : (
        <Link href={`/items/${id}`}>{name}</Link>
      )}
    </>
  );
};
