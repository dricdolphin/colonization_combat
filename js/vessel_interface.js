let select_categories = {};

/**
 * Populate the system interface
 *
 */
function load_vessel_interface() {

}

/**
 * Populate the SELECT with vessel_categories options
 *
 */
function vessel_categories_select (vessel_categories) {
    const select = document.createElement("select");

    vessel_categories.categories.forEach(item => {
        let option = document.createElement("option");
        option.text = item.category_name;
    }
    );

    return select;
}