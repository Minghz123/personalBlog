<template>
  <div class="swiper">
    <!-- <canvas id="canvasDom" ref="canvasDom"></canvas> -->
    <swiper
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
          <h3 class="title">个人介绍</h3>
          <div class="content">
            <div class="three">
              <canvas id="canvasDom" ref="canvasDom"></canvas>
            </div>
            <div class="two">
              <router-link to="/introduction/two">
                <div class="parper">
                  <div class="list">
                    <div class="pic">
                      <div class="head"></div>
                      <div class="body"></div>
                    </div>
                    <div class="line">
                      <div class="lineItem" v-for="i in 4"></div>
                    </div>
                  </div>
                  <div class="pie">
                    <div class="peice1 peice"></div>
                    <div class="peice2 peice"></div>
                    <div class="peice3 peice"></div>
                  </div>
                  <div class="lineBox">
                    <div class="lineBoxItem" v-for="i in 5"></div>
                  </div>
                  <!-- <SvgIcon class="fly" name="fly" width="3.125rem" height="3.125rem" color="hotpink"></SvgIcon> -->
                  <div class="message">
                    <div class="buble">
                      <div class="dotBox">
                        <div class="dot" v-for="i in 3"></div>
                      </div>
                      <div class="tail"></div>
                    </div>
                    <div class="pic">
                      <div class="head"></div>
                      <div class="body"></div>
                    </div>
                  </div>
                  <SvgIcon class="icon2d" name="2D" width="6.25rem" height="6.25rem"></SvgIcon>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- <swiper-slide class="swiperItem"> nihao2 </swiper-slide>
      <swiper-slide class="swiperItem"> nihao3 </swiper-slide> -->
    </swiper>
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
import SvgIcon from '@/components/SvgIcon.vue';
import { Observer } from 'gsap/Observer';

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
  playAnimation();
  if (!Ammo.btTransform) {
    Ammo().then((AmmoLib) => {
      Ammo = AmmoLib;
      base = new Base(canvasDom.value, window.innerWidth / 2, document.getElementById('app').offsetHeight, 0xf49f0a);
      // base = new Base(canvasDom.value, 700, 400, 0xf49f0a);

      base.addAmbientLight(0.75);
      base.camera.position.set(9.56, 13.45, 18.5);
      createObjects();
      controls = new OrbitControls(base.camera, base.renderer.domElement);
      controls.enabled = false;
      update();
      console.log(base);
    });
  } else {
    base = new Base(canvasDom.value, window.innerWidth / 2, document.getElementById('app').offsetHeight, 0xf49f0a);
    // base = new Base(canvasDom.value, 700, 400, 0xf49f0a);
    base.addAmbientLight(0.75);
    base.camera.position.set(9.56, 13.45, 18.5);
    createObjects();
    controls = new OrbitControls(base.camera, base.renderer.domElement);
    controls.enabled = false;
    update();
    console.log(base);
  }
});

