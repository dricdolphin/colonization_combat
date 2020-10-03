//Declare the global variables
let vessel_categories = {
    categories: [
        {
            category_name: "",
            base_HP: "",
            weapon_slots: "",
            armor_slots: "",
            shield_slots: "",
            max_engines: "",
            max_warp_engines: ""
        }
    ]
};

/**
 * Load the data used by the vessels
 *
 */
function load_ajax_data() {
    //Get Vessel Categories data from AJAX
    let ajax_data = "post_type=POST&action=vessel_categories";
    let ajax_url = "ajax_data.txt";
    let ajax_load = new XMLHttpRequest();
    ajax_load.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            try {
                vessel_categories = JSON.parse(this.responseText);
                vessel_categories.categories = localize_object(vessel_categories.categories,"category_name");
                //select_categories = vessel_categories_select(vessel_categories);
            }
            catch (err) {
                console.log(this.responseText);
                return false;
            }
        }
    };
    ajax_load.open("POST", ajax_url, true);
    ajax_load.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax_load.send(ajax_data);
}