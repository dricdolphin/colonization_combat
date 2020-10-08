let limiting_object = {};

/**
 *  Creates a new vessel
 *
 *  @class
 *  @param {string} name -- vessel name
 *  @param category -- object containing the category
 *  @param weapons -- object array containing the weapons
 *  @param armors -- object array containing the weapons
 *  @param shields -- object array containing the shields
 *  @param engines -- object array containing the engines
 *  @param warp_engines -- object array containing the warp_engines
 */
function vessel(name, category, weapons, armors, shields, engines, warp_engines) {
    this.name = name;
    this.category = category;
    this.weapon = weapons;
    this.armor = armors;
    this.shield = shields;
    this.engine = engines;
    this.warp_engine = warp_engines;
}

/***
 *
 * @param event -- change event
 * @param select_object -- select of the part that changed
 * @param part_name -- name of the part
 * @param part_ajax_data -- parts data
 */
function save_vessel_part_change(event, select_object, part_name, part_ajax_data = ajax_data) {
    if (part_name === "category") {
        return true;
    }

    let vessel_div = select_object.parentElement;
    while (vessel_div.className !== "vessel_div") {
        vessel_div = vessel_div.parentElement;
    }
    let main_div = vessel_div.parentElement;
    let team_name = main_div.id;

    let vessel_index = vessel_current_index(vessel_div);     //Find the current index of the vessel being edited

    let part_div = select_object.parentElement;
    let parts_div = part_div.parentElement;
    let parts_class = part_name+"s_div";
    let part_class = part_name+"_div";

    while (parts_div.className !== parts_class) {
        parts_div = parts_div.parentElement;
    }

    let parts_div_array = []; //Array with the parts div
    parts_div.childNodes.forEach(item => {
            if (item.tagName === "DIV" && item.className === part_class) {
                parts_div_array.push(item);
            }
        }
    );

    let part_index = 0;
    for (let index = 0; index < parts_div_array.length; index++) {
        if (parts_div_array[index] === part_div) {
            part_index = index;
            break;
        }
    }

    let part_constructor = window[part_name];
    team_vessels[team_name][vessel_index][part_name][part_index] = new part_constructor(select_object.options[select_object.selectedIndex].value);

    return true;
}