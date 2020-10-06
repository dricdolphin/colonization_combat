let ajax_data = {
    category_data: category_data,
    weapon_data: weapon_data
};
//    armor_data: {},
//     shield_data: {},
//     engine_data: {},
//     warp_engine_data: {}


/**
 * Load the data used by the vessels
 *
 */
function load_ajax_data() {
    let ajax_url = {};
    let ajax_xml_request = {};
    let ajax_request_data = {};

    for (let property in ajax_data) {
        let part_name = property.replace("_data","");
        ajax_url[property] = part_name+"_ajax_data.txt";
        ajax_request_data[property] = "post_type=POST&action="+part_name+"_data";

        ajax_xml_request[property] = new XMLHttpRequest();
        ajax_xml_request[property].onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                try {
                    ajax_data[property] = JSON.parse(this.responseText);
                    ajax_data[property].categories = localize_object(ajax_data[property].categories,part_name+"_name");
                }
                catch (err) {
                    console.log(this.responseText);
                    return false;
                }
            }
        };
        ajax_xml_request[property].open("POST", ajax_url[property], true);
        ajax_xml_request[property].setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax_xml_request[property].send(ajax_request_data[property]);
    }

    /***********
    let category_ajax_data = "post_type=POST&action=category_data";
    let category_ajax_url = "category_ajax_data.txt";
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
    let weapon_ajax_data = "post_type=POST&action=weapon_data";
    let weapon_ajax_url = "weapon_ajax_data.txt";
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
     //***/

}