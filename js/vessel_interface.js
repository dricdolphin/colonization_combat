/**
 * Populate a select with options
 *
 * @param parts_data -- object containing the vessel category data
 * @param part_name -- name of the property that has the category name
 * @param limiting_function -- function that will test if a given item can or cannot be added
 */
function populate_part_names_select (parts_data, part_name, limiting_function = function () {return true;}) {
    const select = document.createElement("select");

    parts_data.categories.forEach(item => {
            let option = document.createElement("option");
            option.text = item[part_name+"_name"];
            if (limiting_function(item)) {
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
 */
function populate_part_divs (parts_div, part_slots, parts_categories_data, part_name, select_limiting_function = function () {return true;}) {
    parts_div.innerHTML = "";

    for (let index = 0; index < part_slots; index++) {

        let part_name_label = document.createElement("label");
        part_name_label.innerText = dictionary[lang][part_name+"_name_label_innerText"];

        let part_select = populate_part_names_select(parts_categories_data, part_name, select_limiting_function);
        part_name_label.appendChild(part_select);

        let part_div = document.createElement("div");
        part_div.className = part_name+"_div";
        part_div.appendChild(part_name_label);

        parts_div.appendChild(part_div);
    }

    return true;
}

/**
 * Create a New Vessel interface
 *
 * @param click_event - event from the clicked link
 * @param click_link - link that was used to access this function
 * @param vessel_ajax_data - object containing data from all vessel's parts
 */
function new_vessel(click_event, click_link, vessel_ajax_data = ajax_data) {
    let team_div = click_link.parentNode;

    let vessel_delete_ahref = document.createElement("a");
    vessel_delete_ahref.href = "#";
    vessel_delete_ahref.innerText = dictionary[lang].vessel_delete_ahref_innerText;
    vessel_delete_ahref.addEventListener("click",function () {
        remove_vessel (event,this);
    });

    let vessel_name_input = document.createElement("input");
    vessel_name_input.type = "text";
    vessel_name_input.name = "vessel_name";

    let vessel_name_label = document.createElement("label");
    vessel_name_label.innerText = dictionary[lang].vessel_name_label_innerText;
    vessel_name_label.appendChild(vessel_name_input);

    let vessel_name_div = document.createElement("div");
    vessel_name_div.appendChild(vessel_name_label);
    vessel_name_div.appendChild(vessel_delete_ahref);


    let vessel_category_label = document.createElement("label");
    vessel_category_label.innerText = dictionary[lang].vessel_category_label_innerText;

    let limiting_object = {
        weapon : function (item) {
            if (item.weapon_category === "laser") {
                return true;
            }
            return false;
        }
    };

    let select_categories = populate_part_names_select(vessel_ajax_data["category_data"], "category");
    select_categories.setAttribute("previously_selected_index",0);
    select_categories.addEventListener("click", function () {
            select_categories.setAttribute("previously_selected_index",this.selectedIndex);
        }
    );
    select_categories.addEventListener("change", function() {
            vessel_category_change(this, this.getAttribute("previously_selected_index"), limiting_object);
        }
    );
    vessel_category_label.appendChild(select_categories);

    let vessel_category_div = document.createElement("div");
    vessel_category_div.appendChild(vessel_category_label);

    let vessel_weapons_div = document.createElement("div");
    vessel_weapons_div.className = "weapons_div";
    populate_part_divs(vessel_weapons_div, 1, vessel_ajax_data["weapon_data"], "weapon", limiting_object["weapon"]);

    let vessel_div = document.createElement("div");
    vessel_div.className = "vessel_div";
    vessel_div.setAttribute("data-type","vessel");
    vessel_div.appendChild(vessel_name_div);
    vessel_div.appendChild(vessel_category_div);
    vessel_div.appendChild(vessel_weapons_div);

    team_div.appendChild(vessel_div);
    //TODO -- add vessel to vessel pool

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
            console.log(index);
            vessel_index = index;
            break;
        }
    }

    main_div.removeChild(vessel_div);
    //TODO -- remove vessel from vessel pool
    click_event.preventDefault();
    return false;
}