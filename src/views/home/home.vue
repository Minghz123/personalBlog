<template>
  <!-- <canvas id="canvasDom" ref="canvasDom" style="margin-left: 100px; margin-top:200px;"></canvas> -->
  <div class="swiper">
    <canvas id="canvasDom" ref="canvasDom"></canvas>
    <!-- <swiper
      direction="vertical"
      :mousewheel="(true as undefined)"
      :slidesPerView="1"
      :pagination="({ type: 'bullets', clickable: true } as undefined)"
      :scrollbar="({ draggable: true } as undefined)"
      :space-between="0"
      :modules="modules"
      @mouseenter="enter"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide class="swiperItem">
        <div class="firstpage">
          <h3 class="title">这里是简历</h3>
          <div class="content">
            <div class="three">
              <canvas id="canvasDom" ref="canvasDom"></canvas>
            </div>
            <div class="two">
              <h3>two</h3>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="swiperItem"> nihao2 </swiper-slide>
      <swiper-slide class="swiperItem"> nihao3 </swiper-slide>
    </swiper> -->
  </div>
</template>

<script setup lang="ts">
import { toRaw, onMounted, onUnmounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import 'swiper/css';
import 'swiper/less/navigation';
import 'swiper/less/pagination';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules';
import Base from '@/util/Base';
import * as THREE from 'three';
import jsontext from 'three/examples/fonts/optimer_bold.typeface.json';
// import jsontext from '@/assets/font/font.json'
// import Ammo from "ammojs-typed";
import AreaFenceGeometry from '@/util/Geometries/AreaFenceGeometry.js';
import AreaFenceMaterial from '@/util/materials/AreaFence.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { useRouter } from 'vue-router';

let modules = [Autoplay, Navigation, Pagination, Scrollbar, A11y, Mousewheel];
//定义swiperNew,目的获取非响应式swiper
let swiperNew: any;
const canvasDom = ref(null);
let base = null;
let controls = null;
const raycaster = new THREE.Raycaster();
const needhover = [];
let mainfence;
const router = useRouter();
window.addEventListener('mousemove', mouseListen);

onMounted(() => {
  if (!Ammo.btTransform) {
    Ammo().then((AmmoLib) => {
      Ammo = AmmoLib;
      base = new Base(canvasDom.value, window.innerWidth, document.getElementById('app').offsetHeight, 0xf49f0a);
      base.addAmbientLight(0.75);
      base.camera.position.set(9.56, 13.45, 18.5);
      createObjects();
      controls = new OrbitControls(base.camera, base.renderer.domElement);
      controls.enabled = false;
      update();
      console.log(base);
    });
  } else {
    base = new Base(canvasDom.value, window.innerWidth, document.getElementById('app').offsetHeight, 0xf49f0a);
    base.addAmbientLight(0.75);
    base.camera.position.set(9.56, 13.45, 18.5);
    createObjects();
    controls = new OrbitControls(base.camera, base.renderer.domElement);
    controls.enabled = false;
    update();
    console.log(base);
  }
});
function mouseListen(event) {
  base.mouse.x = ((event.clientX - canvasDom.value.offsetLeft) / base.sizes?.width) * 2 - 1;
  base.mouse.y = -((event.clientY - canvasDom.value.offsetTop) / base.sizes?.height) * 2 + 1;
}
const update = () => {
  requestAnimationFrame(update);
  tick();
  base.update();
  controls.update();
};
const clock = new THREE.Clock();
const tick = () => {
  base.time.elapsed = Date.now() - base.time.start;
  // const elapsedTime = clock.getElapsedTime()
  mainfence.material.uniforms.uTime.value = base.time.elapsed * 5;
  createRay();
};

// const createLine = () => {
//   // const points1 = [
//   //     new THREE.Vector3(-30, 2.5, -20),
//   //     new THREE.Vector3(-30, 2.5, 15),
//   // ];
//   // const points2 = [
//   //     new THREE.Vector3(-30, 2.5, 15),
//   //     new THREE.Vector3(30, 2.5, 15),
//   // ]

//   // const points3 = [new THREE.Vector3(30, 2.5, 15),
//   // new THREE.Vector3(30, 2.5, -20)]
//   // const points4 = [new THREE.Vector3(30, 2.5, -20),
//   // new THREE.Vector3(-30, 2.5, -20),]
//   const colors = [];
//   const points = [-30, 2.5, -20, -30, 2.5, 15, 30, 2.5, 15, 30, 2.5, -20, -30, 2.5, -20];
//   for (let i = 0; i < points.length; i++) {
//     colors.push(0, 0, 0);
//   }
//   // // 三维样条曲线
//   const geometry = new LineGeometry();
//   // const pointsArr = curve.getSpacedPoints(100); //曲线取点
//   geometry.setFromPoints(points); //pointsArr赋值给顶点位置属性
//   // const pos = geometry.attributes.position;
//   // const count = pos.count; //顶点数量
//   // // 计算每个顶点的颜色值
//   // const colorsArr = [];
//   // for (let i = 0; i < count; i++) {
//   //     const percent = i / count; //点索引值相对所有点数量的百分比
//   //     //根据顶点位置顺序大小设置颜色渐变
//   //     // 红色分量从0到1变化，蓝色分量从1到0变化
//   //     colorsArr.push(percent, 0, 1 - percent); //蓝色到红色渐变色
//   // }
//   // //类型数组创建顶点颜色color数据
//   // const colors = new Float32Array(colorsArr);
//   // // 设置几何体attributes属性的颜色color属性
//   // geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
//   // const material = new THREE.LineBasicMaterial({
//   //     vertexColors: true, //使用顶点颜色渲染
//   // });
//   // const line = new THREE.Line(geometry, material);
//   const material = new LineMaterial({
//     color: 0xff0000,
//     linewidth: 15,
//   });

//   geometry.setFromPoints(points);
//   geometry.setColors(colors);
//   material.resolution.set(window.innerWidth, window.innerHeight);
//   // const geometry = new THREE.BufferGeometry().setFromPoints(points);
//   let line = new Line2(geometry, material);
//   // line.computeLineDistances();
//   base.scene.add(line);

//   // geometry.setFromPoints(points2);
//   // line = new THREE.LineSegments(geometry, material);
//   // base.scene.add(line)
//   // geometry.setFromPoints(points3);
//   // line = new THREE.LineSegments(geometry, material);
//   // base.scene.add(line)
//   // geometry.setFromPoints(points4);
//   // line = new THREE.LineSegments(geometry, material);
//   // base.scene.add(line)
// };
let bor = new THREE.Group();
const createFloorLine = () => {
  const points = [-5, 0.5, -2.5, -5, 0.5, 2, 5, 0.5, 2, 5, 0.5, -2.5, -5, 0.5, -2.5];

  // line2方式
  const colors = [];
  for (let i = 0; i < points.length; i++) {
    colors.push(1, 1, 0);
  }

  const material = new LineMaterial({
    color: 0xfcc99a,
    linewidth: 5,
  });
  material.resolution.set(base.sizes.width, base.sizes.height);
  const geometry = new LineGeometry();

  geometry.setPositions(points);
  geometry.setColors(colors);

  const line = new Line2(geometry, material);
  line.userData.color = material.color;
  line.userData.y = 2.5;
  needhover.push(line);
  line.position.z = 3;
  // line.computeLineDistances();      //计算需要的距离
  base.scene.add(line);
};
// let floorborder;
// const createBorder = () => {
//   const geometry = new AreaFloorBorderGeometry(halfExtents.x * 2, halfExtents.y * 2, 0.25);
//   const material = new AreaFloorBordereMaterial();
//   material.uniforms.uColor.value = new THREE.Color(0xffffff);
//   material.uniforms.uAlpha.value = 0.5;
//   material.uniforms.uLoadProgress.value = 1;
//   material.uniforms.uProgress.value = 1;
//   const mesh = new THREE.Mesh(geometry, material);
//   mesh.matrixAutoUpdate = false;
//   mesh.position.y = 20;
//   base.scene.add(mesh);
//   floorborder = mesh;
//   bor.add(mesh);
// };
let halfExtents = {
  x: 10.1,
  y: 4.7,
};
const createFence = () => {
  // Set up
  let fence: any = {};
  // let fence1: any = {}
  fence.depth = 1;
  fence.offset = 0.5;

  // Geometry
  fence.geometry = new AreaFenceGeometry(halfExtents.x, halfExtents.y, fence.depth);
  // fence1.geometry = new AreaFenceGeometry(halfExtents.x, halfExtents.y, fence.depth)
  // Material
  // fence.material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.5 })
  fence.material = new AreaFenceMaterial();
  fence.material.uniforms.uBorderAlpha.value = 0.5;
  fence.material.uniforms.uStrikeAlpha.value = 0.25;

  // fence1.material = new AreaFenceMaterial()
  // fence1.material.uniforms.uBorderAlpha.value = 0.5
  // fence1.material.uniforms.uStrikeAlpha.value = 0.25

  // Mesh
  fence.mesh = new THREE.Mesh(fence.geometry, fence.material);
  fence.mesh.position.z = -fence.depth;
  fence.mesh.position.y = -3;
  // fence1.mesh = new THREE.Mesh(fence1.geometry, fence1.material)
  // fence1.mesh.position.z = -1

  base.scene.add(fence.mesh);
  // base.scene.add(fence1.mesh)
  mainfence = fence;
  bor.add(fence.mesh);
};

const bcd = () => {
  // createBorder()
  createFence();
  // createMouseMesh()
  bor.rotateX(-Math.PI / 2);
  bor.position.z = -0.5;
  // bor.position.x = -1
  base.scene.add(bor);
};

const createMouseMesh = () => {
  let mouseMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 30, 1, 1),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
  );
  mouseMesh.position.z = -0.01;
  mouseMesh.matrixAutoUpdate = false;
  mouseMesh.updateMatrix();
  base.scene.add(mouseMesh);
};
let container = new THREE.Object3D();
// const createKey = () => {
//     let key: any = {}
//     key.hiddenZ = 1.5
//     key.shownZ = 2.5

