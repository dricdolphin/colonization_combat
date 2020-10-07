let shield_data = {
    categories: [
        {
            id: "",
            shield_name: "",
            base_HP: "",
            damage_reduction: "",
            shield_level: ""
        }
    ]
};

limiting_object["shield"] = function (item, extra_info) {
    if (item.shield_level > extra_info.player_data.player_shield_level) {
        return false;
    }
    return true;
};

/**
 *  Shield class
 *
 * @class
 * @param id -- index of the category, same index as from vessel_categories object
 * @param ajax_data -- object data from the AJAX
 * @param object_data -- data used to create the object
 */

function shield (object_index, ajax_data, object_data = shield_data) {
    this.id = object_index;
    const category_index = ajax_data[this.constructor.name+"_data"].categories.findIndex(x => x.id === this.id);

    for (const property in object_data.categories[0]) {
        if (property !== "id") {
            this[property] = ajax_data[this.constructor.name + "_data"].categories[category_index][property];
        }
    }
}