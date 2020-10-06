/**
 * Load the data used by the vessels
 *
 */
function load_ajax_data() {
    //Get Vessel Categories data from AJAX
    let category_ajax_data = "post_type=POST&action=vessel_categories";
    let category_ajax_url = "categories_ajax_data.txt";
    let category_ajax_load = new XMLHttpRequest();
    category_ajax_load.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            try {
                category_data = JSON.parse(this.responseText);
                category_data.categories = localize_object(category_data.categories,"category_name");
            }
            catch (err) {
                console.log(this.responseText);
                return false;
            }
        }
    };
    category_ajax_load.open("POST", category_ajax_url, true);
    category_ajax_load.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    category_ajax_load.send(category_ajax_data);

    //Get Weapon data from AJAX
    let weapon_ajax_data = "post_type=POST&action=weapon_categories";
    let weapon_ajax_url = "weapons_ajax_data.txt";
    let weapon_ajax_load = new XMLHttpRequest();
    weapon_ajax_load.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            try {
                weapon_data = JSON.parse(this.responseText);
                weapon_data.weapon_name = localize_object(weapon_data.categories,"weapon_name");
            }
            catch (err) {
                console.log(this.responseText);
                return false;
            }
        }
    };
    weapon_ajax_load.open("POST", weapon_ajax_url, true);
    weapon_ajax_load.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    weapon_ajax_load.send(weapon_ajax_data);
}