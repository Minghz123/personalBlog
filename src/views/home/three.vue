<template>
  <div class="mask" v-show="!vehicleReady"></div>
  <div v-show="vehicleReady" class="canvas">
    <canvas ref="canvasRef" id="canvasDom"></canvas>
  </div>
</template>

<script setup lang="ts">
import Base from '@/util/Base';
import * as THREE from 'three';
// import MatcapMaterial from '@/util/materials/Matcap.js'
import FloorMaterial from '@/util/materials/Floor.js';
import { onMounted, onUnmounted, ref } from 'vue';
// import Ammo from 'ammojs-typed';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { FontData, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import jsontext from '@/assets/font/heiti.json';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import gsap from 'gsap';
import Zone from '@/util/world/Zone';

const canvasRef = ref(null);
let base;
let controls;
let transformAux;

const clock = new THREE.Clock();
const loader = new FontLoader();
// @ts-ignore
const font = loader.parse(jsontext);
let angle = new THREE.Vector3(0.135, 1.45, 1.15);

onMounted(() => {
  if (!Ammo.btTransform) {
    Ammo().then((AmmoLib) => {
      Ammo = AmmoLib;
      transformAux = new Ammo.btTransform();
      base = new Base(canvasRef.value, window.innerWidth, document.getElementById('app').offsetHeight, 0xaaaaaa);

      controls = new OrbitControls(base.camera, base.renderer.domElement);
      base.addAmbientLight(0.7);
      base.camera.position.set(0, 20, 50);
      setDirLight();
      // initPhysics()
      createObjects();

      update();
      // })

      console.log(base);
    });
  } else {
    transformAux = new Ammo.btTransform();
    base = new Base(canvasRef.value, window.innerWidth, document.getElementById('app').offsetHeight, 0xaaaaaa);

    controls = new OrbitControls(base.camera, base.renderer.domElement);
    base.addAmbientLight(0.7);
    base.camera.position.set(0, 200, 50);
    setDirLight();
    // initPhysics()
    createObjects();
    update();
  }
});

const setDirLight = () => {
  let dir = base.addDirLight(0.5);
  dir.castShadow = true;
  dir.position.set(9, 20, -15);

  const d = 100;
  dir.shadow.camera.top = d;
  dir.shadow.camera.bottom = -d;
  dir.shadow.camera.left = -d;
  dir.shadow.camera.right = d;
  dir.shadow.camera.near = 0.1;
  dir.shadow.camera.far = 100;
  // 阴影贴图的宽度和高度。值必须是2的幂。默认值为512。越大阴影贴图越清晰，但性能消耗也越高。
  dir.shadow.mapSize.x = 2048;
  dir.shadow.mapSize.y = 2048;

  dir.shadow.bias = -0.003; // 阴影贴图偏差，避免出现斑驳的阴影
};

const createObjects = () => {
  createPlane1();

  createAllText();

  let timer = setInterval(() => {
    if (base.ready) {
      createnewBrick();
      creatLowWall();
      createArrowKeys();
      createVehicle(new THREE.Vector3(0, 3, 50), new THREE.Quaternion(0, 2 * Math.PI, 0, 1));
      createTreeAndRock();
      createLogoTree();
      createTiles();
      createCastle();
      createZone();
      createmac();
      createTower();
      clearInterval(timer);
      gsap.to(angle, {
        delay: 0.5,
        duration: 2,
        x: 0.5,
        y: 0.5,
        z: -0.5,
        yoyo: true,
        repeat: 1,
      });
    }
  }, 3000);
};

const createTower = () => {
  let mesh = base.add(
    {
      base: base.resources.items.tower.scene,
      position: new THREE.Vector3(0, 0, -42),
      scale: new THREE.Vector3(0.05, 0.05, 0.05),
      rotation: new THREE.Vector3(0, -Math.PI / 2, 0),
      needPhysics: true,
      mass: 0,
      spring: 1,
    },
    base.resources.items.towerCollision.scene,
  );

  // let quat = new THREE.Quaternion(0, 0, 0, 1);
  // quat.setFromEuler(new THREE.Euler(0, -Math.PI / 2, 0, 'XYZ'));
  // createPhysicsBoxObject(3, 10, 3, 0, 0, mesh.position, quat, mesh);
  // base.scene.add(mesh);
};

const createmac = () => {
  const video = document.createElement('video');
  video.src = 'video/haqimi.mp4';
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.play();
  const videoTexture = new THREE.VideoTexture(video);
  base.resources.items.mac.scene.traverse((item) => {
    // console.log(item.name);
    if (item.name == 'mac-screen') {
      item.material = new THREE.MeshBasicMaterial({
        map: videoTexture,
        transparent: true,
      });
    }
  });
  base.add(
    {
      base: base.resources.items.mac.scene,
      position: new THREE.Vector3(-5, 2, -36),
      scale: new THREE.Vector3(1.5, 1.5, 1.5),
      rotation: new THREE.Vector3(0, (Math.PI * 3) / 4, 0),
      needPhysics: true,
      mass: 100,
      spring: 1,
    },
    base.resources.items.macCollision.scene,
  );
  let drinkScale = new THREE.Vector3(2, 2, 2);
  let mesh = base.add({
    base: base.resources.items.drink.scene,
    position: new THREE.Vector3(-3, 2, -36),
    scale: drinkScale,
    rotation: new THREE.Vector3(0, 0, 0),
    needPhysics: false,
    mass: 100,
    spring: 1,
  });
  createPhysicsBoxObject(
    (0.5 * drinkScale.x) / 2,
    (0.5 * drinkScale.z) / 1.5,
    (0.5 * drinkScale.y) / 2,
    100,
    0.5,
    new THREE.Vector3(-3, 2, -36),
    new THREE.Quaternion(0, 0, 0, 1),
    mesh,
  );
};

let halfExtents = { x: 10.1, y: 4.7 };

let zoneList = [];
const createZone = () => {
  zoneList.push(
    new Zone({
      base: base,
      halfExtents: halfExtents,
      car: chassisMesh,
      position: new THREE.Vector3(30, 0.1, -22.5),
      callback: () => {
        window.open('https://cephalon.cloud/#/aigc', '_blank');
      },
    }),
  );
};

