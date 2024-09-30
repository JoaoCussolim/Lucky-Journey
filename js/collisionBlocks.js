const collisionBlocks = []

const putCollisionBlock = ({position = {x: 0, y: 0}, size = 0, name = ''}) => {
    const collisionBlock = {position: position, size: size, name: name}
    collisionBlocks.push(collisionBlock)
}