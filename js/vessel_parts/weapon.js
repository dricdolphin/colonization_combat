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
 *  @class
 */
function weapon (object_index, object_data = category_data) {
    this.category_index = object_index;
    for (const property in object_data.categories[object_index]) {
        this[property] = object_data.categories[object_index][property];
    }
}