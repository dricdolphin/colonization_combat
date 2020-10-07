let warp_engine_data = {
    categories: [
        {
            id: "",
            warp_engine_name: "",
            power: "",
            warp_engine_level: ""
        }
    ]
};

limiting_object["warp_engine"] = function (item, extra_info) {
    if (item.warp_engine_level > extra_info.player_data.player_warp_engine_level) {
        return false;
    }
    return true;
};

/**
 *  Warp Engine class
 *
 * @class
 * @param object_index -- index of the category, same index as from vessel_categories object
 * @param ajax_data -- object data from the AJAX
 * @param object_data -- data used to create the object
 */

function warp_engine (object_index, ajax_data, object_data = warp_engine_data) {
    this.id = object_index;
    const category_index = ajax_data[this.constructor.name+"_data"].categories.findIndex(x => x.id === this.id);

    for (const property in object_data.categories[0]) {
        if (property !== "id") {
            this[property] = ajax_data[this.constructor.name + "_data"].categories[category_index][property];
        }
    }
}