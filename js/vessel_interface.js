
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

function load_vessel_interface() {
    //TODO -- create the framework for the main system objects

    //Get categories data from AJAX (temporarily getting from this variable
    const ajax_categories = '{ "categories" : [' +
        '{ "category_name":"Corveta", "base_HP":"10", "weapons_slots":"1", "armor_slots":"1", "shield_slots":"1", "max_engines":"1", "max_warp_engines":"1" },' +
        '{ "category_name":"Fragata", "base_HP":"30", "weapons_slots":"2", "armor_slots":"1", "shield_slots":"1", "max_engines":"1", "max_warp_engines":"1" },' +
        '{ "category_name":"Destroyer", "base_HP":"50", "weapons_slots":"3", "armor_slots":"1", "shield_slots":"1", "max_engines":"2", "max_warp_engines":"2" },' +
        '{ "category_name":"Cruzador Leve", "base_HP":"100", "weapons_slots":"6", "armor_slots":"1", "shield_slots":"1", "max_engines":"2", "max_warp_engines":"2" },' +
        '{ "category_name":"Cruzador Pesado", "base_HP":"250", "weapons_slots":"6", "armor_slots":"2", "shield_slots":"2", "max_engines":"2", "max_warp_engines":"2" }' +
        ']}';

    //The AJAX would parse the JSON and then call load_vessel_categories when done loading the data
    vessel_categories = JSON.parse(ajax_categories);
    load_vessel_categories(vessel_categories);


}

function load_vessel_categories (vessel_categories) {
    const selects = document.createElement("select");

    vessel_categories.categories.forEach(item => {
        let option = document.createElement("option");
        option.text = item.category_name;
        return selects[index].add(option);
    }
    );
}
