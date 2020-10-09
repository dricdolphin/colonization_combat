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
 *
 *  @method get_attributes_html -- get a div with all the vessel's property
 */
function vessel (name, category, weapons, armors, shields, engines, warp_engines) {
    this.name = name;
    this.category = category;
    this.weapon = weapons;
    this.armor = armors;
    this.shield = shields;
    this.engine = engines;
    this.warp_engine = warp_engines;

    this.get_attributes_html = function () {
        this.slots = this.category.category_level;
        if (this.category.bomber === "true") {
            this.slots = this.slots*3;
        }

        this.power = 0;
        this.warp_power = 0;
        this.range = 0;
        this.agility = 0

        for (let categoryKey in this.category) {
            if (categoryKey.indexOf("_slots") !== -1) {
                this.slots = this.slots + this.category[categoryKey];
            }
        }

        this.engine.forEach(engine => {
                this.power = this.power + engine.power;
            }
        );

        this.warp_engine.forEach(warp_engine => {
                this.warp_power = this.warp_power + warp_engine.power;
            }
        );

        this.range = Math.ceil(this.warp_power/this.slots);
        this.agility = Math.floor((this.power/this.category.category_level)+(3-Math.pow(this.category.category_level,0.33)));

        //<div class='fas fa-user-circle tooltip'><span class='tooltiptext'>MdO Disponível Sistema</span></div>
        this.attributes_html = document.createElement("div");
        this.attributes_html.className = "attributes_div";

        let range_div = create_attribute_div(this, "range","far fa-road");
        let agility_div = create_attribute_div(this, "agility","far fa-starfighter");

        this.attributes_html.appendChild(range_div);
        this.attributes_html.appendChild(agility_div);

        return this.attributes_html;
    }
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
    update_vessel_attributes (vessel_div, vessel_index);

    return true;
}

/**
 * Update the attributes_div of the current vessel
 *
 * @param vessel_div -- div with the current vessel
 * @param vessel_index -- index of the current vessel
 */
function update_vessel_attributes (vessel_div, vessel_index) {
    let main_div = vessel_div.parentElement;

    let attributes_div = {};
    vessel_div.childNodes.forEach(item => {
        if (item.className === "attributes_div") {
            attributes_div = item;
        }
    });

    attributes_div.innerHTML = "";
    attributes_div.appendChild(team_vessels[main_div.id][vessel_index].get_attributes_html());
}

/***
 * Create a vessel's attribute div
 *
 * @param vessel_object -- vessel being edited
 * @param vessel_attribute -- attribute being visualized
 * @param vessel_attribute_icon -- attribute icon
 * @returns {HTMLDivElement}
 */

function create_attribute_div (vessel_object, vessel_attribute, vessel_attribute_icon) {
    let attribute_div = document.createElement("div");
    attribute_div.className = vessel_attribute_icon+" tooltip attribute_div";
    let attribute_value_span = document.createElement("span");
    attribute_value_span.className = "attribute_div";
    attribute_value_span.innerText = vessel_object[vessel_attribute];
    attribute_div.appendChild(attribute_value_span);

    let attribute_tooltip = document.createElement("span")
    attribute_tooltip.className = "tooltiptext";
    attribute_tooltip.innerText = dictionary[lang][vessel_attribute+"_innerText"];
    attribute_div.appendChild(attribute_tooltip);

    return attribute_div;
}