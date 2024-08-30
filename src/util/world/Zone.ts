import * as THREE from "three";
import AreaFloorBorderGeometry from "@/util/Geometries/AreaFloorBorderGeometry.js";
import AreaFenceGeometry from "@/util/Geometries/AreaFenceGeometry.js";
import AreaFenceMaterial from "@/util/materials/AreaFence.js";
import AreaFloorBordereMaterial from "@/util/materials/AreaFloorBorder.js";
import gsap from "gsap";
export default class Zone {
  fence: any;
  keys: any;
  base: any;
  halfExtents: { x: number; y: number };
  bor: THREE.Group;
  isIn: boolean;
  car: any;
  position: THREE.Vector3;
  callback: Function;
  constructor(_options: { base; halfExtents; car; position; callback }) {
    this.base = _options.base;
    this.halfExtents = _options.halfExtents;
    this.bor = new THREE.Group();
    this.isIn = false;
    this.car = _options.car;
    this.setFence();
    this.setBoard();
    this.setKeys();
    this.bor.rotateX(-Math.PI / 2);
    this.callback = _options.callback;
    this.position = new THREE.Vector3(
      _options.position.x,
      _options.position.y,
      _options.position.z
    );
    this.bor.position.set(
      _options.position.x,
      _options.position.y,
      _options.position.z
    );

    // gsap.to(this.fence.position, {
    //   duration: 0.5,
    //   z: _options.position.z + 3,
    // });
    // bor.position.x = -1
    this.base.scene.add(this.bor);
    window.addEventListener("keydown", (e) => {
      // this.updateTime();
      if (this.isIn && e.code == "Enter") this.callback();
    });
  }

  setFence() {
    // const createFence = () => {
    // Set up
    let fence: any = {};
    // let fence1: any = {}
    fence.depth = 1;
    fence.offset = 0.5;

    // Geometry
    fence.geometry = new AreaFenceGeometry(
      this.halfExtents.x,
      this.halfExtents.y,
      fence.depth
    );
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
    // fence.mesh.position.y = -3
    // fence1.mesh = new THREE.Mesh(fence1.geometry, fence1.material)
    // fence1.mesh.position.z = -1

    // this.base.scene.add(fence.mesh);
    // base.scene.add(fence1.mesh)
    // mainfence = fence
    this.bor.add(fence.mesh);
    this.fence = fence;
  }

  setBoard() {
    const geometry = new AreaFloorBorderGeometry(
      this.halfExtents.x,
      this.halfExtents.y,
      0.25
    );
    const material = new AreaFloorBordereMaterial();
    material.uniforms.uColor.value = new THREE.Color(0xffffff);
    material.uniforms.uAlpha.value = 0.5;
    material.uniforms.uLoadProgress.value = 1;
    material.uniforms.uProgress.value = 1;
    const mesh = new THREE.Mesh(geometry, material);
    mesh.matrixAutoUpdate = false;
    mesh.position.y = 20;
    // this.base.scene.add(mesh);
    // floorborder = mesh
    this.bor.add(mesh);
  }

  setKeys() {
    let keys = new THREE.Group();
    let geometry = new THREE.PlaneGeometry(1.4, 1.4, 1, 1);

    let texture = this.base.resources.items.keyEnterTexture;
    texture.magFilter = THREE.NearestFilter;
    texture.miniFilter = THREE.LinearFilter;
    let material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      // side: THREE.DoubleSide,
      alphaMap: texture,
      depthWrite: false,
      //   magFilter: THREE.NearestFilter,
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -1.4;
    mesh.rotateX(Math.PI / 2);
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    keys.add(mesh);

    let text = new THREE.PlaneGeometry(1.4, 0.5, 1, 1);
    let texture1 = this.base.resources.items.textEnterTexture;
    texture1.magFilter = THREE.NearestFilter;
    texture1.miniFilter = THREE.LinearFilter;
    let material1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      alphaMap: texture1,
      depthWrite: false,
      //   magFilter: THREE.NearestFilter,
    });
    let mesh1 = new THREE.Mesh(text, material1);
    mesh1.position.z = -1.2;
    mesh1.position.x = mesh.position.x + 1.6;
    mesh1.rotateX(Math.PI / 2);
    mesh.matrixAutoUpdate = false;
    mesh1.updateMatrix();
    keys.add(mesh1);

    this.keys = keys;
    this.bor.add(keys);
  }

  updateTime() {
    this.fence.material.uniforms.uTime.value = this.base.time.elapsed * 5;
    // .material.uniforms.uTime.value = this.base.time.elapsed * 5
    const isIn =
      Math.abs(this.car.position.x - this.position.x) <
        Math.abs(this.halfExtents.x / 2) &&
      Math.abs(this.car.position.z - this.position.z) <
        Math.abs(this.halfExtents.y / 2);
    // console.log(
    //   isIn,
    //   this.car.position,
    //   this.position,
    //   Math.abs(this.car.position.x - this.position.x) <
    //     Math.abs(this.halfExtents.x)
    // );
    if (isIn !== this.isIn) {
      if (isIn) {
        this.isIn = true;
        gsap.to(this.fence.mesh.position, {
          duration: 0.5,
          ease: "back.out(4)",
          z: this.position.y + 3,
        });
        gsap.to(this.keys.position, {
          duration: 0.5,
          ease: "back.out(4)",
          z: this.position.y + 5,
        });
        this.keys.children.forEach((item) => {
          gsap.to(item.material, {
            duration: 0.5,
            opacity: 1,
          });
        });
      } else {
        this.isIn = false;
        gsap.to([this.fence.mesh.position, this.keys.position], {
          duration: 0.5,
          ease: "back.in(4)",
          z: this.position.y - 2,
        });
        this.keys.children.forEach((item) => {
          gsap.to(item.material, {
            duration: 0.5,
            opacity: 0,
          });
        });
      }
    }
  }
}
