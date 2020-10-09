
/***
 * Roll 3d6 and return the value
 *
 * @returns {number}
 */
function roll_3d6() {
    return Math.round(Math.random()*6)+Math.round(Math.random()*6)+Math.round(Math.random()*6)+3;
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

        fighters["team_a"] = shuffle(fighters["team_a"]);
        fighters["team_b"] = shuffle(fighters["team_b"]);
        targets["team_a"] = shuffle(targets["team_a"]);
        targets["team_b"] = shuffle(targets["team_b"]);

        team_vessels["team_a"][fighters["team_a"][0]].weapon.forEach(weapon => {
          let damage = weapon.fire_weapon(team_vessels["team_b"][targets["team_a"][0]]);
          team_vessels["team_b"][targets["team_a"][0]].process_damage(damage);
        });

        team_vessels["team_b"][fighters["team_b"][0]].weapon.forEach(weapon => {
            let damage = weapon.fire_weapon(team_vessels["team_a"][targets["team_b"][0]]);
            team_vessels["team_a"][targets["team_b"][0]].process_damage(damage);
        });

        let damage_report_div = document.createElement("div");
        damage_report_div.innerText =
            round + " A => "
            + team_vessels["team_a"][fighters["team_a"][0]].name +": "+ team_vessels["team_a"][fighters["team_a"][0]].shield_HP
            + " | " + team_vessels["team_a"][fighters["team_a"][0]].armor_HP + " HP: "+ team_vessels["team_a"][fighters["team_a"][0]].HP
            + " vs B => "
            + team_vessels["team_b"][fighters["team_b"][0]].name +": "+ team_vessels["team_b"][fighters["team_b"][0]].shield_HP
            + " | " + team_vessels["team_b"][fighters["team_b"][0]].armor_HP + " HP: "+ team_vessels["team_b"][fighters["team_b"][0]].HP;

        combat_result_div.appendChild(damage_report_div);
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
        if (round > 1000) {
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
        damage_report_div.innerText = dictionary[lang].times_up_innertext;;
    }

    team_vessels["team_a"].forEach(item => {
        item.get_attributes_html();
    });
    team_vessels["team_b"].forEach(item => {
        item.get_attributes_html();
    });

    combat_result_div.appendChild(damage_report_div);

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
    var currentIndex = array.length, temporaryValue, randomIndex;

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