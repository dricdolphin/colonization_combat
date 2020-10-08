/**
 * Populate a select with options
 *
 * @param parts_data -- object containing the vessel category data
 * @param part_name -- name of the property that has the category name
 * @param limiting_function -- function that will test if a given item can or cannot be added
 * @param extra_info -- extra info used by the limiting_function
 * @param class_name -- class name for the select
 */
function populate_part_names_select (parts_data, part_name, limiting_function = function () {return true;}, extra_info = {}, class_name = "") {
    const select = document.createElement("select");
    select.className = class_name;
    select.addEventListener("change", function(event) {
        save_vessel_part_change(event, this, part_name);
    });

    parts_data.categories.forEach(item => {
            let option = document.createElement("option");
            option.text = item[part_name+"_name"];
            option.value = item.id;

            if (limiting_function(item, extra_info)) {
                select.add(option);
            }
        }
    );

    return select;
}

/**
 * Populates a div with a number of slots for a given part
 *
 * @param parts_div -- div that holds the parts slots
 * @param part_slots -- number of parts
 * @param parts_categories_data -- object containing data from part categories (default is produced by AJAX)
 * @param part_name -- name of the part
 * @param select_limiting_function -- a function that limits what can be populated into the select
 * @param extra_info -- extra info used by the select_limiting_function
 */
function populate_part_divs (parts_div, part_slots, parts_categories_data, part_name, select_limiting_function = function () {return true;}, extra_info = {}) {
    let parts_array = [];
    parts_div.innerHTML = "";
    let part_name_label = document.createElement("label");
    part_name_label.innerText = dictionary[lang][part_name+"_name_label_innerText"];
    parts_div.appendChild(part_name_label);

    for (let index = 0; index < part_slots; index++) {
        //let part_name_label = document.createElement("label");
        //part_name_label.innerText = dictionary[lang][part_name+"_name_label_innerText"];

        let part_select = populate_part_names_select(parts_categories_data, part_name, select_limiting_function, extra_info, "vessel_part");
        //part_name_label.appendChild(part_select);

        let part_div = document.createElement("div");
        part_div.className = part_name+"_div";
        part_div.appendChild(part_select);

        parts_div.appendChild(part_div);
        let part_object_constructor = window[part_name];
        let new_part_object = new part_object_constructor(part_select.options[part_select.selectedIndex].value);
        parts_array.push(new_part_object);
    }

    parts_div.style.display = "";
    if (part_slots === 0 || part_slots === undefined) {
        parts_div.style.display = "none";
    }

    return parts_array;
}

/**
 * Create a New Vessel interface
 *
 * @param click_event - event from the clicked link
 * @param click_link - link that was used to access this function
 * @param vessel_ajax_data - object containing data from all vessel's parts
 * @param select_limiting_object -- object containing the limiting functions used to determine what can or can't be populated in a select
 */