const playAnimation = () => {
  let parper, list, icon2d, line, fly, pie, message;
  gsap.registerPlugin(Observer);
  Observer.create({
    target: '.two',
    type: 'wheel, touch, pointer',

    onHover() {
      parper = gsap.to('.parper', {
        scale: 1.2,
        ease: 'bounce',
        duration: 0.5,
        onComplete() {
          list = gsap.to('.list', {
            backgroundColor: 'rgb(247, 94, 170)',
            ease: 'power2.inOut',
            duration: 1,
          });
          icon2d = gsap.to('.icon2d', {
            scale: 1.5,
            fill: 'rgb(212, 33, 33)',
            ease: 'power2.inOut',
            duration: 1,
          });
          line = gsap.to('.lineBoxItem', {
            width: '100%',
            stagger: 0.2,
            ease: 'elastic',
          });
          // fly = gsap.to('.fly', {
          //   x: 220,
          //   y: -120,
          //   ease: 'power.in',
          //   duration: 1,
          // });
          pie = gsap.to('.peice', {
            scale: 1.2,
            rotate: 360,
            duration: 1,
            ease: 'back.out',
          });
          message = gsap.to('.dot', {
            backgroundColor: 'rgb(0, 115, 255)',
            keyframes: [{ y: -10 }, { y: 0 }],
            stagger: 0.1,
            ease: 'bounce',
            duration: 1,
          });
        },
      });
    },
    onHoverEnd() {
      parper.reverse();
      list.reverse();
      icon2d.reverse();
      line.reverse();
      // fly.reverse();
      pie.reverse();
      message.reverse();
    },
  });
};

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
  const myGeometry = new TextGeometry('3 D', {
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
  .canvas {
    cursor: pointer;
  }
  img {
    width: 1200px;
    height: 500px;
  }

  .swiperItem {
    .firstpage {
      height: 100%;
      width: 100%;
      .flex-mode(column);
      .title {
        position: absolute;
        z-index: 2;
        color: #fff;
        font-size: 3rem;
        font-weight: bold;
        top: 5rem;
      }
      .content {
        width: 100%;
        height: 100%;
        .flex-mode(row);

        .three {
          width: 100%;
          height: 100%;
          .flex-mode(column);

          background-color: #f49f0a;
        }

        .three::after {
          position: absolute;
          content: '';
          width: 100px;
          height: 100%;
          left: 50%;
          z-index: 1;
          background-color: #f49f0a;
          transform: translateX(-100%);
          clip-path: polygon(
            0 0,
            80% 0,
            0% 10%,
            80% 20%,
            0% 30%,
            80% 40%,
            0% 50%,
            80% 60%,
            0% 70%,
            80% 80%,
            0% 90%,
            80% 100%,
            0% 100%
          );
          transition: 1s all;
        }
        .three:hover::after {
          z-index: 1;
          transform: translateX(0%);
        }

        .two {
          width: 100%;
          height: 100%;
          .flex-mode(column);
          background-color: cornflowerblue;
          .parper {
            width: 300px;
            height: 450px;
            padding: 1rem;
            background-color: #fff;
            .flex-mode(column);
            position: relative;
            .icon2d {
              fill: rgb(36, 33, 212);
            }
            .list {
              background-color: rgb(33, 106, 252);
              width: 5rem;
              height: 6rem;
              padding: 1rem;
              position: absolute;
              top: 1rem;
              left: 1rem;
              border-radius: 0.5rem;
              .flex-mode(column,space-between);
              gap: 1rem;
              box-shadow: 1rem 1rem 0.2rem rgba(0, 191, 255, 0.248);
              .pic {
                .flex-mode(column);
                transform: scale(1.5);
                .head {
                  width: 0.5rem;
                  height: 0.5rem;
                  border-radius: 50%;
                  background-color: #fff;
                }
                .body {
                  width: 0.75rem;
                  height: 0.5rem;
                  //border-radius: 50%;
                  background-color: #fff;
                  clip-path: ellipse(0.25rem 0.375rem at bottom);
                }
              }
              .line {
                .flex-mode(column);
                width: 3rem;
                gap: 0.5rem;
                .lineItem {
                  background-color: #fff;
                  height: 0.2rem;
                }
                .lineItem:nth-child(1) {
                  width: 100%;
                }
                .lineItem:nth-child(2) {
                  width: 40%;
                }
                .lineItem:nth-child(3) {
                  width: 60%;
                }
                .lineItem:nth-child(4) {
                  width: 100%;
                }
              }
            }
            .pie {
              position: absolute;
              border-radius: 50%;
              width: 100px;
              height: 100px;
              background-color: rgba(0, 0, 0, 0.718);
              box-shadow: 0.5rem 0.5rem 0.2rem rgba(0, 191, 255, 0.248);
              bottom: 1rem;
              right: 1rem;
              .flex-mode();
              .peice {
                border-radius: 50%;
                width: 100px;
                height: 100px;
                clip-path: polygon(70% 0, 100% 0, 100% 30%, 50% 50%);
                position: absolute;
              }
              .peice1 {
                background-color: red;
                clip-path: polygon(70% 0, 100% 0, 100% 30%, 50% 50%);
              }
              .peice2 {
                width: 120px;
                height: 120px;
                background-color: rgb(255, 111, 0);
                clip-path: polygon(100% 20%, 100% 70%, 50% 50%);
              }
              .peice3 {
                width: 120px;
                height: 120px;
                background-color: rgb(0, 115, 255);
                clip-path: polygon(100% 70%, 100% 90%, 50% 50%);
              }
            }
            .lineBox {
              position: absolute;
              right: 1rem;
              top: 2rem;
              width: 7rem;
              .flex-mode(column,center,flex-start);
              gap: 0.5rem;
              .lineBoxItem {
                height: 0.5rem;
                box-shadow: 0.2rem 0.2rem 0.1rem rgba(0, 191, 255, 0.248);
              }
              .lineBoxItem:nth-child(1) {
                background-color: skyblue;
                width: 100%;
              }
              .lineBoxItem:nth-child(2) {
                background-color: hotpink;
                width: 80%;
              }
              .lineBoxItem:nth-child(3) {
                background-color: orange;
                width: 70%;
              }
              .lineBoxItem:nth-child(4) {
                background-color: purple;
                width: 30%;
              }
              .lineBoxItem:nth-child(5) {
                background-color: rgb(9, 128, 0);
                width: 10%;
              }
            }
            // .fly {
            //   position: absolute;
            //   width: 3.125rem;
            //   height: 3.125rem;
            //   top: 60%;
            //   left: 1rem;
            //   transform: translate(0%, -50%);
            // }
            .message {
              position: absolute;
              width: 7rem;
              height: 5rem;
              bottom: 1rem;
              left: 1rem;
              .flex-mode(column);
              gap: 0.5rem;

              .buble {
                width: 70%;
                height: 40%;
                background-color: rgba(62, 37, 203, 0.882);
                padding: 1rem;
                position: relative;
                z-index: 2;
                border-radius: 10%;
                box-shadow: 1rem 1rem 0.2rem rgba(0, 191, 255, 0.248);
                .tail {
                  position: absolute;
                  width: 50%;
                  height: 50%;
                  top: 100%;
                  left: 30%;
                  background-color: rgba(62, 37, 203, 0.882);
                  clip-path: polygon(0 0, 70% 0, 100% 80%);
                }
                .dotBox {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 2;
                  .flex-mode(row,space-around);
                  .dot {
                    width: 15%;
                    height: 40%;
                    border-radius: 50%;
                    background-color: #fff;
                  }
                }
              }
              .pic {
                .flex-mode(column);
                align-self: flex-end;
                transform: translateX(-1rem) scale(1.5);

                .head {
                  width: 0.5rem;
                  height: 0.5rem;
                  border-radius: 50%;
                  background-color: #ff00bf;
                }
                .body {
                  width: 0.75rem;
                  height: 0.5rem;
                  //border-radius: 50%;
                  background-color: #1e00ff;
                  clip-path: ellipse(0.25rem 0.375rem at bottom);
                  box-shadow: 0.2rem 0.2rem 0.1rem rgba(0, 191, 255, 0.248);
                }
              }
            }
          }
        }
        .two::before {
          position: absolute;
          content: '';
          width: 100px;
          height: 100%;
          left: 50%;
          z-index: 1;
          background-color: cornflowerblue;
          clip-path: polygon(
            100% 0,
            80% 0,
            0% 10%,
            80% 20%,
            0% 30%,
            80% 40%,
            0% 50%,
            80% 60%,
            0% 70%,
            80% 80%,
            0% 90%,
            80% 100%,
            100% 100%
          );
          transition: 1s all;
        }
        .two:hover::before {
          z-index: 1;

          transform: translateX(-99%);
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
