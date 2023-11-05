
// helpfunction to create cordinates
export const createPostion = (x,y,z) => ({
    x,
    y,
    z
})

//hardcoded positionArray
export const holePositions =[
    createPostion(1, 0, 0.5),
    createPostion(0, 0, 0.5),
    createPostion(-1, 0, 0.5),
    createPostion(-1, 0, -0.5),
    createPostion(0, 0, -0.5),
    createPostion(1, 0, -0.5),
]