import styles from "./page.module.scss";
import { ResourceIds } from "@/variables";
import { Item } from "@/components/Item";
import { Fragment, ReactNode, FC } from "react";
import { getSpecificItem } from "@/server/actions";
import { AdditionalInfo } from "@/components/AdditionalInfo";
import { notFound } from "next/navigation";

export type Info = {
  title: string;
  value: ReactNode;
};

type Props = {
  params: Promise<{ item: ResourceIds }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { item } = await params;
  const data = await getSpecificItem(item);
  const { id, enemiesList, resourcesList, recipesList } = data;

  const resource = resourcesList[id];

  if (!resource) notFound();

  const {
    name,
    description,
    img,
    groups,
    category,
    isTeleportable,
    stackSize,
    id: currentMaterialId,
  } = resource;

  const info: Info[] = [
    {
      title: "Category",
      value: <div>{category}</div>,
    },
    {
      title: "Teleportable",
      value: <div>{isTeleportable ? "Yes" : "No"}</div>,
    },
    {
      title: "Max stack size",
      value: <div>{stackSize}</div>,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{name}</div>
        <div>{description}</div>
        {groups.enemiesList.length > 0 && (
          <>
            <div>Drops from </div>
            <ul className={styles["enemies-wrapper"]}>
              {groups.enemiesList.map((enemy) => {
                const { name } = enemiesList[enemy];
                return <li key={enemy}>{name}</li>;
              })}
            </ul>
          </>
        )}
        <div>Recipes</div>
        <div className={styles["table-wrapper"]}>
          <div>Recipe</div>
          <div>Resulting Item</div>
          {recipesList.map(({ recipe, resultItems }, index) => {
            return (
              <Fragment key={index}>
                <div className={styles["items-wrapper"]}>
                  {recipe.map((res) => {
                    const { img, name, id } = resourcesList[res];
                    const isCurrentlySelected = currentMaterialId === id;
                    return (
                      <div key={id} className={styles.items}>
                        <Item
                          id={id}
                          name={name}
                          img={img}
                          isCurrentlySelected={isCurrentlySelected}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className={styles["items-wrapper"]}>
                  {resultItems.map((item) => {
                    const { img, name, id } = resourcesList[item];
                    const isCurrentlySelected = currentMaterialId === id;
                    return (
                      <div key={id} className={styles.items}>
                        <Item
                          key={id}
                          id={id}
                          name={name}
                          img={img}
                          isCurrentlySelected={isCurrentlySelected}
                        />
                      </div>
                    );
                  })}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
      <AdditionalInfo title={name} imgSrc={img} info={info} />
    </div>
  );
};
export default Page;
