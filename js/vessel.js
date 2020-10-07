let limiting_object = {};

/**
 *  Creates a new vessel
 *
 *  @class
 *  @param {string} name - vessel name
 *  @param category - object containing the category
 *  @param weapons - object array containing the weapons
 *  @param armors - object array containing the weapons
 *  @param shields - object array containing the shields
 *  @param engines - object array containing the engines
 *  @param warp_engines - object array containing the warp_engines
 */
function vessel(name, category, weapons, armors, shields, engines, warp_engines) {
    this.name = name;
    this.category = category;
    this.weapons = weapons;
    this.armors = armors;
    this.shields = shields;
    this.engines = engines;
    this.warp_engines = warp_engines;
}