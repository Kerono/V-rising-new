import { FC, Fragment } from "react";
import styles from "./resource.module.scss";
import { ResourceResponce } from "@/variables";
import { Item } from "../Item";
import { AdditionalInfoCard } from "../AdditionalInfoCard";
import type { Info } from "@/variables";

type Props = Omit<
  ResourceResponce,
  "createdFromRecepieIds" | "usedForRecepieIds"
>;

const Resource: FC<Props> = ({
  id,
  enemiesList,
  resourcesList,
  recipesList,
}) => {
  const resource = resourcesList[id];
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
            const createFromIds = recipesList[id].createFromIds;
            const resultId = recipesList[id].resultId;

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
        </div>
      </div>
      <AdditionalInfoCard title={name} imgSrc={img} info={info} />
    </div>
  );
};

export { Resource };
