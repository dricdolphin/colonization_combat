let category_data = {
    categories: [
        {
            category_name: "",
            base_HP: "",
            weapon_slots: "",
            armor_slots: "",
            shield_slots: "",
            max_engines: "",
            max_warp_engines: "",
            category_level : ""
        }
    ]
};

/**
 * Category class
 *
 * @class
 * @param object_index -- index of the category, same index as from vessel_categories object
 * @param object_data -- data used to create the object
 */

function category (object_index, object_data = category_data) {
    this.category_index = object_index;
    for (const property in object_data.categories[object_index]) {
         this[property] = object_data.categories[object_index][property];
    }
}