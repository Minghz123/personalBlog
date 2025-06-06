import MatcapMaterial from "@/util/materials/Matcap.js";
import * as THREE from "three";
export default class Material {
  shades: any;
  resources: any;
  items: any;
  pures: any;
  constructor(_options) {
    this.resources = _options.resources;
    this.setShades();
    this.setPures();
  }

  setPures() {
    // Setup
    this.pures = {};
    this.pures.items = {};
    this.pures.items.red = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.pures.items.red.name = "pureRed";
    this.pures.items.white = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.pures.items.white.name = "pureWhite";
    this.pures.items.yellow = new THREE.MeshBasicMaterial({ color: 0xffe889 });
    this.pures.items.yellow.name = "pureYellow";
  }
  setShades() {
    // Setup
    this.shades = {};
    this.items = {};
    this.shades.items = {};
    this.shades.indirectColor = "#d04500";

    this.shades.uniforms = {
      uRevealProgress: 0,
      uIndirectDistanceAmplitude: 1.75,
      uIndirectDistanceStrength: 0.5,
      uIndirectDistancePower: 2.0,
      uIndirectAngleStrength: 1.5,
      uIndirectAngleOffset: 0.6,
      uIndirectAnglePower: 1.0,
      uIndirectColor: null,
    };

    // White
    this.shades.items.white = new MatcapMaterial();
    this.shades.items.white.name = "shadeWhite";
    this.shades.items.white.uniforms.matcap.value =
      this.resources.items.matcapWhiteTexture;
    this.items.white = this.shades.items.white;

    // Orange
    this.shades.items.orange = new MatcapMaterial();
    this.shades.items.orange.name = "shadeOrange";
    this.shades.items.orange.uniforms.matcap.value =
      this.resources.items.matcapOrangeTexture;
    this.items.orange = this.shades.items.orange;

    // Green
    this.shades.items.green = new MatcapMaterial();
    this.shades.items.green.name = "shadeGreen";
    this.shades.items.green.uniforms.matcap.value =
      this.resources.items.matcapGreenTexture;
    this.items.green = this.shades.items.green;

    // Brown
    this.shades.items.brown = new MatcapMaterial();
    this.shades.items.brown.name = "shadeBrown";
    this.shades.items.brown.uniforms.matcap.value =
      this.resources.items.matcapBrownTexture;
    this.items.brown = this.shades.items.brown;

    // Gray
    this.shades.items.gray = new MatcapMaterial();
    this.shades.items.gray.name = "shadeGray";
    this.shades.items.gray.uniforms.matcap.value =
      this.resources.items.matcapGrayTexture;
    this.items.gray = this.shades.items.gray;

    // Beige
    this.shades.items.beige = new MatcapMaterial();
    this.shades.items.beige.name = "shadeBeige";
    this.shades.items.beige.uniforms.matcap.value =
      this.resources.items.matcapBeigeTexture;
    this.items.beige = this.shades.items.beige;

    // Red
    this.shades.items.red = new MatcapMaterial();
    this.shades.items.red.name = "shadeRed";
    this.shades.items.red.uniforms.matcap.value =
      this.resources.items.matcapRedTexture;
    this.items.red = this.shades.items.red;

    // Black
    this.shades.items.black = new MatcapMaterial();
    this.shades.items.black.name = "shadeBlack";
    this.shades.items.black.uniforms.matcap.value =
      this.resources.items.matcapBlackTexture;
    this.items.black = this.shades.items.black;

    // Green emerald
    this.shades.items.emeraldGreen = new MatcapMaterial();
    this.shades.items.emeraldGreen.name = "shadeEmeraldGreen";
    this.shades.items.emeraldGreen.uniforms.matcap.value =
      this.resources.items.matcapEmeraldGreenTexture;
    this.items.emeraldGreen = this.shades.items.emeraldGreen;

    // DeepGreen
    this.shades.items.deepGreen = new MatcapMaterial();
    this.shades.items.deepGreen.name = "shadeDeepGreen";
    this.shades.items.deepGreen.uniforms.matcap.value =
      this.resources.items.matcapDeepGreenTexture;
    this.items.deepGreen = this.shades.items.deepGreen;

    // Purple
    this.shades.items.purple = new MatcapMaterial();
    this.shades.items.purple.name = "shadePurple";
    this.shades.items.purple.uniforms.matcap.value =
      this.resources.items.matcapPurpleTexture;
    this.items.purple = this.shades.items.purple;

    // Blue
    this.shades.items.blue = new MatcapMaterial();
    this.shades.items.blue.name = "shadeBlue";
    this.shades.items.blue.uniforms.matcap.value =
      this.resources.items.matcapBlueTexture;
    this.items.blue = this.shades.items.blue;

    // DeepBlue
    this.shades.items.deepBlue = new MatcapMaterial();
    this.shades.items.deepBlue.name = "shadeDeepBlue";
    this.shades.items.deepBlue.uniforms.matcap.value =
      this.resources.items.matcapDeepBlueTexture;
    this.items.deepBlue = this.shades.items.deepBlue;

    // Yellow
    this.shades.items.yellow = new MatcapMaterial();
    this.shades.items.yellow.name = "shadeYellow";
    this.shades.items.yellow.uniforms.matcap.value =
      this.resources.items.matcapYellowTexture;
    this.items.yellow = this.shades.items.yellow;

    // Metal
    this.shades.items.metal = new MatcapMaterial();
    this.shades.items.metal.name = "shadeMetal";
    this.shades.items.metal.uniforms.matcap.value =
      this.resources.items.matcapMetalTexture;
    this.items.metal = this.shades.items.metal;

    // // Gold
    // this.shades.items.gold = new MatcapMaterial()
    // this.shades.items.gold.name = 'shadeGold'
    // this.shades.items.gold.uniforms.matcap.value = resources.items.matcapGoldTexture
    // items.gold = this.shades.items.gold

    // Update materials uniforms
    this.shades.updateMaterials = () => {
      this.shades.uniforms.uIndirectColor = new THREE.Color(
        this.shades.indirectColor
      );

      // Each uniform
      for (const _uniformName in this.shades.uniforms) {
        const _uniformValue = this.shades.uniforms[_uniformName];

        // Each material
        for (const _materialKey in this.shades.items) {
          const material = this.shades.items[_materialKey];
          material.uniforms[_uniformName].value = _uniformValue;
        }
      }
    };

    this.shades.updateMaterials();
  }
}
