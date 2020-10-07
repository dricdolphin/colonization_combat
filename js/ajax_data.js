let ajax_data = {
    player_data: {},
    category_data: category_data,
    armor_data: armor_data,
    shield_data: shield_data,
    engine_data: engine_data,
    warp_engine_data: warp_engine_data,
    weapon_data: weapon_data
};

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
        ajax_url[property] = "ajax_data/"+part_name+"_ajax_data.txt";
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
}