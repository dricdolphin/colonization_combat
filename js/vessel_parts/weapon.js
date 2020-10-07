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
 * @param ajax_data -- object data from the AJAX
 * @param object_data -- data used to create the object
 */
function weapon (object_index, ajax_data, object_data = weapon_data) {
    this.id = object_index;
    let category_index = ajax_data[this.constructor.name+"_data"].categories.findIndex(x => x.id === this.id);

    for (const property in object_data.categories[0]) {
        this[property] = ajax_data[this.constructor.name+"_data"].categories[category_index][property];
    }
}