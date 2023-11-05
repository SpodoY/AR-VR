
export const create_ork = function (positiom) {

    const orcScale = "0.0075 "

    var ork = document.createElement("a-entity");

    ork.setAttribute("mixin", "ork")
    ork.setAttribute("position", positiom)
    ork.setAttribute("scale", orcScale.repeat(3))

    ork.classList.add("ork")

    return ork

}