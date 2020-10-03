/**
 *  Creates a new vessel
 *
 *  @class
 *  @param name - vessel name
 *  @param category_index - index from the Categories select
 *  @param weapons - object array containing the weapons
 *  @param armor - object array containing the weapons
 *  @param shields - object array containing the shields
 *  @param engines - object array containing the engines
 *  @param warp_engines - object array containing the warp_engines
 */
function vessel(name, category_index, weapons) {
    this.name = name;
    this.category_index = category_index;
    this.weapons = weapons;
    this.armors = armors;
    this.shields = shields;
    this.engines = engines;
    this.warp_engines = warp_engines;
}

/**
 *  Weapon class
 *
 *  @class
 */
function weapon() {
    //TODO
}

/**
 *  Armor class
 *
 *  @class
 */
function armor() {
    //TODO
}

/**
 *  Shield class
 *
 *  @class
 */
function shield() {
    //TODO
}

/**
 *  Engine class
 *
 *  @class
 */
function engine() {
    //TODO
}

/**
 *  Warp Engine class
 *
 *  @class
 */
function warp_engine() {
    //TODO
}