const createStair = (position: THREE.Vector3 = new THREE.Vector3(0, 0, 0)) => {
  let mesh = base.add({
    base: base.resources.items.stair.scene,
    position,
    scale: new THREE.Vector3(2, 2, 2),
    rotation: new THREE.Vector3(-Math.PI / 2, 0, 0),
    needPhysics: true,
    mass: 0,
    spring: 1,
  });

  mesh.children.forEach((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });

  let shadowplane = new THREE.PlaneGeometry(10, 10);
  let m = new THREE.ShadowMaterial();
  // let m = base.createMaterial()
  m.opacity = 0.2;
  let mesh1 = new THREE.Mesh(shadowplane, m);
  mesh1.position.set(mesh.position.x, mesh.position.y, mesh.position.z);
  mesh1.castShadow = true;
  mesh1.receiveShadow = true;
  mesh1.rotateX(-Math.PI / 2);
  base.scene.add(mesh1);
};

const createBottomRing = (
  position: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
  delay: number = 0,
  scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1),
  cpos: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
) => {
  for (let i = 0; i < 3; i++) {
    const geometry = new THREE.RingGeometry(1, 1.1, 32);
    let material = new THREE.MeshPhysicalMaterial({ color: 0xaaaaff, side: THREE.DoubleSide, roughness: 0 });
    material = base.materials.items.blue;
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.1, 0.1, 0.1);
    let s = scale.y > 0.1 ? scale.y : 1;
    mesh.position.set(position.x + cpos.x, cpos.y + position.y - 3 * s + 0.3 * s * i, cpos.z + position.z);
    mesh.rotateX(-Math.PI / 2);

    gsap.to(mesh.scale, {
      delay: delay + i * 0.3,
      duration: 2, // 动画持续时间
      x: 1, // x轴缩放值
      y: 1, // y轴缩放值
      z: 1, // z轴缩放值
      ease: 'power1.inOut', // 缓动函数
      yoyo: true, // 反向播放动画
      repeat: -1, // 无限重复动画
      onRepeat: () => {
        // 在每次重复时调用的函数
        // 可以在这里添加任何逻辑，例如改变方向或速度
      },
    });

    base.scene.add(mesh);
  }
};

const createLogoTree = () => {
  let container = new THREE.Group();
  let cpos = new THREE.Vector3(0, 2, 5);
  container.position.set(cpos.x, cpos.y, cpos.z);

  const LogoList = [
    {
      base: base.resources.items.reactLogo.scene,
      position: new THREE.Vector3(0 - 3, 0 + 3, 2),
      scale: new THREE.Vector3(0.1, 0.1, 0.1),
      rotation: new THREE.Quaternion(0, 0, 0, 1),
      needPhysics: false,
      mass: 0,
      spring: 1,
    },
    {
      base: base.resources.items.vueLogo.scene,
      position: new THREE.Vector3(0, 0 + 4.5, 0),
      scale: new THREE.Vector3(1.5, 1.5, 1.5),
      rotation: new THREE.Vector3(0, -Math.PI / 2, 0),
      needPhysics: false,
      mass: 0,
      spring: 1,
    },
    {
      base: base.resources.items.nodeLogo.scene,
      position: new THREE.Vector3(0 + 3, 0 + 5, -2),
      scale: new THREE.Vector3(1, 1, 1),
      rotation: new THREE.Vector3(0, 0, 0),
      needPhysics: false,
      mass: 0,
      spring: 1,
    },
    {
      base: base.resources.items.tsLogo.scene,
      position: new THREE.Vector3(0 - 3, 0 + 5, -1),
      scale: new THREE.Vector3(1, 1, 1),
      rotation: new THREE.Vector3(0, 0, 0),
      needPhysics: false,
      mass: 0,
      spring: 1,
    },
    {
      base: base.resources.items.nestLogo.scene,
      position: new THREE.Vector3(0, 0 + 6, -3.5),
      scale: new THREE.Vector3(0.1, 0.1, 0.1),
      rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
      needPhysics: false,
      mass: 0,
      spring: 1,
    },
    {
      base: base.resources.items.jsLogo.scene,
      position: new THREE.Vector3(0 + 3, 0 + 3, 3),
      scale: new THREE.Vector3(0.1, 0.1, 0.1),
      rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
      needPhysics: false,
      mass: 0,
      spring: 1,
    },
  ];
  for (let item of LogoList) {
    let mesh = base.add(item);
    let delay = Math.random() * 2;
    mesh.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
    gsap.to(mesh.position, {
      delay,
      duration: 2,
      x: item.position.x,
      y: item.position.y - 1.8,
      z: item.position.z,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: Infinity,
    });
    createBottomRing(mesh.position, delay, item.scale, cpos);
    container.add(mesh);
  }

  createStair(container.position);
  base.scene.add(container);
};

const createTreeAndRock = () => {
  let arr = [
    new THREE.Vector3(1, 0.55, 52),
    new THREE.Vector3(-20, 0.55, 0),
    new THREE.Vector3(30, 0.55, 15),
    new THREE.Vector3(40, 0.55, 45),
    new THREE.Vector3(40, 0.55, -45),
  ];
  for (let item of arr) {
    let mesh = base.add(
      {
        base: base.resources.items.treeAndRock.scene,
        position: item,
        scale: new THREE.Vector3(2, 2, 2),
        rotation: new THREE.Vector3(0, (Math.floor(Math.random() * 2 - 1) * Math.PI) / 2, 0),
        needPhysics: true,
        mass: 0,
        spring: 1,
      },
      base.resources.items.treeAndRockCollision.scene,
    );
  }
};

