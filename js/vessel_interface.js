/**
 * Populate the SELECT with vessel_categories options
 *
 * @param vessel_categories - object containing the vessel category data
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
 * @param click_event - event from the clicked link
 * @param click_link - link that was used to access this function
 * @param vessel_categories_data - object containing data from vessel categories (default is produced by AJAX)
 */
function new_vessel(click_event, click_link, vessel_categories_data = vessel_categories) {
    const select_categories = vessel_categories_select(vessel_categories_data);

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
    select_categories.setAttribute("previously_selected_index",0);
    select_categories.addEventListener("click", function () {
            select_categories.setAttribute("previously_selected_index",this.selectedIndex);
        }
    );
    select_categories.addEventListener("change", function() {
            vessel_category_change(this, this.getAttribute("previously_selected_index"));
        }
    );
    vessel_category_label.appendChild(select_categories);

    let vessel_category_div = document.createElement("div");
    vessel_category_div.appendChild(vessel_category_label);

    let vessel_div = document.createElement("div");
    vessel_div.setAttribute("data-type","vessel");
    vessel_div.appendChild(vessel_name_div);
    vessel_div.appendChild(vessel_category_div);

    team_div.appendChild(vessel_div);
    //TODO -- add vessel to vessel pool

    click_event.preventDefault();
    return false;
}

/**
 * Create a New Vessel interface
 *
 * @param click_event - event from the clicked link
 * @param click_link - link that was used to access this function
 */
function remove_vessel (click_event, click_link) {
    let vessel_div = click_link.parentElement.parentElement;
    let main_div = vessel_div.parentElement;
    let main_div_vessels = [];

    main_div.childNodes.forEach(function(item, index, object) {
            if (item.tagName === "DIV" && item.getAttribute("data-type") === "vessel") {
                main_div_vessels.push(item);
            }
        }
    );

    for (let index = 0; index < main_div_vessels.length; index++) {
        if (main_div_vessels[index] === vessel_div) {
            console.log(index);
            break;
        }
    }


    main_div.removeChild(vessel_div);
    //TODO -- remove vessel from vessel pool


    click_event.preventDefault();
    return false;
}

/**
 * Inform user that changing a vessel category will remove all changes
 * and then changes the category and add editable slots (weapon, engines etc)
 *
 * @param category_select - select that was used to access this function
 * @param selected_index - index that was selected
  */
function vessel_category_change(category_select, selected_index) {
    const accept_change = confirm("Changing categories will remove all changes from the Vessel. Continue?");

    if (!accept_change) {
        category_select.selectedIndex = selected_index
        return false;
    }
    return true;
}