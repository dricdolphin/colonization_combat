/***
 * Run a number of dices and return a value
 *
 * @param number_of_dices
 * @param number_of_faces
 * @returns {number}
 */

function roll_dices(number_of_dices, number_of_faces) {
    let dice_sum = 0;
    for (let dices=0; dices<number_of_dices; dices++) {
        dice_sum = dice_sum + Math.floor(Math.random()*number_of_faces)+1;
    }

    return dice_sum;
}

/***
 * Do the combat!
 *
 * @param click_event -- click event
 * @param click_object -- fight link
 * @returns {boolean}
 */
function do_combat(click_event, click_object) {
    let combat_result_div = document.getElementById("combat_result");
    combat_result_div.innerText = "";

    let detailed_combat_div = document.createElement("div");
    detailed_combat_div.className = "detailed_combat_div collapsed";

    if (team_vessels["team_a"].length === 0 && team_vessels["team_b"].length === 0) {
        combat_result_div.innerText = dictionary[lang].no_vessels_innertext;

        click_event.preventDefault();
        return false;
    } else if(team_vessels["team_a"].length === 0 || team_vessels["team_b"].length === 0 ) {
        combat_result_div.innerText = dictionary[lang].wo_innertext;

        click_event.preventDefault();
        return false;
    }

    let ships_still_remaining = true;
    let round = 1;
    let team_a_HP = 0;
    let team_b_HP = 0;

    while (ships_still_remaining) {
        let targets = [];
        targets["team_a"] = [];
        targets["team_b"] = [];

        let fighters = [];
        fighters["team_a"] = [];
        fighters["team_b"] = [];


        team_vessels["team_a"].forEach(function (item, index) {
            if (item.HP > 0) {
                fighters["team_a"].push(index);
                targets["team_b"].push(index);
            }
        });

        team_vessels["team_b"].forEach(function (item, index) {
            if (item.HP > 0) {
                fighters["team_b"].push(index);
                targets["team_a"].push(index);
            }
        });

        //fighters["team_a"] = shuffle(fighters["team_a"]);
        //fighters["team_b"] = shuffle(fighters["team_b"]);
        //targets["team_a"] = shuffle(targets["team_a"]);
        //targets["team_b"] = shuffle(targets["team_b"]);

        let damage_report = [];
        damage_report["team_a"] = "";
        damage_report["team_b"] = "";
        fighters["team_a"].forEach(item => {
                team_vessels["team_a"][item].weapon.forEach(weapon => {
                    let random_target = team_vessels["team_b"][targets["team_a"][Math.floor(Math.random()*targets["team_a"].length)]];

                    let damage = weapon.fire_weapon(random_target);
                    damage_report["team_a"] = damage_report["team_a"] + team_vessels["team_a"][item].name
                        + dictionary[lang].fired_text + weapon.weapon_name + dictionary[lang].at_text + random_target.name
                        + " (" + damage.attack_roll + " vs " + damage.difficulty + ")"
                    + process_damage_description(damage, random_target);

                    random_target.process_damage(damage);
                });
            }
        );


        fighters["team_b"].forEach(item => {
            team_vessels["team_b"][item].weapon.forEach(weapon => {
                let random_target = team_vessels["team_a"][targets["team_b"][Math.floor(Math.random()*targets["team_b"].length)]];

                let damage = weapon.fire_weapon(random_target);

                damage_report["team_b"] = damage_report["team_b"] + team_vessels["team_b"][item].name
                    + dictionary[lang].fired_text + weapon.weapon_name + dictionary[lang].at_text + random_target.name
                    + " (" + damage.attack_roll + " vs " + damage.difficulty + ")"
                    + process_damage_description(damage, random_target);

                random_target.process_damage(damage);
            });
        }
        );

        let round_damage_report_div = document.createElement("div");
        round_damage_report_div.innerText =
            round + " A => " + damage_report["team_a"]
            + " vs B => " + damage_report["team_b"];

        detailed_combat_div.appendChild(round_damage_report_div);
        team_a_HP = 0;
        team_b_HP = 0;

        team_vessels["team_a"].forEach(item => {
            team_a_HP = team_a_HP+ item.HP;
        });

        team_vessels["team_b"].forEach(item => {
            team_b_HP = team_b_HP+ item.HP;
        });

        if (team_a_HP <= 0 || team_b_HP <= 0) {
            ships_still_remaining = false;
        }

        round++;
        if (round > 10000) {
            ships_still_remaining = false;
        }
    }

    let damage_report_div = document.createElement("div");
    if (team_a_HP <=0 && team_b_HP <= 0) {
        damage_report_div.innerText = dictionary[lang].draw_innertext;
    } else if (team_a_HP <=0) {
        damage_report_div.innerText = dictionary[lang].victory_innertext+" -- B!!!";
    } else if (team_b_HP <=0) {
        damage_report_div.innerText = dictionary[lang].victory_innertext+" -- A!!!";
    } else {
        damage_report_div.innerText = dictionary[lang].times_up_innertext;
    }

    let team_a_result_div = document.createElement("div");
    team_a_result_div.className = "team_div";
    team_vessels["team_a"].forEach(item => {
        let vessel_div = document.createElement("div");
        vessel_div.innerText = item.name;
        if (item.HP === 0) {
            vessel_div.innerText = vessel_div.innerText + " - " + genderize_object("destroyed_damage_text", dictionary[lang].vessel_text);
        } else {
            let shield_HP_div = create_attribute_div(item, "shield_HP","fas fa-shield");
            let armor_HP_div = create_attribute_div(item, "armor_HP","fas fa-dice-d6");
            let HP_div = create_attribute_div(item, "HP","fas fa-heart");

            vessel_div.appendChild(shield_HP_div);
            vessel_div.appendChild(armor_HP_div);
            vessel_div.appendChild(HP_div);
        }

        team_a_result_div.appendChild(vessel_div);

        item.get_attributes_html();
    });

    let team_b_result_div = document.createElement("div");
    team_b_result_div.className = "team_div";
    team_vessels["team_b"].forEach(item => {
        let vessel_div = document.createElement("div");
        vessel_div.innerText = item.name;
        if (item.HP === 0) {
            vessel_div.innerText = vessel_div.innerText + " - " + genderize_object("destroyed_damage_text", dictionary[lang].vessel_text);
        } else {
            let shield_HP_div = create_attribute_div(item, "shield_HP","fas fa-shield");
            let armor_HP_div = create_attribute_div(item, "armor_HP","fas fa-dice-d6");
            let HP_div = create_attribute_div(item, "HP","fas fa-heart");

            vessel_div.appendChild(shield_HP_div);
            vessel_div.appendChild(armor_HP_div);
            vessel_div.appendChild(HP_div);
        }
        team_b_result_div.appendChild(vessel_div);

        item.get_attributes_html();
    });


    combat_result_div.appendChild(damage_report_div);
    combat_result_div.appendChild(team_a_result_div);
    combat_result_div.appendChild(team_b_result_div);

    let hidden_details_link = document.createElement("a");
    hidden_details_link.href = "#";
    hidden_details_link.innerText = dictionary[lang].show_combat_details_text;
    hidden_details_link.addEventListener("click", function(event,clicked_object = this) {
        let detailed_combat_div = document.querySelector(".detailed_combat_div")
        detailed_combat_div.style.maxHeight = detailed_combat_div.scrollHeight;
        detailed_combat_div.classList.toggle("collapsed");

        event.preventDefault();
        return false;
        }
    );

    let hidden_details_div = document.createElement("div");
    hidden_details_div.className = "hidden_combat_details";
    hidden_details_div.appendChild(hidden_details_link);
    hidden_details_div.appendChild(detailed_combat_div);

    combat_result_div.appendChild(hidden_details_div);

    click_event.preventDefault();
    return false;
}

/***
 * Shuffles an array
 *
 * @param array
 * @returns {*}
 */
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}