const createCastle = () => {
  base.add(
    {
      base: base.resources.items.castle.scene,
      position: new THREE.Vector3(0.2, -1, -18),
      scale: new THREE.Vector3(0.3, 0.3, 0.3),
      rotation: new THREE.Vector3(0, 0, 0),
      needPhysics: true,
      mass: 0,
      spring: 1,
    },
    base.resources.items.castleCollision.scene,
  );
  let mesh = base.add({
    base: base.resources.items.books.scene,
    position: new THREE.Vector3(-6, 2, -20),
    scale: new THREE.Vector3(1, 1, 1),
    rotation: new THREE.Vector3(0, 0, 0),
    needPhysics: false,
    mass: 0,
    spring: 1,
  });
  createPhysicsBoxObject(3, 2, 2, 100, 0.5, new THREE.Vector3(-7, 2, -24), new THREE.Quaternion(0, 0, 0, 1), mesh);
};
const createTiles = () => {
  let tiles = [
    base.resources.items.tilesB.scene,
    base.resources.items.tilesA.scene,
    base.resources.items.tilesC.scene,
    base.resources.items.tilesD.scene,
  ];
  for (let i = 1; i <= 4; i++) {
    base.add(
      {
        base: tiles[Math.floor(Math.random() * 3.5)],
        position: new THREE.Vector3(0, 0, 50 - i * 2),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Vector3(-Math.PI / 2, 0, (Math.PI * (Math.random() - 0.5)) / 8),
        needPhysics: false,
        mass: 0,
        spring: 1,
      },
      base.resources.items.tilesACollision.scene,
    );
    base.add(
      {
        base: tiles[Math.floor(Math.random() * 3.5)],
        position: new THREE.Vector3(0, 0, 42 - i * 5),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Vector3(-Math.PI / 2, 0, (Math.PI * (Math.random() - 0.5)) / 8),
        needPhysics: false,
        mass: 0,
        spring: 1,
      },
      base.resources.items.tilesACollision.scene,
    );
  }
  // 个人履历的
  for (let i = 1; i <= 4; i++) {
    base.add(
      {
        base: tiles[1],
        position: new THREE.Vector3(-0.5, 0, -12 - i * 2),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Vector3(-Math.PI / 2, 0, (Math.PI * (Math.random() - 0.5)) / 8),
        needPhysics: false,
        mass: 0,
        spring: 1,
      },
      base.resources.items.tilesACollision.scene,
    );
    base.add(
      {
        base: tiles[1],
        position: new THREE.Vector3(0.5, 0, -12 - i * 2 - 1),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Vector3(-Math.PI / 2, 0, (Math.PI * (Math.random() - 0.5)) / 8),
        needPhysics: false,
        mass: 0,
        spring: 1,
      },
      base.resources.items.tilesACollision.scene,
    );
  }
  for (let i = 1; i <= 5; i++) {
    base.add(
      {
        base: tiles[1],
        position: new THREE.Vector3(-0.5, 0, -24 - i * 2),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Vector3(-Math.PI / 2, 0, (Math.PI * (Math.random() - 0.5)) / 8),
        needPhysics: false,
        mass: 0,
        spring: 1,
      },
      base.resources.items.tilesACollision.scene,
    );
    base.add(
      {
        base: tiles[1],
        position: new THREE.Vector3(0.5, 0, -24 - i * 2 - 1),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Vector3(-Math.PI / 2, 0, (Math.PI * (Math.random() - 0.5)) / 8),
        needPhysics: false,
        mass: 0,
        spring: 1,
      },
      base.resources.items.tilesACollision.scene,
    );
  }
};

const createAllText = () => {
  createText('你好', 0, -1, 40);
  createText('请用      控制小车', 10, -1, 50);
  createText('H 跳跃', 7, -1, 52);
  createText('R 复位', 13, -1, 52);
  createText('Blank 刹车', 8.2, -1, 54);

  createText(`我目前是一名25届的应届生，专注于前端开发领域。`, 0, 0, 35, 0.5);
  createText(`在HTML、CSS、JavaScript方面有扎实的基础，并熟悉vue框架开发流程。`, 0, 0, 30, 0.5);
  createText(`同时也具备一定的后端开发能力，能够熟练使用node.js技术，了解java后台开发。`, 0, 0, 25, 0.5);
  createText(`自己对于3D开发有浓厚的兴趣，熟悉流行的 three.js + ammo.js三维可视化技术。`, 0, 0, 20, 0.5);
  createText(`这是我掌握的技能`, 0, 0, 15);

  createText(`经 历`, 0, 0, -10);
  createText(`个人履历`, 0, 0, -12, 0.5);
  createText(`软件工程`, 7, 0, -25.5, 0.6);
  createText(`东莞理工学院`, 7, 0, -24.5, 0.5);
  createText(`2021.09 - 至今`, 7, 0, -23, 0.5);

  createText(`实习`, 0, 0, -39.5);
  createText(`端脑科技有限公司`, 0, 0, -38.5, 0.5);
  createText(`前端开发实习`, 0, 0, -37.5, 0.6);
  createText(`2023.11 - 2024.6`, 0, 0, -36, 0.5);
  let expriencePos = new THREE.Vector3(30, 0, 0);

  createText(`项目经历`, 0 + expriencePos.x, 0 + expriencePos.y, -10 + expriencePos.z);
  createText(`Cephalon Core`, 0 + expriencePos.x, 0 + expriencePos.y, -17 + expriencePos.z);
  createText(`微信小程序`, 0 + expriencePos.x, 0 + expriencePos.y, -16 + expriencePos.z, 0.5);
  createText(
    `负责: 页面编写、相关组件封装、设备样式适配及接口联调`,
    0 + expriencePos.x,
    0 + expriencePos.y,
    -15 + expriencePos.z,
    0.5,
  );

  createText(`Cephalon Cloud`, 0 + expriencePos.x, 0 + expriencePos.y, -29 + expriencePos.z);
  createText(`web网站`, 0 + expriencePos.x, 0 + expriencePos.y, -28 + expriencePos.z, 0.5);
  createText(`LOOK`, 0 + expriencePos.x, 0 + expriencePos.y, -22 + expriencePos.z);
  createText(
    `负责: 节日活动页面编写、H5 端 web端适配、屏幕大小适配、功能接口联调及页面埋点`,
    0 + expriencePos.x,
    0 + expriencePos.y,
    -27 + expriencePos.z,
    0.5,
  );
};

const createText = (text, x = 0, y = 0, z = 0, size = 1, color = 0xfffffa) => {
  // loader.load("@/assets/font/font.json", function (font) {
  const myGeometry = new TextGeometry(text, {
    font: font,
    size,
    depth: 0,
  });

  // 计算当前几何体的范围  (边界框)
  myGeometry.computeBoundingBox();
  // 计算字母  (几何体) 当前中心的偏移量，以确保字母位于其边界框的中心位置
  const myOffsetX = (myGeometry.boundingBox.max.x - myGeometry.boundingBox.min.x) / 2;
  const myOffsetY = (myGeometry.boundingBox.max.y - myGeometry.boundingBox.min.y) / 2;

  // 创建一个基本材质，设置其颜色为蓝色  (0x0000ff是蓝色的十六进制代码)
  const myMaterial = new THREE.MeshBasicMaterial({ color });

  // 使用几何体和材质创建一个新的网格  (Mesh) 对象，即字母模型  (这里是字母"three.js")
  const myTextMesh = new THREE.Mesh(myGeometry, myMaterial);

  // 设置字母模型的位置，使其位于其几何体的中心点  (即边界框的中心)
  myTextMesh.position.x = myGeometry.boundingBox.min.x - myOffsetX + x;
  myTextMesh.position.y = myGeometry.boundingBox.min.y + myOffsetY + 0.01 + y;
  myTextMesh.position.z = z;
  myTextMesh.rotateX(-Math.PI / 2);
  myTextMesh.userData.color = myMaterial.color;
  myTextMesh.userData.y = myTextMesh.position.y;
  // needhover.push(myTextMesh)
  base.scene.add(myTextMesh);
  // });
};

