let select_categories = {};

/**
 * Populate the SELECT with vessel_categories options
 *
 */
function vessel_categories_select (vessel_categories) {
    const select = document.createElement("select");

    vessel_categories.categories.forEach(item => {
        let option = document.createElement("option");
        option.text = item.category_name;
        select.add(option);
    }
    );

    return select;
}

/**
 * Create a New Vessel interface
 *
 */
function new_vessel(event,object) {
    let team_div = object.parentNode;
    let vessel_div = document.createElement("div");
    let vessel_name_div = document.createElement("div");
    let vessel_name_label = document.createElement("label");
    let vessel_name_input = document.createElement("input");
    vessel_name_label.innerText = "Vessel Name:";
    vessel_name_input.type = "text";
    vessel_name_input.name = "vessel_name";
    vessel_name_label.appendChild(vessel_name_input);
    vessel_name_div.appendChild(vessel_name_label);

    let vessel_category_div = document.createElement("div");
    let vessel_category_label = document.createElement("label");
    vessel_category_label.innerText = "Category: ";
    vessel_category_label.appendChild(select_categories);
    vessel_category_div.appendChild(vessel_category_label);

    vessel_div.appendChild(vessel_name_div);
    vessel_div.appendChild(vessel_category_div)

    team_div.appendChild(vessel_div);

    event.preventDefault();
    return false;
}