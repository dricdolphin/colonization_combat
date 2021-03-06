let armor_data = {
    categories: [
        {
            id: "",
            armor_name: "",
            base_HP: "",
            damage_reduction: "",
            armor_level: ""
        }
    ]
};

limiting_object["armor"] = function (item, extra_info) {
    if (item.armor_level > extra_info.player_data.player_armor_level) {
        return false;
    }
    return true;
};

/**
 *  Armor class
 *
 * @class
 * @param object_index -- index of the category, same index as from vessel_categories object
 * @param armor_ajax_data -- object data from the AJAX
 * @param object_data -- data used to create the object
 */

function armor (object_index, armor_ajax_data = ajax_data, object_data = armor_data) {
    this.id = Number(object_index);
    const category_index = armor_ajax_data["armor_data"].categories.findIndex(x => x.id === this.id);

    for (const property in object_data.categories[0]) {
        if (property !== "id") {
            this[property] = armor_ajax_data["armor_data"].categories[category_index][property];
        }
    }
}