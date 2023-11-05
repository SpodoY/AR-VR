
// helpfunction to create cordinates
export const createPostion = (x,y,z) => ({
    x,
    y,
    z
})

const frRoCo = 1.2
const brRoCo = -1.2
const height = -0.2

//hardcoded positionArray
export const holePositions =[
    createPostion(2, height, frRoCo),
    createPostion(-2.2, height, frRoCo),
    createPostion(0, height, frRoCo),
    createPostion(2, height,brRoCo),
    createPostion(0, height, brRoCo),
    createPostion(-2.2, height, brRoCo),
]