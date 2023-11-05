
export const create_ork = function (positiom) {

    var ork = document.createElement("a-entity");

    ork.setAttribute("mixin", "ork")
    ork.setAttribute("position", positiom)
    ork.setAttribute("scale", "0.005 0.005 0.005")

    ork.classList.add("ork")

    return ork

}