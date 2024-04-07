//import Phaser from "phaser";
export default class {
    /**
     * LDTK Phaser importer
     * @version 0.0.1a
     * @param {Object} ldtkObject Parsed LDTK json
     */
    constructor(ldtkObject) {
        console.log("📥 LDtk Loader v0.0.1a");
        this.ldtkObject = ldtkObject;
        this.levelMappings = {};
        if (ldtkObject.levels != undefined) {
            console.warn("World indexing started!");
            ldtkObject.levels.forEach((el,index) => {
                this.levelMappings[el.identifier] = index;
            });
            console.warn("World indexing done!");
        } else {
            throw new LDTKVarNotFound("levels");
        }

        console.dir(this.levelMappings);
    }
    /**
     * Gets Level data
     * @param {string} name Name of the level. Example: "Level_0"
     * @returns {LDTKLevel}
     */
    getLevel(name) {
        if (this.levelMappings[name] != undefined) {
            if (this.ldtkObject.levels) {
                return new LDTKLevel(this.ldtkObject.levels[this.levelMappings[name]]);
            } else {
                throw new LDTKVarNotFound("levels");
            }
        } else {
            throw new LevelNotFound(name);
        }
    }
}

export class LDTKLevel {
    /**
     * General Lavel Data
     * 
     * NOTE: Run only when needed. Hangs process if level is large
     * @param {*} levelData 
     */
    constructor(levelData) {
        this.levelData = levelData;
        this.layerMapping = {};
        if (levelData.layerInstances != undefined) {
            levelData.layerInstances.forEach((l,i)=> {
                this.layerMapping[l.__identifier] = i;
            });
        } else {
            throw new LDTKVarNotFound("layerInstances");
        }
    }

    IntAutoTileToMapData(layerID) {
        // TODO: Convert AutoTile to Map Object in Phaser
        // Check if layer exists in the mapping
        if (this.layerMapping[layerID] == undefined) {
            throw new LDTKVarNotFound(layerID);
        }
        const layer = this.levelData.layerInstances[this.layerMapping[layerID]];
        // Check if layer is the correct type
        if (layer.__type != "IntGrid") {
            throw new LDTKWrongTypeLayer(layer.__type, "IntGrid");
        }

        //if (layer.autoLayerTiles != undefined) {
        //    let layerData = new Phaser.Tilemaps.MapData()
        //}
    }
}

// Error Types
class LevelNotFound extends Error {
    constructor(levelName) {
        super(`Level "${levelName}" was not found in World!`);
    }
}

class LDTKVarNotFound extends Error {
    /**
     * 
     * @param {*} missingVar Missing Variable that should be chacked
     */
    constructor(missingVar) {
        super("Object does not include \"" + missingVar + "\". Is it really LDtk data?");
    }
}

class LDTKWrongTypeLayer extends Error {
    constructor(type,expects) {
        super(`Layer convert error! Wrong type (${type}) expected (${expects})`);
    }
}