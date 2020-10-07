/**
 *  Armor class
 *
 * @class
 * @param id -- player id
 * @param player_data_ajax -- ajax_data for the player
 */
function player_data(id=0, player_data_ajax = ajax_data["player_data"]) {
    this.id = id;

    player_data_ajax = player_data_ajax.categories[this.id];

    this.player_category_level= player_data_ajax.player_category_level;
    this.player_torpedo_level= player_data_ajax.player_torpedo_level;
    this.player_bomber_level= player_data_ajax.player_bomber_level;
    this.player_laser_level= player_data_ajax.player_laser_level;
    this.player_armor_level= player_data_ajax.player_armor_level;
    this.player_shield_level= player_data_ajax.player_shield_level;
    this.player_engine_level= player_data_ajax.player_engine_level;
    this.player_warp_engine_level= player_data_ajax.player_warp_engine_level;
};