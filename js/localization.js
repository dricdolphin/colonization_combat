let lang = "en"; //Set default language to English
const dictionary = [];

dictionary['en'] = {
    main_title : "Star Ship Creator",
    new_vessel_ahref_innerText : "New Vessel",
    vessel_name_label_innerText : "Vessel Name",
    vessel_delete_ahref_innerText : "Remove Vessel",
    vessel_category_label_innerText : "Category",
    corvette : "Corvette",
    frigate : "Frigate",
    destroyer : "Destroyer",
    light_cruiser : "Light Cruiser",
    heavy_cruiser : "Heavy Cruiser"
};

//Localize Title (and other items) when document finishes loading
let localization_loader = window.addEventListener("load", function () {
    lang = document.body.lang;

    if (typeof(dictionary[lang]) === "undefined") {
        lang = "en";
    }

    //Localize Title
    document.title = dictionary[lang].main_title;

    //TODO -- localization for all text variables
});

/***
 * Localize a given object
 *
 * @param object_localizing -- object being localized
 * @param property_being_localized -- property being localized
 */
function localize_object (object_localizing, property_being_localized) {
    let localized_property = property_being_localized;
    return object_localizing.map( function (currentValue) {
            currentValue[localized_property] = dictionary[lang][currentValue[localized_property]];
            return currentValue;
        }
    );
}