// 创建单个物体的函数
const createBrick = (width, height, depth, mass, spring, pos, quat, mat) => {
  let brick = new THREE.BoxGeometry(width, height, depth);
  let mesh = new THREE.Mesh(brick, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  base.scene.add(mesh);
  createPhysicsBoxObject(width, height, depth, mass, spring, pos, quat, mesh);
  return mesh;
};

const createWalls = () => {
  for (let i = 0; i <= 1; i++) {
    for (let j = 0; j <= 0; j++) {
      if (j <= 4)
        createBrick(
          2,
          1,
          2,
          1,
          0.5,
          new THREE.Vector3(j * 2 + 12, i * 2 + 10, 0),
          new THREE.Quaternion(),
          base.createMaterial(),
        );
      else
        createBrick(
          2,
          1,
          2,
          1,
          0.5,
          new THREE.Vector3((j - 4) * 2 - 1 + 12, i * 2 + 1, 0),
          new THREE.Quaternion(),
          base.createMaterial(),
        );
    }
  }
};

const creatLowWall = () => {
  let basepos = new THREE.Vector3(10, 1, 40);
  for (let i = 1; i <= 7; i++) {
    if (i <= 4)
      base.add({
        base: base.resources.items.brick.scene,
        rotation: new THREE.Quaternion(Math.PI / 2, 0, Math.PI / 2, 1),
        position: new THREE.Vector3(basepos.x + i * 2, basepos.y, basepos.z),
        scale: new THREE.Vector3(2, 2, 2),
        needPhysics: true,
        mass: 10,
        spring: 0.2,
      });
    else {
      base.add({
        base: base.resources.items.brick.scene,
        rotation: new THREE.Quaternion(Math.PI / 2, 0, 0, 1),
        position: new THREE.Vector3(basepos.x + 4 * 2 + 0.5, basepos.y, basepos.z + 0.5 - (i - 4) * 2),
        scale: new THREE.Vector3(2, 2, 2),
        needPhysics: true,
        mass: 10,
        spring: 0.2,
      });
    }
  }
  for (let i = 0; i <= 5; i++)
    if (i <= 2)
      base.add({
        base: base.resources.items.brick.scene,
        rotation: new THREE.Quaternion(Math.PI / 2, 0, Math.PI / 2, 1),
        position: new THREE.Vector3(basepos.x + 3 + i * 2 - 0.2, basepos.y + 1.5, basepos.z),
        scale: new THREE.Vector3(2, 2, 2),
        needPhysics: true,
        mass: 10,
        spring: 0.2,
      });
    else {
      base.add({
        base: base.resources.items.brick.scene,
        rotation: new THREE.Quaternion(Math.PI / 2, 0, 0, 1),
        position: new THREE.Vector3(basepos.x + 4 * 2 + 0.5, basepos.y + 1.5, basepos.z + 1.5 - (i - 2) * 2),
        scale: new THREE.Vector3(2, 2, 2),
        needPhysics: true,
        mass: 10,
        spring: 0.2,
      });
    }
};

const createArrowKeys = () => {
  for (let i = 0; i <= 3; i++) {
    let pos = new THREE.Vector3(8.8, 0.5, 49);
    let quat = new THREE.Quaternion();
    let quatY = new THREE.Quaternion();
    quat.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
    switch (i) {
      case 0:
        break;
      case 1:
        pos.set(-0.7 + 8.8, 0.5, 49.7);

        // quat.z = i
        // quat1.setZ(i)
        // quat.y = Math.PI / 3
        quatY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (Math.PI / 2) * i);

        break;

      case 2:
        pos.set(8.8, 0.5, 49.7);
        // quat.z = -1
        // quat.y = Math.PI / 2
        // quat.z = i
        // quat1.setZ(i)
        quatY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (Math.PI / 2) * i);
        // quat.x = -3 * Math.PI / 2
        break;
      case 3:
        pos.set(0.7 + 8.8, 0.5, 49.7);

        // quat.x = -3 * Math.PI / 2
        // quat.z = i
        // quat1.setZ(i)
        quatY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (Math.PI / 2) * i);
        // quat.y = Math.PI / 3
        break;
    }
    quat.multiplyQuaternions(quatY, quat);

    let mesh = base.add({
      base: base.resources.items.arrowKey.scene,
      rotation: quat,
      position: pos,
      scale: new THREE.Vector3(1, 1, 1),
      needPhysics: false,
      mass: 10,
      spring: 0.2,
    });
    // mesh.children.forEach(child => {
    //     child.position.set(0, 0)
    // })
    mesh.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });

    createPhysicsBoxObject(0.75, 0.75, 0.325, 1, 0, pos, quat, mesh);
    base.scene.add(mesh);
    // console.log(mesh.rotation)
    // mesh.userData.body.getWorldTransform(transformAux)
    // let r = transformAux.getRotation()
    // console.log(r.x(), r.y(), r.z(), r.w())
    // transformAux.setRotation(quat1)
    // console.log(quat1.x(), quat1.y(), quat1.z(), quat1.w())

    // mesh.userData.body.setWorldTransform(transformAux)
    // mesh.userData.body.activate()
  }
};

