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
 * @param object_index -- index of the category, same index as from vessel_categories object
 * @param shield_ajax_data -- object data from the AJAX
 * @param object_data -- data used to create the object
 */

function shield (object_index, shield_ajax_data = ajax_data, object_data = shield_data) {
    this.id = Number(object_index);
    const category_index = shield_ajax_data["shield_data"].categories.findIndex(x => x.id === this.id);

    for (const property in object_data.categories[0]) {
        if (property !== "id") {
            this[property] = shield_ajax_data["shield_data"].categories[category_index][property];
        }
    }
}