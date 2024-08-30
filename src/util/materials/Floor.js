import * as THREE from "three";

import shaderFragment from "../shaders/floor/fragment.glsl";
import shaderVertex from "../shaders/floor/vertex.glsl";

export default function () {
  const uniforms = {
    tBackground: { value: null },
    shadowMap: { value: null }, // 阴影贴图
    lightMatrix: { value: new THREE.Matrix4() }, // 光源变换矩阵
  };
  let sa = [
    "varying vec2 vUv;",
    "varying vec3 vWorldPosition;",
    THREE.ShaderChunk["common"],
    THREE.ShaderChunk["bsdfs"],
    THREE.ShaderChunk["shadowmap_pars_vertex"],
    "void main() {",
    THREE.ShaderChunk["beginnormal_vertex"],
    THREE.ShaderChunk["defaultnormal_vertex"],

    THREE.ShaderChunk["begin_vertex"],
    THREE.ShaderChunk["project_vertex"],
    THREE.ShaderChunk["worldpos_vertex"],
    THREE.ShaderChunk["shadowmap_vertex"],
    shaderVertex,
    "}",
  ].join("\n");
  let fa = [
    THREE.ShaderChunk["common"],
    THREE.ShaderChunk["packing"],
    THREE.ShaderChunk["bsdfs"],
    THREE.ShaderChunk["lights_pars_begin"],
    THREE.ShaderChunk["shadowmap_pars_fragment"],
    THREE.ShaderChunk["shadowmask_pars_fragment"],
    shaderFragment,
  ].join("\n");
  const material = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib["lights"],
      {
        opacity: { type: "f", value: 1.0 },
        tBackground: { value: null },
        shadowMap: { value: null }, // 阴影贴图
        lightMatrix: { value: new THREE.Matrix4() }, // 光源变换矩阵
      },
    ]),
    wireframe: false,
    transparent: false,
    lights: true,
    // uniforms,
    vertexShader: sa,
    fragmentShader: fa,
  });

  return material;
}
