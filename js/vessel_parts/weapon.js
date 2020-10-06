let weapon_data = {
    categories: [
        {
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

/**
 *  Weapon class
 *
 * @class
 * @param object_index -- index of the category, same index as from vessel_categories object
 * @param ajax_data -- object data from the AJAX
 * @param object_data -- data used to create the object
 */
function weapon (object_index, ajax_data, object_data = weapon_data) {
    this.part_index = object_index;

    for (const property in object_data.categories[0]) {
        this[property] = ajax_data[this.constructor.name+"_data"].categories[object_index][property];
    }
}