const createnewBrick = async () => {
  for (let i = 0; i <= 4; i++) {
    for (let j = 0; j <= 8; j++) {
      // let res = brickMesh.clone()

      if (j <= 4)
        base.add({
          base: base.resources.items.brick.scene,
          rotation: new THREE.Quaternion(Math.PI / 2, 0, Math.PI / 2, 1),
          position: new THREE.Vector3(j * 2 + 20, i * 2 + 1.5, -5),
          scale: new THREE.Vector3(2, 2, 2),
          needPhysics: true,
          mass: 10,
          spring: 0.2,
        });
      else
        base.add({
          base: base.resources.items.brick.scene,
          rotation: new THREE.Quaternion(Math.PI / 2, 0, Math.PI / 2, 1),
          position: new THREE.Vector3((j - 4) * 2 - 1 + 20, i * 2 + 2.5 - 1.5, -5),
          scale: new THREE.Vector3(2, 2, 2),
          needPhysics: true,
          mass: 10,
          spring: 0.2,
        });
    }
  }
};

var chassisWidth = 1.8;
var chassisHeight = 0.8;
var chassisLength = 3;
var massVehicle = 200;

var wheelAxisPositionBack = -0.7;
var wheelHalfTrackBack = 0.6;
var wheelAxisHeightBack = 0.3;
var wheelRadiusBack = 0.5;
var wheelWidthBack = 0.3;

var wheelAxisFrontPosition = 1;
var wheelHalfTrackFront = 0.6;
var wheelAxisHeightFront = 0.3;
var wheelRadiusFront = 0.5;
var wheelWidthFront = 0.3;

var friction = 5;
var suspensionStiffness = 10;
var suspensionDamping = 0.3;
var suspensionCompression = 4.4;
var suspensionRestLength = 0.17;
var rollInfluence = 0.0;

var steeringIncrement = 0.01;
var steeringClamp = 0.2;
var maxEngineForce = 500;
var maxBreakingForce = 50;
var incEngine = 10.0;

var FRONT_LEFT = 0;
var FRONT_RIGHT = 1;
var BACK_LEFT = 2;
var BACK_RIGHT = 3;

var wheelDirectionCS0;
var wheelAxleCS;
var wheelMeshes = [];
var keysActions = {
  KeyW: 'accelerate',
  KeyS: 'brake',
  KeyA: 'right',
  KeyD: 'left',
  // 空格
  Space: 'braking',
  KeyR: 'reset',
  ArrowUp: 'accelerate',
  ArrowDown: 'brake',
  ArrowLeft: 'right',
  ArrowRight: 'left',
};
var vehicleReady = ref(false);
// @ts-ignore
let chassisMesh, vehicle: Ammo.btRaycastVehicle;
async function createVehicle(pos, quat) {
  wheelDirectionCS0 = new Ammo.btVector3(0, -1, 0);
  wheelAxleCS = new Ammo.btVector3(-1, 0, 0);
  //Going Native
  var physicsWorld = base.physicsWorld;

  var geometry = new Ammo.btBoxShape(new Ammo.btVector3(chassisWidth * 0.5, chassisHeight * 0.5, chassisLength * 0.5));
  var transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  // transform.setOrigin(new Ammo.btVector3(0, 0, 0))
  transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
  var motionState = new Ammo.btDefaultMotionState(transform);
  var localInertia = new Ammo.btVector3(0, 0, 0);
  geometry.calculateLocalInertia(massVehicle, localInertia);

  try {
    // 阻塞直到 createChassisMesh1() 完成
    await createChassisMesh1(pos, quat);
    // 使用返回的结果
    // chassisMesh = res;
  } catch (error) {
    console.error('Error creating chassis mesh:', error);
  }
  // if (!chassisMesh)
  // chassisMesh = createChassisMesh(chassisWidth, chassisHeight, chassisLength);

  var massOffset = new Ammo.btVector3(0, 0.4, 0);
  var transform2 = new Ammo.btTransform();
  transform2.setIdentity();
  transform2.setOrigin(massOffset);
  var compound = new Ammo.btCompoundShape();
  compound.addChildShape(transform2, geometry);

  var body = new Ammo.btRigidBody(
    new Ammo.btRigidBodyConstructionInfo(massVehicle, motionState, compound, localInertia),
  );
  body.setActivationState(4);
  chassisMesh.userData.body = body;
  physicsWorld.addRigidBody(body);

  var tuning = new Ammo.btVehicleTuning();
  var rayCaster = new Ammo.btDefaultVehicleRaycaster(physicsWorld);
  // vehicle = new Ammo.btRaycastVehicle(tuning, body, rayCaster);
  vehicle = new Ammo.btRaycastVehicle(tuning, body, rayCaster);
  vehicle.setCoordinateSystem(0, 1, 2);

  physicsWorld.addAction(vehicle);

  // var trans = vehicle.getChassisWorldTransform();

  function addWheel(isFront, pos, radius, width, index) {
    var wheelInfo = vehicle.addWheel(
      pos,
      wheelDirectionCS0,
      wheelAxleCS,
      suspensionRestLength,
      radius,
      tuning,
      isFront,
    );

    wheelInfo.set_m_suspensionStiffness(suspensionStiffness);
    wheelInfo.set_m_wheelsDampingRelaxation(suspensionDamping);
    wheelInfo.set_m_wheelsDampingCompression(suspensionCompression);
    wheelInfo.set_m_maxSuspensionForce(600000);
    wheelInfo.set_m_frictionSlip(40);
    wheelInfo.set_m_rollInfluence(rollInfluence);

    // wheelMeshes[index] = createWheelMesh(radius, width);
    createWheelMesh1(index);
  }

  addWheel(
    true,
    new Ammo.btVector3(wheelHalfTrackFront, wheelAxisHeightFront, wheelAxisFrontPosition),
    wheelRadiusFront,
    wheelWidthFront,
    FRONT_LEFT,
  );
  addWheel(
    true,
    new Ammo.btVector3(-wheelHalfTrackFront, wheelAxisHeightFront, wheelAxisFrontPosition),
    wheelRadiusFront,
    wheelWidthFront,
    FRONT_RIGHT,
  );
  addWheel(
    false,
    new Ammo.btVector3(-wheelHalfTrackBack, wheelAxisHeightBack, wheelAxisPositionBack),
    wheelRadiusBack,
    wheelWidthBack,
    BACK_LEFT,
  );
  addWheel(
    false,
    new Ammo.btVector3(wheelHalfTrackBack, wheelAxisHeightBack, wheelAxisPositionBack),
    wheelRadiusBack,
    wheelWidthBack,
    BACK_RIGHT,
  );

  vehicleReady.value = true;
}

