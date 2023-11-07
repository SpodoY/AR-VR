
export const create_ork = function (positiom) {

    const orcScale = "0.0075 " //scale for case and ork
    // const orcScale = "0.8 " for mage -> issues when clicking (actually you have to hit arm)
    //general issue if you point at one point of the six -> it hits automatically without even clicking


    var ork = document.createElement("a-entity");

    ork.setAttribute("mixin", "ork")
    ork.setAttribute("position", positiom)
    ork.setAttribute("scale", orcScale.repeat(3))

    ork.classList.add("ork")

    return ork

}