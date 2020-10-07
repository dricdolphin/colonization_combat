let category_data = {
    categories: [
        {
            id: "",
            category_name: "",
            base_HP: "",
            weapon_slots: "",
            armor_slots: "",
            shield_slots: "",
            engine_slots: "",
            warp_engine_slots: "",
            category_level : "",
            enemy_accuracy_bonus: "",
            bomber: ""
        }
    ]
};

//Add the limiting function for populating the part select
limiting_object["category"] = function (item, extra_info) {
    if (item.category_level > extra_info.player_category_level) {
        return false;
    }
    return true;
};

/**
 * Category class
 *
 * @class
 * @param object_index -- index of the category, same index as from vessel_categories object
 * @param ajax_data -- object data from the AJAX
 * @param object_data -- data used to create the object
 */

function category (object_index, ajax_data, object_data = category_data) {
    this.id = object_index;
    const category_index = ajax_data[this.constructor.name+"_data"].categories.findIndex(x => x.id === this.id);

    for (const property in object_data.categories[0]) {
        if (property !== "id") {
            this[property] = ajax_data[this.constructor.name + "_data"].categories[category_index][property];
        }
    }
}

/**
 * Inform user that changing a vessel category will remove all changes
 * and then changes the category and add editable slots (weapon, engines etc)
 *
 * @param category_select - select that was used to access this function
 * @param previously_selected_index - index that was selected
 * @param limiting_object - object with all the limits that must be propagated
 * @param category_ajax_data -- object containing data from all vessel parts
 */
function vessel_category_change(category_select, previously_selected_index, limiting_object, category_ajax_data = ajax_data) {
    const accept_change = confirm("Changing categories will remove all changes from the Vessel. Continue?");

    if (!accept_change) {
        category_select.selectedIndex = previously_selected_index
        return false;
    }

    let vessel_div = category_select.parentNode;
    while (vessel_div = vessel_div.parentNode) {
        if (vessel_div.className === "vessel_div") {
            break;
        }
    }

    let parts_div = {
        weapons_div: {},
        armors_div: {},
        shields_div: {},
        engines_div: {},
        warp_engines_div: {},

    };

    let extra_info_object = {};
    let category_index = category_ajax_data["category_data"].categories.findIndex(x => x.id === category_select.options[category_select.selectedIndex].value);

    extra_info_object.category_data = category_ajax_data["category_data"].categories[category_index];
    extra_info_object.player_data = new player_data();

    vessel_div.childNodes.forEach(item => {
        if (item.tagName === "DIV" && item.className !== "") {
            if (typeof(parts_div[item.className]) !== "undefined") {
                parts_div[item.className] = item;
                let part_name = item.className.replace("s_div","");
                populate_part_divs(item, category_ajax_data["category_data"].categories[category_index][part_name+"_slots"], category_ajax_data[part_name+"_data"], part_name, limiting_object[part_name], extra_info_object)
            }
        }
    });


    return true;
}