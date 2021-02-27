import {List, Title} from "react-native-paper";
import * as React from "react";
import {BoxRequirementsItem} from "./BoxRequirementsItem";

export function BoxRequirements({boxTitle, hunters, enemies, miscellaneous, parts=true}) {
    if (!!!hunters && !!!enemies && !!!miscellaneous) return
    const hunterItems = []
    const enemyItems = []
    if (parts) {
        hunters.forEach(hunter => {
            hunterItems.push(`${hunter} Figure`)
            hunterItems.push(`${hunter} Trick Weapon Dashboard`)
            hunterItems.push(`${hunter} Firearm`)
        })
        enemies.forEach(enemy => {
            enemyItems.push(`${enemy} Figure`)
            enemyItems.push(`${enemy} Card`)
        })
    } else {
        hunterItems.push(...hunters)
        enemyItems.push(...enemies)
    }
    return (
        <List.Accordion title={<Title>{boxTitle}</Title>}>
            <BoxRequirementsItem
                title='Hunters'
                items={hunterItems}
            />
            <BoxRequirementsItem
                title='Enemies'
                items={enemyItems}
            />
            <BoxRequirementsItem
                title='Misc'
                items={miscellaneous}
            />
        </List.Accordion>
    )
}
