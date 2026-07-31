import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Loader2 } from 'lucide-react';

const Torito3D = ({ colorHex }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const modelRef = useRef(null);

    const colorHexRef = useRef(colorHex);
    colorHexRef.current = colorHex;

    // Dynamic Color Update when prop changes
    useEffect(() => {
        if (modelRef.current) {
            updateModelColor(modelRef.current, colorHex);
        }
    }, [colorHex]);

    // Apply color updating mat.color (diffuse)
    const updateModelColor = (model, hexColor) => {
        model.traverse((node) => {
            if (node.isMesh && node.material) {
                const materials = Array.isArray(node.material) ? node.material : [node.material];
                
                materials.forEach((mat) => {
                    if (mat.color) {
                        mat.color.set(hexColor);
                        // Do NOT call mat.needsUpdate = true to prevent infinite recompiles
                    }
                });
            }
        });
    };

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        let width = containerRef.current.clientWidth || 300;
        let height = containerRef.current.clientHeight || 300;

        // 1. Scene setup
        const scene = new THREE.Scene();

        // 2. Camera setup
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
        camera.position.set(0, 1.8, 5.5);

        // 3. Renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            precision: "mediump"
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = false;

        // 4. Lighting setup (Warm sunset "golden hour" altiplano lighting)
        const ambientLight = new THREE.AmbientLight(0xfff0e0, 0.85); // Warm amber ambient
        scene.add(ambientLight);

        const dirLight1 = new THREE.DirectionalLight(0xffcc88, 1.4); // Golden key light
        dirLight1.position.set(6, 12, 8);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0x88bfff, 0.4); // Soft blue sky fill light
        dirLight2.position.set(-6, -6, -6);
        scene.add(dirLight2);

        const pointLight = new THREE.PointLight(0xffa550, 0.9, 12); // Rich sunset glow point light
        pointLight.position.set(0, 1.5, 3.5);
        scene.add(pointLight);

        // 4b. Pedestal setup (Stone-carved altar pedestal of Kalasaya ruins)
        const pedestalGeo = new THREE.CylinderGeometry(1.7, 1.9, 0.35, 32);
        const pedestalMat = new THREE.MeshStandardMaterial({
            color: 0x9E4A4E, // Stone Rose of Kalasaya
            roughness: 0.85,
            metalness: 0.05
        });
        const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
        pedestal.position.set(0, -1.85, 0);
        scene.add(pedestal);

        // 5. Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0;
        controls.maxDistance = 10;
        controls.minDistance = 3.2;
        controls.enablePan = false;

        let animationFrameId;
        let loadedModel = null;

        // 6. Loader setup with shader modifications
        const loader = new GLTFLoader();
        const modelUrl = new URL('/toreto.glb', import.meta.url).href;
        loader.load(
            modelUrl,
            (gltf) => {
                loadedModel = gltf.scene;
                modelRef.current = loadedModel;

                // Center the model in the scene
                const box = new THREE.Box3().setFromObject(loadedModel);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                
                loadedModel.position.sub(center);
                
                // Adjust scale so it fits nicely
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 3.6 / maxDim;
                loadedModel.scale.set(scale, scale, scale);

                // Inject our custom shader algorithm into standard materials
                loadedModel.traverse((node) => {
                    if (node.isMesh && node.material) {
                        const mat = node.material;
                        
                        mat.roughness = 0.45;
                        mat.metalness = 0.05;

                        // Inject custom GLSL by replacing the standard <map_fragment> chunk
                        mat.onBeforeCompile = (shader) => {
                            const targetString = '#include <map_fragment>';
                            const replacementString = `
                              #ifdef USE_MAP
                                vec4 texelColor = texture2D( map, vMapUv );
                                
                                // Check if color is white (RGB 1,1,1) -> bypass tinting to show original GLB texture
                                if (diffuse.r == 1.0 && diffuse.g == 1.0 && diffuse.b == 1.0) {
                                    diffuseColor *= texelColor;
                                } else {
                                    // Grayscale shading factor from base color texture
                                    float gray = dot(texelColor.rgb, vec3(0.299, 0.587, 0.114));
                                    
                                    // 1. Detect White painted details (very high intensity values)
                                    float isWhite = step(0.76, texelColor.r) * step(0.76, texelColor.g) * step(0.76, texelColor.b);
                                    
                                    // 2. Detect Black details (eyes, pupils - very low intensity values)
                                    float isBlack = (1.0 - step(0.24, texelColor.r)) * (1.0 - step(0.24, texelColor.g)) * (1.0 - step(0.24, texelColor.b));
                                    
                                    // 3. Detect Gold / Yellow decorations (high red and green, low blue)
                                    float isGold = step(0.55, texelColor.r) * step(0.44, texelColor.g) * (1.0 - step(0.35, texelColor.b));
                                    
                                    // Combine white, black and gold detail masks
                                    float detailMask = clamp(isWhite + isBlack + isGold, 0.0, 1.0);
                                    
                                    // Tint the body using Three's built-in 'diffuse' uniform
                                    vec3 bodyColor = diffuse * (gray * 1.35);
                                    
                                    // Blend between body tint and original details
                                    vec3 finalRGB = mix(bodyColor, texelColor.rgb, detailMask);
                                    
                                    texelColor = vec4(finalRGB, texelColor.a);
                                    diffuseColor *= texelColor;
                                }
                              #endif
                            `;

                            shader.fragmentShader = shader.fragmentShader.replace(targetString, replacementString);
                        };

                        mat.needsUpdate = true;
                    }
                });

                // Add to scene and apply initial color tint
                scene.add(loadedModel);
                updateModelColor(loadedModel, colorHexRef.current);

                setIsLoading(false);
            },
            (xhr) => {
                if (xhr.total > 0) {
                    const percent = Math.round((xhr.loaded / xhr.total) * 100);
                    setLoadingProgress(percent);
                }
            },
            (error) => {
                console.error('Error loading 3D Model:', error);
                setLoadError(true);
                setIsLoading(false);
            }
        );

        // 7. Animation Loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // 8. Resize Handler
        const handleResize = () => {
            if (!containerRef.current || !canvasRef.current) return;
            width = containerRef.current.clientWidth;
            height = containerRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        // 9. Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            controls.dispose();

            scene.traverse((object) => {
                if (!object.isMesh) return;
                
                object.geometry.dispose();

                if (object.material.isMaterial) {
                    cleanMaterial(object.material);
                } else if (Array.isArray(object.material)) {
                    object.material.forEach(cleanMaterial);
                }
            });

            renderer.dispose();
        };

        function cleanMaterial(material) {
            material.dispose();
            for (const key of Object.keys(material)) {
                const value = material[key];
                if (value && typeof value.dispose === 'function') {
                    value.dispose();
                }
            }
        }
    }, []);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '320px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Canvas for Three.js */}
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', outline: 'none', cursor: 'grab' }} />

            {/* Loading Indicator */}
            {isLoading && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(15, 44, 89, 0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px',
                    color: 'white',
                    gap: '1rem',
                    zIndex: 10
                }}>
                    <Loader2 size={36} className="animate-spin text-accent" style={{ color: 'var(--accent)', animation: 'spin 1.5s linear infinite' }} />
                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                        Cargando Torito 3D... {loadingProgress}%
                    </div>
                    <div style={{ width: '120px', height: '6px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${loadingProgress}%`, height: '100%', backgroundColor: 'var(--accent)', transition: 'width 0.2s' }} />
                    </div>
                </div>
            )}

            {/* Error Message */}
            {loadError && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(15, 44, 89, 0.9)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px',
                    color: 'white',
                    padding: '1.5rem',
                    textAlign: 'center',
                    zIndex: 10
                }}>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--secondary)' }}>
                        No se pudo cargar el modelo 3D.
                    </p>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', opacity: 0.8 }}>
                        Cargando versión interactiva 2D por defecto.
                    </p>
                </div>
            )}

            {/* CSS Animation helper */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Torito3D;
