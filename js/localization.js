let lang = "en"; //Set default language to English
let dictionary = [];
let gender_dictionary = [];

//Localize Title (and other items) when document finishes loading
let localization_loader = window.addEventListener("load", function () {
    lang = document.documentElement.lang;

    if (typeof(dictionary[lang]) === "undefined") {
        lang = "en";
    }

    document.title = dictionary[lang].main_title;
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


function genderize_object (property_being_genderized, gendered_text) {
    let gendered_text_property = "";
    for (let property in dictionary[lang]) {
        if (dictionary[lang][property] === gendered_text) {
            gendered_text_property = property;
        }
    }

    let gender = gender_dictionary[lang][gendered_text_property];

    if (gender === undefined) {
        return dictionary[lang][property_being_genderized];
    }

    return dictionary[lang][property_being_genderized][gender];
}