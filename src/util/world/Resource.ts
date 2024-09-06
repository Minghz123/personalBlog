import Loader from '../Loader.ts';

export default class Resource {
  items: any;
  loader: Loader;
  ready: boolean;
  constructor() {
    this.items = {};
    this.ready = false;
    this.loader = new Loader({ resources: this.items });
    this.loader.load(
      [
        // Matcaps
        { name: 'matcapBeige', source: 'texture/beige.png', type: 'texture' },
        { name: 'matcapBlack', source: 'texture/black.png', type: 'texture' },
        { name: 'matcapOrange', source: 'texture/orange.png', type: 'texture' },
        { name: 'matcapRed', source: 'texture/red.png', type: 'texture' },
        { name: 'matcapWhite', source: 'texture/white.png', type: 'texture' },
        { name: 'matcapGreen', source: 'texture/green.png', type: 'texture' },
        { name: 'matcapBrown', source: 'texture/brown.png', type: 'texture' },
        { name: 'matcapGray', source: 'texture/gray.png', type: 'texture' },
        {
          name: 'matcapEmeraldGreen',
          source: 'texture/emeraldGreen1.png',
          type: 'texture',
        },
        {
          name: 'matcapDeepGreen',
          source: 'texture/emeraldGreen.png',
          type: 'texture',
        },
        { name: 'matcapPurple', source: 'texture/purple.png', type: 'texture' },
        { name: 'matcapBlue', source: 'texture/blue.png', type: 'texture' },
        {
          name: 'matcapDeepBlue',
          source: 'texture/deepBlue.png',
          type: 'texture',
        },
        { name: 'matcapYellow', source: 'texture/yellow.png', type: 'texture' },
        { name: 'matcapMetal', source: 'texture/metal.png', type: 'texture' },
        { name: 'keyEnter', source: 'texture/keyEnter.png', type: 'texture' },
        { name: 'textEnter', source: 'texture/enter.png', type: 'texture' },
        { name: 'brick', source: 'models/base.glb' },
        { name: 'chassis', source: 'models/car/chassis.glb' },
        { name: 'wheel', source: 'models/car/wheel.glb' },
        { name: 'arrowKey', source: 'models/arrowKey/base1.glb' },
        { name: 'treeAndRock', source: 'models/treeAndRock/tr.glb' },
        {
          name: 'treeAndRockCollision',
          source: 'models/treeAndRock/treeAndRockCollision.glb',
        },
        {
          name: 'reactLogo',
          source: 'models/logo/reactlogo.glb',
        },
        {
          name: 'vueLogo',
          source: 'models/logo/vue.glb',
        },
        {
          name: 'nodeLogo',
          source: 'models/logo/nodeLogo.glb',
        },
        {
          name: 'tsLogo',
          source: 'models/logo/tsLogo.glb',
        },
        {
          name: 'nestLogo',
          source: 'models/logo/nestLogo.glb',
        },
        {
          name: 'jsLogo',
          source: 'models/logo/jsLogo.glb',
        },
        {
          name: 'stair',
          source: 'models/stair/base.glb',
        },
        {
          name: 'tilesA',
          source: 'models/tiles/a/base.glb',
        },
        {
          name: 'tilesACollision',
          source: 'models/tiles/a/collision.glb',
        },
        {
          name: 'tilesB',
          source: 'models/tiles/b/base.glb',
        },
        {
          name: 'tilesC',
          source: 'models/tiles/c/base.glb',
        },
        {
          name: 'tilesD',
          source: 'models/tiles/d/base.glb',
        },
        {
          name: 'tilesE',
          source: 'models/tiles/e/base.glb',
        },
        {
          name: 'castle',
          source: 'models/castle/base.glb',
        },
        {
          name: 'castleCollision',
          source: 'models/castle/collision.glb',
        },
        {
          name: 'mac',
          source: 'models/mac/base.glb',
        },
        {
          name: 'macCollision',
          source: 'models/mac/collision.glb',
        },
        {
          name: 'tower',
          source: 'models/tower/base.glb',
        },
        {
          name: 'towerCollision',
          source: 'models/tower/collision.glb',
        },
        {
          name: 'drink',
          source: 'models/little/drink.glb',
        },
        {
          name: 'books',
          source: 'models/little/books.glb',
        },
        // { name: 'matcapGold', source: './models/matcaps/gold.png', type: 'texture' },
      ],
      // ,
      // (_resource, _data) => {
      //   console.log(_data);
      //   this.items[_resource.name] = _data;

      //   // Texture
      //   if (_resource.type === "texture") {
      //     const texture = new THREE.Texture(_data);

      //     // const texture = a

      //     texture.needsUpdate = true;

      //     this.items[`${_resource.name}Texture`] = texture;
      //   }

      //   // Trigger progress
      //   // trigger("progress", [loader.loaded / loader.toLoad]);
      // }
    );
    let timer = setInterval(() => {
      if (this.loader.loading == 0) {
        this.ready = true;
        clearInterval(timer);
      }
    }, 500);

    // loader.on("fileEnd", (_resource, _data) => {
    //     this.items[_resource.name] = _data;

    //     // Texture
    //     if (_resource.type === "texture") {
    //         const texture = new THREE.Texture(_data);
    //         texture.needsUpdate = true;

    //         this.items[`${_resource.name}Texture`] = texture;
    //     }

    //     // Trigger progress
    //     // trigger("progress", [loader.loaded / loader.toLoad]);
    // });
  }
}
