let lang = "en"; //Set default language to English
let dictionary = [];

//Localize Title (and other items) when document finishes loading
let localization_loader = window.addEventListener("load", function () {
    lang = document.documentElement.lang;

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
    return object_localizing.map( item => {
            item[property_being_localized] = dictionary[lang][item[property_being_localized]];
            return item;
        }
    );
}