//     // Container
//     key.container = new THREE.Object3D()
//     key.container.position.z = key.hiddenZ
//     container.add(key.container)

//     // Enter
//     key.enter = {}
//     key.enter.size = 1.4
//     key.enter.geometry = new THREE.PlaneGeometry(key.enter.size, key.enter.size / 4, 1, 1)

//     key.enter.texture = resources.items.areaEnterTexture
//     key.enter.texture.magFilter = THREE.NearestFilter
//     key.enter.texture.minFilter = THREE.LinearFilter

//     key.enter.material = new THREE.MeshBasicMaterial({ color: 0xffffff, alphaMap: key.enter.texture, transparent: true, opacity: 0, depthWrite: false })

//     key.enter.mesh = new THREE.Mesh(key.enter.geometry, key.enter.material)
//     key.enter.mesh.rotation.x = Math.PI * 0.5
//     key.enter.mesh.position.x = key.enter.size * 0.75
//     key.enter.mesh.matrixAutoUpdate = false
//     key.enter.mesh.updateMatrix()
//     key.container.add(key.enter.mesh)

//     // Icon
//     key.icon = {}
//     key.icon.size = 0.75
//     key.icon.geometry = new THREE.PlaneGeometry(key.icon.size, key.icon.size, 1, 1)

//     key.icon.texture = resources.items.areaKeyEnterTexture
//     key.icon.texture.magFilter = THREE.NearestFilter
//     key.icon.texture.minFilter = THREE.LinearFilter