const createChassisMesh1 = async (position, quaternion) => {
  let res = base.add({
    base: base.resources.items.chassis.scene,
    scale: new THREE.Vector3(1.5, 1.5, 1.5),
    position: position,
    rotation: quaternion,
    needPhysics: false,
  });
  res.children.forEach((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });
  chassisMesh = res;
  // console.log(res)

  // chassisMesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), base.createMaterial())
  // chassisMesh.position.set(20, 3, 5)
  // base.scene.add(chassisMesh)
};

const createWheelMesh1 = async (index) => {
  let res = base.add({
    base: base.resources.items.wheel.scene,
    scale: new THREE.Vector3(1.5, 1.5, 1.5),
    rotation: new THREE.Vector3(0, 0, 0),
    position: new THREE.Vector3(0, 0, 0),
    needPhysics: false,
  });
  res.children.forEach((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });
  wheelMeshes[index] = res;
};

function createWheelMesh(radius, width) {
  //var mesh = new THREE.MeshBuilder.CreateBox("wheel", {width:.82, height:.82, depth:.82}, scene);
  // var mesh = new THREE.MeshBuilder.CreateCylinder("Wheel", { diameter: 1, height: 0.5, tessellation: 6 }, scene);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 18));

  // mesh.rotationQuaternion = new THREE.Quaternion();
  // mesh.rotation.x = Math.PI / 2;
  mesh.material = base.createMaterial();
  base.scene.add(mesh);
  return mesh;
}

function createChassisMesh(w, l, h) {
  // var mesh = new THREE.MeshBuilder.CreateBox("box", { width: w, depth: h, height: l }, scene);
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, l, h));
  // mesh.quaternion = new THREE.Quaternion();
  mesh.material = base.createMaterial();
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  base.scene.add(mesh);
  // var camera = new THREE.FollowCamera("FollowCam", new THREE.Vector3(0, 10, -10), scene);
  // camera.radius = 10;
  // camera.heightOffset = 4;
  // camera.rotationOffset = 0;
  // camera.cameraAcceleration = 0.05;
  // camera.maxCameraSpeed = 400;
  // camera.attachControl(canvas, true);
  // camera.lockedTarget = mesh; //version 2.5 onwards
  // scene.activeCamera = camera;

  return mesh;
}
const createPhysicsPlaneObject = (mass, spring, pos, quat, mesh) => {
  // btStaticPlaneShape(btVector3 planeNormal, float planeConstant) 静态平面构造器，参数planeNormal为平面法向量，planeConstant为平面上任意一点
  let shape = new Ammo.btStaticPlaneShape(new Ammo.btVector3(0, 1, 0), 0);
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
  let motionState = new Ammo.btDefaultMotionState(transform);
  let localInertia = new Ammo.btVector3(0, 0, 0);
  shape.calculateLocalInertia(mass, localInertia);
  let plane = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
  let body = new Ammo.btRigidBody(plane);
  body.setRestitution(spring);
  body.setFriction(0.5);
  // 将生成好的物理模型保存在mesh对象中以备后续更新使用
  mesh.userData.body = body;
  // 将生成好的物体统一收集，进行统一更新

  base.physicsWorld.addRigidBody(body);
};
// let mesh
// 创建无厚度无限大的平面
const createPlane1 = () => {
  let plane = new THREE.PlaneGeometry(2, 2, 10, 10);
  // let mat = new THREE.MeshPhongMaterial({
  //     side: THREE.DoubleSide
  // })
  let colors: any = {};
  // colors.topLeft = '#028090'
  // colors.topRight = '#E4FDE1'
  // colors.bottomRight = '#E4FDE1'
  // colors.bottomLeft = '#F45B69'

  colors.topLeft = '#a2aa44';
  colors.topRight = '#a2aa88';
  colors.bottomRight = '#aaac60';
  colors.bottomLeft = '#727725';

  // colors.topLeft = '#f5883c'
  // colors.topRight = '#ff9043'
  // colors.bottomRight = '#fccf92'
  // colors.bottomLeft = '#f5aa58'

  // Material
  let material = new FloorMaterial();

  const updateMaterial = () => {
    const topLeft = new THREE.Color(colors.topLeft);
    const topRight = new THREE.Color(colors.topRight);
    const bottomRight = new THREE.Color(colors.bottomRight);
    const bottomLeft = new THREE.Color(colors.bottomLeft);

    topLeft.convertLinearToSRGB();
    topRight.convertLinearToSRGB();
    bottomRight.convertLinearToSRGB();
    bottomLeft.convertLinearToSRGB();

    const data = new Uint8Array([
      Math.round(bottomLeft.r * 255),
      Math.round(bottomLeft.g * 255),
      Math.round(bottomLeft.b * 255),
      255,
      Math.round(bottomRight.r * 255),
      Math.round(bottomRight.g * 255),
      Math.round(bottomRight.b * 255),
      255,
      Math.round(topLeft.r * 255),
      Math.round(topLeft.g * 255),
      Math.round(topLeft.b * 255),
      255,
      Math.round(topRight.r * 255),
      Math.round(topRight.g * 255),
      Math.round(topRight.b * 255),
      255,
    ]);

    let backgroundTexture = new THREE.DataTexture(data, 2, 2);
    backgroundTexture.magFilter = THREE.LinearFilter;
    backgroundTexture.needsUpdate = true;

    material.uniforms.tBackground.value = backgroundTexture;
  };

  updateMaterial();
  // material = base.createMaterial()
  let mesh = new THREE.Mesh(plane, material);
  let shadowplane = new THREE.PlaneGeometry(200, 200);
  let m = new THREE.ShadowMaterial();
  // m = base.createMaterial()
  m.opacity = 0.2;
  let mesh1 = new THREE.Mesh(shadowplane, m);

  mesh1.castShadow = true;
  mesh1.receiveShadow = true;
  mesh1.rotateX(-Math.PI / 2);
  base.scene.add(mesh1);

  mesh.frustumCulled = false;
  mesh.matrixAutoUpdate = false;
  mesh.updateMatrix();
  // mesh.castShadow = true
  // mesh.receiveShadow = true
  // mesh.rotateX(-Math.PI / 2)

  base.scene.add(mesh);
  // 创建物理物体
  // createPhysicsPlaneObject(200, 1, 200, 0, 0, new THREE.Vector3(0, 10, 0), new THREE.Quaternion(), mesh)
  createPhysicsPlaneObject(0, 0, mesh.position, new THREE.Quaternion(), mesh);
};

