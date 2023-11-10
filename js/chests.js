
export const create_chest = function (positiom) {


    const chestScale = "0.0075 " //scale for case and chest
    // const orcScale = "0.8 " for mage -> issues when clicking (actually you have to hit arm)
    //general issue if you point at one point of the six -> it hits automatically without even clicking


    var chest = document.createElement("a-entity");

    chest.setAttribute("mixin", "chest")
    chest.setAttribute("position", positiom)
    chest.setAttribute("scale", chestScale.repeat(3))

    chest.classList.add("chest")

    return chest

}