//     key.icon.material = new THREE.MeshBasicMaterial({ color: 0xffffff, alphaMap: key.icon.texture, transparent: true, opacity: 0, depthWrite: false })

//     key.icon.mesh = new THREE.Mesh(key.icon.geometry, key.icon.material)
//     key.icon.mesh.rotation.x = Math.PI * 0.5
//     key.icon.mesh.position.x = - key.enter.size * 0.15
//     key.icon.mesh.matrixAutoUpdate = false
//     key.icon.mesh.updateMatrix()
//     key.container.add(key.icon.mesh)
// }

window.addEventListener('click', function clickStart(event) {
  const intersects = raycaster.intersectObjects(needhover);
  if (intersects.length > 0) {
    router.push('/introduction');
  }
});

const createRay = () => {
  // const rayOrigin = new THREE.Vector3(-5, 0, 0)
  // const rayDirection = new THREE.Vector3(1, 0, 0)
  // rayDirection.normalize()
  raycaster.setFromCamera(base.mouse, base.camera);

  // const intersect = raycaster.intersectObject(base.scene.children[2])

  // intersect.forEach((item) => {
  //     item.object.material.color.set('#0000ff')
  // })

  const intersects = raycaster.intersectObjects(needhover);
  if (intersects.length > 0) {
    // gsap.killTweensOf(floorborder.material.uniforms.uAlpha)
    gsap.killTweensOf(mainfence.material.uniforms.uBorderAlpha);
    canvasDom.value?.classList.add('canvas');
    gsap.to(bor.position, {
      y: 2.0,
      duration: 0.5,
      ease: 'back.out',
      yoyo: true,
    });
    // gsap.fromTo(floorborder.material.uniforms.uAlpha, { value: 1 }, { value: 0.5, duration: 1.5 })
    gsap.fromTo(mainfence.material.uniforms.uBorderAlpha, { value: 1 }, { value: 0.5, duration: 1.5 });
  } else {
    canvasDom.value?.classList.remove('canvas');
    if (bor.position.y > -0.1) {
      gsap.to(bor.position, {
        y: -0.1,
        duration: 0.5,
        ease: 'back.out',
        yoyo: true,
      });
    }
  }
  // for (const intersect of intersects) {
  //     intersect.object.position.y = 10
  //     // intersect.object.userData.color = JSON.parse(JSON.stringify(intersect.object.material.color))
  //     // intersect.object.material.color.set('#0000ff')

  // }

  // for (const object of needhover) {
  //     if (!intersects.find(intersect => intersect.object === object)) {
  //         object.position.y = object.userData.y
  //         // object?.material?.color.set(object.userData.color.r, object.userData.color.g, object.userData.color.b)
  //     }
  // }
};
const createObjects = () => {
  createplane();
  // createCube()
  createText();
  // createLine()
  createFloorLine();
  bcd();
};

