export const create_mage = function (positiom) {

    //const mageScale = "0.8" mage -- general issue if you point at one point of the six -> it hits automatically without even clicking
    const mageScale = "0.0655 " //mage2 + mage3  -- mage3 looks better
    //const mageScale = "0.7 "



    var mage = document.createElement("a-entity");

    mage.setAttribute("mixin", "mage")
    mage.setAttribute("position", positiom)
    mage.setAttribute("scale", mageScale.repeat(3))

    mage.classList.add("mage")
    return mage

}