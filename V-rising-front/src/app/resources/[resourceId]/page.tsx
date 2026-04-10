import styles from "./page.module.scss";
import { Item } from "@/components/Item";
import { Fragment, ReactNode, FC } from "react";
import { getResource } from "@/server/actions";
import { AdditionalInfo } from "@/components/AdditionalInfo";
import { notFound } from "next/navigation";

export type Info = {
  title: string;
  value: ReactNode;
};

type Props = {
  params: Promise<{ resourceId: string }>;
};

const Page: FC<Props> = async ({ params }) => {
  const { resourceId } = await params;
  console.log(await params);
  const data = await getResource(resourceId);
  const { id, enemiesList, resourcesList, recipesList } = data;

  const resource = resourcesList[id];

  //TODO add error validation on front side
  if (!resource) notFound();

  const {
    id: currentMaterialId,
    name,
    description,
    img,
    isTeleportable,
    stackSize,
    enemiesListIds,
  } = resource;

  const info: Info[] = [
    {
      title: "Category",
      value: <div>Material</div>,
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

  const recipesListIds = Object.keys(recipesList);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{name}</div>
        <div>{description}</div>
        {enemiesListIds.length > 0 && (
          <>
            <div>Drops from</div>
            <ul className={styles["enemies-wrapper"]}>
              {enemiesListIds.map((enemy) => {
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
          {recipesListIds.map((id) => {
            console.log(id);
            const createFromIds = recipesList[id].createFromIds;
            const resultId = recipesList[id].resultId;
            console.log(createFromIds, "createFromIds", resultId, "resultId");
            return (
              <Fragment key={id}>
                <div className={styles["items-wrapper"]}>
                  {createFromIds.map((res) => {
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
                  {resultId.map((item) => {
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
          {/* {recipesListKeys.map(({ recipe, resultItems }, index) => {
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
              </Fragment> */}
          {/* );
          })} */}
        </div>
      </div>
      <AdditionalInfo title={name} imgSrc={img} info={info} />
    </div>
  );
};
export default Page;