const resize = () => {
  base.resize();
};

const createText = () => {
  const loader = new FontLoader();
  const font = loader.parse(jsontext);
  // loader.load("@/assets/font/font.json", function (font) {
  const myGeometry = new TextGeometry('START', {
    font: font,
    size: 1,
    depth: 0,
  });

  // 计算当前几何体的范围  (边界框)
  myGeometry.computeBoundingBox();
  // 计算字母  (几何体) 当前中心的偏移量，以确保字母位于其边界框的中心位置
  const myOffsetX = (myGeometry.boundingBox.max.x - myGeometry.boundingBox.min.x) / 2;
  const myOffsetY = (myGeometry.boundingBox.max.y - myGeometry.boundingBox.min.y) / 2;

  // 创建一个基本材质，设置其颜色为蓝色  (0x0000ff是蓝色的十六进制代码)
  const myMaterial = new THREE.MeshBasicMaterial({ color: 0xfffffa });

  // 使用几何体和材质创建一个新的网格  (Mesh) 对象，即字母模型  (这里是字母"three.js")
  const myTextMesh = new THREE.Mesh(myGeometry, myMaterial);

  // 设置字母模型的位置，使其位于其几何体的中心点  (即边界框的中心)
  myTextMesh.position.x = myGeometry.boundingBox.min.x - myOffsetX;
  myTextMesh.position.y = myGeometry.boundingBox.min.y + myOffsetY;
  myTextMesh.position.z = 3;
  myTextMesh.rotateX(-Math.PI / 2);
  myTextMesh.userData.color = myMaterial.color;
  myTextMesh.userData.y = myTextMesh.position.y;
  needhover.push(myTextMesh);
  base.scene.add(myTextMesh);
  // });
};
const cubeList = [];
const createCube = () => {
  for (let i = 0; i < 3; i++) {
    let geo = new THREE.BoxGeometry(5, 5, 5);
    let mat = base.createMaterial();

    let mesh = new THREE.Mesh(geo, mat);
    mesh.position.x = i * 20;
    mesh.position.y = 3;
    cubeList.push(mesh);
    base.scene.add(mesh);
  }
};
const createplane = () => {
  let geo = new THREE.PlaneGeometry(10, 4.5);
  let geo1 = new THREE.PlaneGeometry(30, 100);
  const pos = geo.attributes.position;
  const count = pos.count; //顶点数量
  // 计算每个顶点的颜色值
  const colorsArr = [];
  for (let i = 0; i < count; i++) {
    const percent = i / count; //点索引值相对所有点数量的百分比
    //根据顶点位置顺序大小设置颜色渐变
    // 红色分量从0到1变化，蓝色分量从1到0变化
    colorsArr.push(percent, 0, 1 - percent); //蓝色到红色渐变色
  }
  //类型数组创建顶点颜色color数据
  const colors = new Float32Array(colorsArr);
  // 设置几何体attributes属性的颜色color属性
  // geo.attributes.color = new THREE.BufferAttribute(colors, 3);

  let mat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
  let mat1 = new THREE.MeshBasicMaterial({ color: 0xf49f0a });
  mat.opacity = 0;
  mat.transparent = true;
  let mesh = new THREE.Mesh(geo, mat);
  let mesh1 = new THREE.Mesh(geo1, mat1);
  // mesh.userData.color = new THREE.BufferAttribute(colors, 3);
  mesh.position.y = 0.5;
  mesh.position.z = 3;
  mesh1.position.z = 3;
  mesh1.position.y = 0.4;
  mesh.rotateX(-Math.PI / 2);
  mesh1.rotateX(-Math.PI / 2);
  needhover.push(mesh);
  base.scene.add(mesh);
  base.scene.add(mesh1);
};