// 创建可控大小的有厚度的平面
const createPlane = () => {
  let plane = new THREE.BoxGeometry(200, 1, 200);
  // let mat = new THREE.MeshPhongMaterial({ color: 0xf5aa58 })
  // Colors
  let colors: any = {};
  // colors.topLeft = '#a03309'
  // colors.topRight = '#aa4012'
  // colors.bottomRight = '#caac60'
  // colors.bottomLeft = '#c27725'

  colors.topLeft = '#f5883c';
  colors.topRight = '#ff9043';
  colors.bottomRight = '#fccf92';
  colors.bottomLeft = '#f5aa58';

  colors.topLeft = '#f5886e';
  colors.topRight = '#a29076';
  colors.bottomRight = '#fccfb5';
  colors.bottomLeft = '#a2aa88';
  // Material
  let material = new FloorMaterial();

  const updateMaterial = () => {
    const topLeft = new THREE.Color(colors.topLeft);
    const topRight = new THREE.Color(colors.topRight);
    const bottomRight = new THREE.Color(colors.bottomRight);
    const bottomLeft = new THREE.Color(colors.bottomLeft);

    topLeft.convertLinearToSRGB();
    topRight.convertLinearToSRGB();
    bottomRight.convertLinearToSRGB();
    bottomLeft.convertLinearToSRGB();

    const data = new Uint8Array([
      Math.round(bottomLeft.r * 255),
      Math.round(bottomLeft.g * 255),
      Math.round(bottomLeft.b * 255),
      255,
      Math.round(bottomRight.r * 255),
      Math.round(bottomRight.g * 255),
      Math.round(bottomRight.b * 255),
      255,
      Math.round(topLeft.r * 255),
      Math.round(topLeft.g * 255),
      Math.round(topLeft.b * 255),
      255,
      Math.round(topRight.r * 255),
      Math.round(topRight.g * 255),
      Math.round(topRight.b * 255),
      255,
    ]);

    let backgroundTexture = new THREE.DataTexture(data, 2, 2);
    backgroundTexture.magFilter = THREE.LinearFilter;
    backgroundTexture.needsUpdate = true;

    material.uniforms.tBackground.value = backgroundTexture;
  };

  // updateMaterial();
  material = new THREE.MeshBasicMaterial({ color: 0x666666 });
  let mesh = new THREE.Mesh(plane, material);
  mesh.frustumCulled = false;
  mesh.matrixAutoUpdate = false;
  mesh.updateMatrix();
  // textureloader.load("texture/grid.png", (texture) => {
  //     texture.wrapS = THREE.RepeatWrapping // 设置水平纹理的平铺模式
  //     texture.wrapT = THREE.RepeatWrapping // 设置垂直纹理的平铺模式
  //     // 纹理在水平和垂直方向的重复次数
  //     texture.repeat.set(40, 40)
  //     mesh.material.map = texture
  //     mesh.material.needsUpdate = true // 告诉threejs，纹理图发生更新
  // })
  mesh.receiveShadow = true;

  let p = new THREE.PlaneGeometry(100, 100);
  let mesh1 = new THREE.Mesh(p, new THREE.MeshBasicMaterial({ color: 0x2f5640 }));
  mesh1.castShadow = true;
  mesh1.receiveShadow = true;
  mesh1.rotateX(-Math.PI / 2);
  base.scene.add(mesh1);
  // base.scene.add(mesh)
  // 创建物理物体
  createPhysicsBoxObject(200, 1, 200, 0, 0, new THREE.Vector3(0, 0, 0), new THREE.Quaternion(), mesh);
};

// 创建盒子的物理实体
const createPhysicsBoxObject = (width, height, depth, mass, spring, pos, quat, mesh) => {
  let shape = new Ammo.btBoxShape(new Ammo.btVector3(width / 2, height / 2, depth / 2));
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
  let motionState = new Ammo.btDefaultMotionState(transform);
  let localInertia = new Ammo.btVector3(0, 0, 0);
  shape.calculateLocalInertia(mass, localInertia);

  let rigid = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);

  let body = new Ammo.btRigidBody(rigid);
  body.setRestitution(spring);
  body.setFriction(0.8);
  // 将生成好的物理模型保存在mesh对象中以备后续更新使用
  mesh.userData.body = body;
  // if (mass > 0) {
  base.meshObjects.push(mesh);

  // }
  // 将生成好的物体统一收集，进行统一更新
  base.physicsWorld.addRigidBody(body);
  // let a = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  // a.position.set(pos.x, pos.y, pos.z);
  // // a.position.y = a.position.y + 0.5 * height
  // base.scene.add(a);
};

const update = () => {
  requestAnimationFrame(update);

  base.update();
  controls.update();
  tick();
};

var engineForce = 0;
var vehicleSteering = 0;
var breakingForce = 0;
let oldPos = new THREE.Vector3(0, 0, 0);
const getdir = (a) => {
  if (a == 0) return 0;
  return a > 0 ? 1 : -1;
};
let oldwatch = new THREE.Vector3(0, 0, 0);
let targetEased = new THREE.Vector3(0, 0, 0);

let easing = 0.15;
let zoom: any = {};
zoom.value = 0.5;
zoom.minDistance = 24;
zoom.amplitude = 25;
zoom.targetValue = 0.5;
zoom.easing = 0.1;
zoom.distance = zoom.minDistance + zoom.amplitude * zoom.value;