function new_vessel (click_event, click_link, vessel_ajax_data = ajax_data, select_limiting_object = limiting_object) {
    let team_div = click_link.parentNode;
    //let vessel_id = team_vessels[team_div.id].length;

    let vessel_delete_ahref = document.createElement("a");
    vessel_delete_ahref.href = "#";
    vessel_delete_ahref.innerText = dictionary[lang].vessel_delete_ahref_innerText;
    vessel_delete_ahref.className = "vessel_delete_ahref";
    vessel_delete_ahref.addEventListener("click", function (event) {
        remove_vessel (event,this);
    });

    let vessel_name_input = document.createElement("input");
    vessel_name_input.type = "text";
    vessel_name_input.name = "vessel_name";
    vessel_name_input.className = "vessel_name_input";
    vessel_name_input.value = dictionary[lang].vessel_name_label_innerText;
    vessel_name_input.addEventListener("focusout", function(event) {
        if (this.value === "") {
            this.value = dictionary[lang].vessel_name_label_innerText;
        }
        let vessel_div = this.parentNode;
        while (vessel_div.className !== "vessel_div") {
            vessel_div = vessel_div.parentNode
        }
        let main_div = vessel_div.parentElement;
        let vessel_index = vessel_current_index(vessel_div);

        team_vessels[main_div.id][vessel_index].name = this.value;
    });
    vessel_name_input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            this.blur();
        }
    });

    let vessel_name_div = document.createElement("div");
    vessel_name_div.className = "vessel_category_div";
    vessel_name_div.appendChild(vessel_delete_ahref);
    vessel_name_div.appendChild(vessel_name_input);


    let vessel_category_label = document.createElement("label");
    vessel_category_label.innerText = dictionary[lang].vessel_category_label_innerText;

    let select_categories = populate_part_names_select(vessel_ajax_data["category_data"], "category", select_limiting_object.category, new player_data(), "vessel_category");
    select_categories.setAttribute("previously_selected_index","0");
    select_categories.addEventListener("click", function () {
            select_categories.setAttribute("previously_selected_index", this.selectedIndex.toString());
        }
    );
    select_categories.addEventListener("change", function() {
            vessel_category_change(this, this.getAttribute("previously_selected_index"), select_limiting_object);
        }
    );

    let vessel_category_div = document.createElement("div");
    vessel_category_div.appendChild(vessel_category_label);
    vessel_category_div.appendChild(select_categories);

    let vessel_div = document.createElement("div");
    vessel_div.className = "vessel_div";
    vessel_div.setAttribute("data-type","vessel");
    vessel_div.appendChild(vessel_name_div);
    vessel_div.appendChild(vessel_category_div);

    let vessel_parts_objects = [];
    for (let vessel_parts in vessel_ajax_data) {
        if (vessel_parts !== "category_data") {
            let part_name = vessel_parts.replace("_data", "");
            let part_slots = part_name + "_slots";
            let part_div = document.createElement("div");
            part_div.className = part_name + "s_div";

            let limiting_object = {};
            limiting_object.player_data = new player_data();
            limiting_object.category_data = vessel_ajax_data["category_data"].categories[0];

            vessel_parts_objects[part_name] = populate_part_divs(part_div, vessel_ajax_data["category_data"].categories[0][part_slots], vessel_ajax_data[part_name + "_data"], part_name, select_limiting_object[part_name], limiting_object);
            vessel_div.appendChild(part_div);
        }
    }

    team_div.appendChild(vessel_div);
    //TODO -- add vessel to vessel pool
    //let new_vessel = {};
    let new_vessel = new vessel(vessel_name_input.value, new category(select_categories.options[select_categories.selectedIndex].value), vessel_parts_objects["weapon"],
        vessel_parts_objects["armor"],vessel_parts_objects["shield"],vessel_parts_objects["engine"],vessel_parts_objects["warp_engine"]);
    team_vessels[team_div.id].push(new_vessel);

    click_event.preventDefault();
    return false;
}

/**
 * Remove a vessel from the interface
 *
 * @param click_event - event from the clicked link
 * @param click_link - link that was used to access this function
 */
function remove_vessel (click_event, click_link) {
    let vessel_div = click_link.parentElement.parentElement;
    let main_div = vessel_div.parentElement;

    team_vessels[main_div.id].splice(vessel_current_index(vessel_div), 1);
    main_div.removeChild(vessel_div);


    click_event.preventDefault();
    return false;
}

/**
 * Return the index of the current vessel
 *
 * @param vessel_div - div with the current vessel
 */
function vessel_current_index (vessel_div) {
    let main_div = vessel_div.parentElement;

    let main_div_vessels = []; //Array with the vessels divs
    main_div.childNodes.forEach(item => {
            if (item.tagName === "DIV" && item.getAttribute("data-type") === "vessel") {
                main_div_vessels.push(item);
            }
        }
    );

    //Get the index of the current vessel being removed
    let vessel_index = 0;
    for (let index = 0; index < main_div_vessels.length; index++) {
        if (main_div_vessels[index] === vessel_div) {
            vessel_index = index;
            break;
        }
    }

    return vessel_index;
}