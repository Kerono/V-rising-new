import styles from "./page.module.scss";
import { getAbilities } from "@/server/actions";
import { Card } from "@/components/Card";

const Page = async () => {
  const skills = await getAbilities();
  const { abilitiesInfo, abilitiesSubgroups } = skills;

  return (
    <div className={styles.wrapper}>
      <div>Abilities</div>
      <div>
        Abilities in V Rising come in the form of Weapon Skills, Spells,
        Passives and Vampire Powers. Skills are tied to the currently equipped
        weapon, whereas Spells, Passives and Vampire Powers depend on knowledge
        acquired from slaying V Bloods. Your spells and power layout is changed
        via the Spellbook.The game currently offers 14 unique weapon types, 6
        spell schools, 24 passives and 12 vampire powers to choose from. Of
        which the player can have up to 3 Weapon Skills, 1 travel spell, 2 basic
        spells, 1 ultimate spell, 12 vampire powers and 5 passives equipped at
        once. (Although only one Vampire Power may be active at a time.)
        Ultimates and defensive spells cannot crit. All abilities and actions
        can be cancelled early (default key X).
      </div>
      <div>Weapon Skills</div>
      <div>
        Equipping a weapon will grant your vampire up to 3 weapon skills that
        differ based on type of weapon equipped. Not having a weapon equipped
        will leave you with only the Unarmed Primary Attack ability (See Weapon
        Skills for more details). You can also feed on living beings below 25%
        health to fill your blood pool. Doing so turns you briefly immaterial
        and replaces your Primary Attack with the Bite ability, which ends the
        feeding early and kills the target instantly. If feeding on a V Blood
        Carrier, you become invulnerable during the channel.
      </div>
      <div>Blood Powers</div>
      <div className={styles["abilities-wrapper"]}>
        {abilitiesSubgroups.bloodPowersIds.map((abilityId) => {
          const { id, title, img } = abilitiesInfo[abilityId];
          return (
            <Card key={id} href={`/abilities/${id}`} img={img} data={title} />
          );
        })}
      </div>
      <div>Shapeshifting Powers</div>
      <div className={styles["abilities-wrapper"]}>
        {abilitiesSubgroups.shapeshiftingPowersIds.map((abilityId) => {
          const { id, title, img } = abilitiesInfo[abilityId];
          return (
            <Card key={id} href={`/abilities/${id}`} img={img} data={title} />
          );
        })}
      </div>
    </div>
  );
};
export default Page;
