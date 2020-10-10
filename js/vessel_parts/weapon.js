let weapon_data = {
    categories: [
        {
            id: "",
            weapon_name: "",
            damage_vs_shields: "",
            damage_vs_armor: "",
            base_damage: "",
            accuracy: "",
            range: "",
            weapon_category: "",
            weapon_level: ""
        }
    ]
};

//Add the limiting function for populating the part select
limiting_object["weapon"] = function (item, extra_info) {
    if (item.weapon_level > extra_info.player_data["player_"+item.weapon_category+"_level"]) {
        return false;
    } else if (item.weapon_category !== "bomber" && extra_info.category_data.bomber === "true") {
        return false;
    } else if (item.weapon_category === "bomber" && extra_info.category_data.bomber !== "true") {
        return false
    }
    return true;
};

/**
 *  Weapon class
 *
 * @class
 * @param object_index -- index of the category, same index as from vessel_categories object
 * @param weapon_ajax_data -- object data from the AJAX
 * @param object_data -- data used to create the object
 */
function weapon (object_index, weapon_ajax_data = ajax_data, object_data = weapon_data) {
    this.id = Number(object_index);
    let category_index = weapon_ajax_data["weapon_data"].categories.findIndex(x => x.id === this.id);

    for (const property in object_data.categories[0]) {
        this[property] = weapon_ajax_data["weapon_data"].categories[category_index][property];
    }


    /***
     * Fire the current weapon
     *
     * @param target_vessel -- target object
     * @returns {{armor_damage: number, hull_damage: number, shield_damage: number}}
     */
    this.fire_weapon = function (target_vessel) {
        let damage = {
            shield_damage: 0,
            armor_damage: 0,
            hull_damage: 0
        }

        let attack_roll = roll_3d6();
        let difficulty = this.accuracy + target_vessel.category.enemy_accuracy_bonus - target_vessel.evasion();

        if (attack_roll > difficulty && attack_roll > 4) {
            return damage;
        }

        let damage_bonus = 0;

        if (attack_roll === 3) {
            damage_bonus = this.base_damage;
        } else if (difficulty - attack_roll > 6) {
            damage_bonus = 2;
        } else if (difficulty - attack_roll > 3) {
            damage_bonus = 1;
        }

        let target_parts = [];
        target_parts.push("shield","armor");

        if (target_vessel.shield_HP > 0) {
            let target_part = Math.floor(Math.random()*target_vessel.shield.length);
            damage.shield_damage = this.damage_vs_shields + damage_bonus - target_vessel.shield[target_part].damage_reduction;
            if (damage.shield_damage < 0) {damage.shield_damage = 0;}

            if (damage.shield_damage < target_vessel.shield_HP) {
                return damage;
            }

            damage.shield_damage = target_vessel.shield_HP;
        }

        if (target_vessel.armor_HP > 0) {
            let target_part = Math.floor(Math.random()*target_vessel.armor.length);
            damage.armor_damage = this.damage_vs_armor + damage_bonus - target_vessel.armor[target_part].damage_reduction;
            if (damage.armor_damage < 0) {damage.armor_damage = 0;}

            if (damage.armor_damage < target_vessel.armor_HP) {
                return damage;
            }

            damage.armor_damage = target_vessel.armor_HP;
        }

        damage.hull_damage = this.base_damage + damage_bonus;

        return damage;
    }
}

function process_damage_description (damage = {shield_damage: 0, armor_damage: 0,hull_damage: 0}, target_vessel = {}) {
    let damage_description = "";

    if (damage.shield_damage === 0 && damage.armor_damage === 0 && damage.hull_damage === 0) {
        return " " + dictionary[lang].causing_no_damage_text + "; ";
    }

    if (damage.shield_damage > 0) {
        let damage_level = Number(Math.round((damage.shield_damage/target_vessel.shield_HP)*10)/10).toFixed(1);
        damage_description = damage_level_description(damage_level, dictionary[lang].shield_name_label_innerText);
    }

    if (damage.armor_damage > 0) {
        let damage_level = Number(Math.round((damage.armor_damage/target_vessel.armor_HP)*10)/10).toFixed(1);
        if (damage_description != "") {
            damage_description = damage_description + " ";
        }
        damage_description = damage_description + damage_level_description(damage_level, dictionary[lang].armor_name_label_innerText);
    }

    if (damage.hull_damage > 0) {
        let damage_level = Number(Math.round((damage.hull_damage/target_vessel.HP)*10)/10).toFixed(1);
        if (damage_description != "") {
            damage_description = damage_description + " ";
        }
        damage_description = damage_description + damage_level_description(damage_level, dictionary[lang].hull_name_label_innerText);
    }

    return damage_description;
}


/***
 * Returns a Damage Level description
 *
 * @param damage_level -- value from 0 to 1 (percentage of remaining HP)
 * @param part_damaged -- part that was damaged
 * @returns {string}
 */
function damage_level_description (damage_level, part_damaged) {
    if (damage_level < 0.1) {
        return " " + dictionary[lang].causing_light_damage_text + " " + genderize_object("to_the_text", part_damaged)
            +  " " + part_damaged + "; ";
    } else if (damage_level < 0.3) {
        return " " + dictionary[lang].causing_moderate_damage_text + " " + genderize_object("to_the_text", part_damaged)
            +  " " + part_damaged + "; ";
    } else if (damage_level < 0.5) {
        return " " + dictionary[lang].causing_severe_damage_text + " " + genderize_object("to_the_text", part_damaged)
            +  " " + part_damaged + "; ";
    } else if (damage_level >= 0.5 && damage_level < 1.0 ) {
        return " " + dictionary[lang].causing_heavy_damage_text + " " + genderize_object("to_the_text", part_damaged)
            +  " " + part_damaged + "; ";
    }
        return " " + dictionary[lang].causing_destroyed_damage_text + " " + genderize_object("the_text", part_damaged)
            +  " " + part_damaged + "; ";
}