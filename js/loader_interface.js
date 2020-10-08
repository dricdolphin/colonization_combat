let data_loader = {};
data_loader = window.addEventListener("load", function () {
    load_ajax_data();
    load_interface();
});

let team_vessels = [];

function load_interface () {
    const new_vessel_ahref = document.createElement("a");
    new_vessel_ahref.href = "#";
    new_vessel_ahref.className = "new_vessel_ahref";
    new_vessel_ahref.innerText = dictionary[lang].new_vessel_ahref_innerText;

    let team_a_div = document.createElement("div");
    team_a_div.className = "team_div team_a";
    team_a_div.setAttribute("id","team_a");
    team_a_div.appendChild(new_vessel_ahref.cloneNode(true));
    team_a_div.lastChild.addEventListener("click",function (event) {
        new_vessel(event, this);
    });
    team_vessels["team_a"] = [];

    let team_b_div = document.createElement("div");
    team_b_div.className = "team_div team_b";
    team_b_div.setAttribute("id","team_b");
    team_b_div.appendChild(new_vessel_ahref.cloneNode(true));
    team_b_div.lastChild.addEventListener("click",function (event) {
        new_vessel(event, this);
    });
    team_vessels["team_b"] = [];

    document.body.appendChild(team_a_div);
    document.body.appendChild(team_b_div);
}