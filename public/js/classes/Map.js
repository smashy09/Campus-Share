
class Map {
    constructor(scene, key, tileSetName, bgKey, bgLayerName, blockedLayerName) {
        this.scene = scene; // scene this map belongs to
        this.key = key; // tiled JSON file key name
        this.bgKey = bgKey
        this.titleSetName = tileSetName; // tiled tileset image key name
        this.bgLayerName = bgLayerName; // the name of the layer for background
        this.blockedLayerName = blockedLayerName;// name for layer of wall
        this.createMap();
    }

    createMap() {
        
        //create tile map
        this.map = this.scene.make.tilemap({key: this.key});
       // add tileset image . use the tileset name, key of the image, etc

        // this.tiles = this.map.addTilesetImage("BCITA-tileset", 'background', 32, 32, 0, 0);
        this.tiles = this.map.addTilesetImage(this.tileSetName, this.bgKey, 32, 32, 0, 0);
        //create background layer
        this.backgroundLayer = this.map.createStaticLayer(this.bgLayerName, this.tiles, 0,0);
        this.backgroundLayer.setScale(2);

        this.wallLayer = this.map.createStaticLayer(this.blockedLayerName, this.tiles, 0, 0);
        this.wallLayer.setScale(2);
        this.wallLayer.setCollisionByExclusion([-1]);


        this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;
        this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;

        //limit camera view
        this.scene.cameras.main.setBounds(0,0, this.map.widthInPixels * 2, this.map.heightInPixels * 2)

    }
}