//鼠标移入
const enter = () => {
  // swiperNew.autoplay.stop();
};
//鼠标移出
const leave = () => {
  swiperNew.autoplay.start();
};
const onSwiper = (swiper: any) => {
  // console.log(swiper);

  swiperNew = toRaw(swiper); //拿到swiper对象再转换为非响应式
};
const onSlideChange = () => {
  // console.log("slide change");
};

window.addEventListener('resize', resize);

onUnmounted(() => {
  // Ammo = null;
  // base = null;
  window.removeEventListener('mousemove', mouseListen);
});
</script>

<style scoped lang="less">
@import '@/assets/styles/animate.min.css';

.swiper {
  //   margin-top: 300px;
  width: 100vw;
  height: 100vh;

  img {
    width: 1200px;
    height: 500px;
  }

  .swiperItem {
    .firstpage {
      height: 100%;
      width: 100%;
      .flex-mode(column);

      .content {
        width: 100%;
        height: 70%;
        .flex-mode(row);

        .three {
          width: 100%;
          height: 100%;
          .flex-mode(column);
          .br(); //background-color: antiquewhite;

          .canvas {
            cursor: pointer;
          }
        }

        .two {
          width: 100%;
          height: 100%;
          .flex-mode(column);

          .br(blue); //background-color: aquamarine;
        }
      }
    }
  }
}

:deep(.swiper-pagination) .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background-color: skyblue;
}

:deep(.swiper-pagination-bullet) {
  //修改分页器圆点大小
  width: 14px;
  height: 14px;
  background-color: #fff;
}

.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
:deep(.swiper-pagination-horizontal.swiper-pagination-bullets) .swiper-pagination-bullet {
  // 分页器远点之间的距离
  margin: 0 20px;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: rgb(229, 180, 127);
}
</style>
