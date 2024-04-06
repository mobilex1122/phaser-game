export default class {
    /**
     * LDTK Phaser importer
     * @version 0.0.1a
     * @param {Object} ldtkObject Parsed LDTK json
     */
    constructor(ldtkObject) {
        this.ldtkObject = ldtkObject
        this.levelMappings = {}
        if (ldtkObject.levels != undefined) {
            ldtkObject.levels.forEach((el,index) => {
                this.levelMappings[el.identifier] = index
            });
        } else {
            throw new LDTKVarNotFound("levels")
        }

        console.dir(this.levelMappings)
    }
    /**
     * Gets Level data
     * @param {string} name Name of the level. Example: "Level_0"
     * @returns {LDTKLevel}
     */
    getLevel(name) {
        if (this.levelMappings[name] != undefined) {
            if (this.ldtkObject.levels) {
                return new LDTKLevel(this.ldtkObject.levels[this.levelMappings[name]])
            } else {
                throw new LDTKVarNotFound("levels")
            }
        } else {
            throw new LevelNotFound(name)
        }
    }
}

class LevelNotFound extends Error {
    constructor(levelName) {
        super(`Level "${levelName}" was not found in World!`)
    }
}

class LDTKVarNotFound extends Error {
    /**
     * 
     * @param {*} missingVar Missing Variable that should be chacked
     */
    constructor(missingVar) {
        super("Object does not include \"" + missingVar + "\". Is it really LDtk data?")
    }
}

export class LDTKLevel {
    /**
     * General Lavel Data
     * 
     * NOTE: Run only when needed. Hangs if level is large
     * @param {*} levelData 
     */
    constructor(levelData) {
        this.levelData = levelData
        this.layerMapping = {}
        if (levelData.layerInstances) {
            // TODO: Layer name mappping
            console.dir(levelData.layerInstances)
        } else {
            throw new LDTKVarNotFound("layerInstances")
        }
    }

    AutoTileToMapData() {
        // TODO: Convert AutoTile to Map Object in Phaser
    }
}