const tick = () => {
  let d = clock.getDelta();
  base.time.elapsed = Date.now() - base.time.start;

  base.physicsWorld.stepSimulation(d);
  // 对每一个渲染的网格的位置和旋转根据物理引擎中的位置和旋转进行同步
  base.meshObjects.forEach((item) => {
    let motionState = item.userData.body.getMotionState();

    if (motionState) {
      motionState.getWorldTransform(transformAux);
      let p = transformAux.getOrigin();
      let r = transformAux.getRotation();
      // if (item.userData.name) {
      // console.log(p.x(), p.y(), p.z())
      // }
      item.position.set(p.x(), p.y(), p.z());
      item.quaternion.set(r.x(), r.y(), r.z(), r.w());
      // item.userData.body.applyCentralForce(new Ammo.btVector3(0, 0, 0));
    }
  });

  if (vehicleReady.value) {
    var speed = vehicle.getCurrentSpeedKmHour();
    breakingForce = 0;
    engineForce = 0;

    if (actions.accelerate) {
      if (speed < -1) {
        breakingForce = maxBreakingForce;
      } else {
        engineForce = maxEngineForce;
      }
    } else if (actions.brake) {
      if (speed > 1) {
        breakingForce = maxBreakingForce;
      } else {
        engineForce = -maxEngineForce;
      }
    } else if (actions.braking) {
      breakingForce = maxBreakingForce;
    }

    if (actions.right) {
      if (vehicleSteering < steeringClamp) {
        vehicleSteering += steeringIncrement;
      }
    } else if (actions.left) {
      if (vehicleSteering > -steeringClamp) {
        vehicleSteering -= steeringIncrement;
      }
    } else {
      vehicleSteering = 0;
    }
    vehicle.applyEngineForce(engineForce, FRONT_LEFT);
    vehicle.applyEngineForce(engineForce, FRONT_RIGHT);

    vehicle.setBrake(breakingForce / 2, FRONT_LEFT);
    vehicle.setBrake(breakingForce / 2, FRONT_RIGHT);
    vehicle.setBrake(breakingForce, BACK_LEFT);
    vehicle.setBrake(breakingForce, BACK_RIGHT);

    vehicle.setSteeringValue(vehicleSteering, FRONT_LEFT);
    vehicle.setSteeringValue(vehicleSteering, FRONT_RIGHT);

    var tm, p, q, i;
    var n = vehicle.getNumWheels();
    for (i = 0; i < n; i++) {
      vehicle.updateWheelTransform(i, true);
      tm = vehicle.getWheelTransformWS(i);
      p = tm.getOrigin();
      q = tm.getRotation();
      wheelMeshes[i]?.position.set(p.x(), p.y(), p.z());
      wheelMeshes[i]?.quaternion.set(q.x(), q.y(), q.z(), q.w());
      if (i == 0) {
        wheelMeshes[i]?.rotateZ(Math.PI / 2);
      } else if (i == 1) {
        wheelMeshes[i]?.rotateZ(-Math.PI / 2);
      } else if (i == 2) {
        wheelMeshes[i]?.rotateZ(-Math.PI / 2);
      } else {
        wheelMeshes[i]?.rotateZ(Math.PI / 2);
      }
    }

    tm = vehicle.getChassisWorldTransform();
    p = tm.getOrigin();
    q = tm.getRotation();
    chassisMesh?.position.set(p.x(), p.y(), p.z());
    chassisMesh?.quaternion.set(q.x(), q.y(), q.z(), q.w());
    chassisMesh?.rotateX(-Math.PI / 2);
    chassisMesh?.rotateZ(-Math.PI / 2);
    let curPos = chassisMesh?.position ?? new THREE.Vector3(0, 0, 0);
    let direction = new THREE.Vector3(
      getdir(curPos.x - oldPos.x),
      getdir(curPos.y - oldPos.y),
      getdir(curPos.z - oldPos.z),
    );
    // direction.normalize()

    oldPos.copy(curPos);
    if (!cameraversion) {
      // if (Math.abs(Math.floor(speed * 10)) > 150) {

      //     base.camera.position.set(p.x(), p.y() + 20, p.z() + 25)

      // }
      // base.camera.lookAt(p.x(), p.y(), p.z())

      targetEased.x += (p.x() - targetEased.x) * easing;
      targetEased.y += (p.y() - targetEased.y) * easing;
      targetEased.z += (p.z() - targetEased.z) * easing;
      zoom.value += (zoom.targetValue - zoom.value) * easing;
      zoom.distance = zoom.minDistance + zoom.amplitude * zoom.value;
      base.camera.position.copy(targetEased).add(angle.clone().normalize().multiplyScalar(zoom.distance));
      base.camera.lookAt(targetEased);
    }

    // else {

    // if (Math.abs(Math.floor(speed * 10)) > 100) {

    // base.camera.position.set(p.x() + 5, p.y() + 5, p.z() + 5)

    // // // }

    // // // if (Math.abs(Math.floor(speed * 10)) > 100)

    // base.camera.lookAt(p.x() + (20 * direction.x == 0 ? oldwatch.x : 20 * direction.x), p.y(), p.z() + (20 * direction.z == 0) ? oldwatch.z : 20 * direction.z)
    // oldwatch.set(p.x() + 20 * direction.x == 0 ? oldwatch.x : 20 * direction.x, p.y(), p.z() + 20 * direction.z == 0 ? oldwatch.z : 20 * direction.z)
    // }

    // createRay()
  }
  if (zoneList.length) {
    zoneList.forEach((item) => {
      item.updateTime();
    });
  }
};
var cameraversion = false;
const resize = () => {
  base.resize();
};

var actions = { accelerate: false, brake: false, right: false, left: false, braking: false };
function keyup(e) {
  if (keysActions[e.code]) {
    actions[keysActions[e.code]] = false;
    //e.preventDefault();
    //e.stopPropagation();

    //return false;
  }
}

function keydown(e) {
  if (keysActions[e.code]) {
    actions[keysActions[e.code]] = true;
    //e.preventDefault();
    //e.stopPropagation();

    //return false;
  }
  if (e.code == 'Tab') {
    cameraversion = !cameraversion;
    base.camera.position.set(0, 200, 50);
    e.preventDefault();
  }
  if (e.code == 'KeyR') {
    let origin = new Ammo.btVector3(0, 3 - 1.5, 50);
    let rotation = new Ammo.btQuaternion(0, 2 * Math.PI, 0, 1);
    transformAux.setOrigin(origin);
    transformAux.setRotation(rotation);
    chassisMesh.userData.body.setWorldTransform(transformAux);
    chassisMesh.userData.body.activate();
  }
  if (e.code == 'KeyH') {
    if (chassisMesh.position.y < 3) chassisMesh.userData.body.applyCentralImpulse(new Ammo.btVector3(0, 800, 0));
  }
}

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
window.addEventListener('resize', resize);
onUnmounted(() => {
  // window.removeEventListener('mousemove', mouseListen)
  // base = null;
  // Ammo = null;
  window.removeEventListener('keydown', keydown);
  window.removeEventListener('keyup', keyup);
  window.removeEventListener('resize', resize);
});
</script>

<style scoped>
#canvasDom {
  height: 100vh;
  width: 100vw;
}
.canvas {
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 0;

  overflow: hidden;
}
.mask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background: url('/loading.gif');
  background-size: 100% 100%;
}
</style>
