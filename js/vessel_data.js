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
    //Get categories data from AJAX
    let ajax_data = "post_type=POST&action=vessel_categories";
    let ajax_url = "ajax_data.txt";
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                vessel_categories = JSON.parse(this.responseText);
            }
            catch (err) {
                console.log(this.responseText);
                return false;
            }
        }
    };
    xhttp.open("POST", ajax_url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(ajax_data);
}