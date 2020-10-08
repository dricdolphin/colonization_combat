let engine_data = {
    categories: [
        {
            id: "",
            engine_name: "",
            power: "",
            engine_level: ""
        }
    ]
};

limiting_object["engine"] = function (item, extra_info) {
    if (item.engine_level > extra_info.player_data.player_engine_level) {
        return false;
    }
    return true;
};

/**
 *  Engine class
 *
 * @class
 * @param object_index -- index of the category, same index as from vessel_categories object
 * @param engine_ajax_data -- object data from the AJAX
 * @param object_data -- data used to create the object
 */

function engine (object_index, engine_ajax_data = ajax_data, object_data = engine_data) {
    this.id = Number(object_index);
    const category_index = engine_ajax_data["engine_data"].categories.findIndex(x => x.id === this.id);

    for (const property in object_data.categories[0]) {
        if (property !== "id") {
            this[property] = engine_ajax_data["engine_data"].categories[category_index][property];
        }
    }
}