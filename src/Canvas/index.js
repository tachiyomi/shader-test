import * as THREE from 'three';

import mainVertexSource from './shaders/main.vert';
import mainFragmentSource from './shaders/main.frag';

import postVertexSource from './shaders/post.vert';
import postFragmentSource from './shaders/post.frag';

export default class Canvas {
  constructor() {
    //this.w = window.innerWidth;
    //this.h = window.innerHeight;
    this.w = 1000;
    this.h = 1000;

    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.setSize(this.w, this.h);
    //this.renderer.setPixelRatio(window.devicePixelRatio);

    const container = document.getElementById('canvas');
    container.appendChild(this.renderer.domElement);

    this.mainCamera = new THREE.PerspectiveCamera(50, this.w / this.h, 0.1, 1000);

    this.mainScene = new THREE.Scene();

    const mainGeometry = new THREE.BoxGeometry(10, 10, 10);
    //const mainGeometry = new THREE.SphereGeometry(8, 32, 32);
    this.mainUniforms = {
      uLightPos: {
        value: new THREE.Vector3(0.0, 0.0, 0.1)
      }
    };
    const mainMaterial = new THREE.ShaderMaterial({uniforms: this.mainUniforms, vertexShader: mainVertexSource, fragmentShader: mainFragmentSource});
    //const mainMaterial = new THREE.MeshLambertMaterial({color: 0x3e60d4});
    this.mainMesh = new THREE.Mesh(mainGeometry, mainMaterial);
    this.mainMesh.position.z = -50;
    //this.mainMesh.material.wireframe = true;
    this.mainScene.add(this.mainMesh);

    const flatGeometry = new THREE.PlaneGeometry(120, 100, 1, 1);
    const flatMaterial = new THREE.MeshLambertMaterial({color: 0xf0f0f0});
    this.flatMesh = new THREE.Mesh(flatGeometry, flatMaterial);
    this.flatMesh.position.z = -200;
    this.mainScene.add(this.flatMesh);

    this.light = new THREE.DirectionalLight(0xffffff, 1.0);
    this.light.position.set(0, 0, 0);
    this.light.target = this.mainMesh;
    this.mainScene.add(this.light);

    //this.ambient = new THREE.AmbientLight(0xffffff, 0.2);
    //this.mainScene.add(this.ambient);

    //ポストエフェクト用
    /*
    this.renderTarget = new THREE.WebGLRenderTarget(this.w, this.h, {
      magFilter: THREE.NearestFilter,
      minFilter: THREE.NearestFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping
    });

    this.postScene = new THREE.Scene();
    this.postCamera = new THREE.PerspectiveCamera(60, this.w / this.h, 0.1, 1000);
    this.postCamera.position.z = 20;
    const postGeometry = new THREE.Geometry();
    const aspect = this.w / this.h;
    postGeometry.vertices = [
      new THREE.Vector3(-1.0 * aspect, 1.0, 0.0),
      new THREE.Vector3(1.0 * aspect, 1.0, 0.0),
      new THREE.Vector3(-1.0 * aspect, -1.0, 0.0),
      new THREE.Vector3(1.0 * aspect, -1.0, 0.0)
    ];
    postGeometry.faces = [
      new THREE.Face3(0, 2, 1),
      new THREE.Face3(1, 2, 3)
    ];
    this.postUniforms = {
      uTex: {
        value: this.renderTarget
      },
      uTime: {
        value: 0.0
      }
    };
    const postMaterial = new THREE.ShaderMaterial({uniforms: this.postUniforms, vertexShader: postVertexSource, fragmentShader: postFragmentSource});
    this.postMesh = new THREE.Mesh(postGeometry, postMaterial);
    this.postScene.add(this.postMesh);
    */

    this.mouse = new THREE.Vector2(0, 0);

    this.render();
  }

  mousemove(x, y) {
    this.mouse.x = (x - (this.w / 2)) / this.w;
    this.mouse.y = (-y + (this.h / 2)) / this.h;
    //console.log(this.mouse);
    this.mainUniforms.uLightPos.value = new THREE.Vector3(this.mouse.x, this.mouse.y, this.mainUniforms.uLightPos.value.z);
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    const sec = performance.now() / 1000;
    //this.postUniforms.uTime.value = sec;

    //this.mainMesh.rotation.x = 15 * THREE.Math.DEG2RAD;
    this.mainMesh.rotation.y = 16 * THREE.Math.DEG2RAD;
    //this.mainMesh.rotation.x = sec / 4;
    //this.mainMesh.rotation.z = sec / 4;

    //this.renderer.setRenderTarget(this.renderTarget);
    //this.renderer.setClearColor(new THREE.Color(0xffffff), 1.0);
    this.renderer.render(this.mainScene, this.mainCamera);

    //this.renderer.setRenderTarget(null);
    //this.renderer.setClearColor(new THREE.Color(0x000000), 1.0);
    //this.renderer.render(this.postScene, this.postCamera);
  }
};
