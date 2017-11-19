if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			//this is the scene for 3d objects
			var scene = new THREE.Scene();
			var mouseX = 0;
			var mouseY = 0;
			var  rightCamera, leftCamera;
			var div;
			var cubeScale = .8;
			var cubeScaleX = 1.2;
			//accounts for change of windows resize
			window.addEventListener('resize', function(){
				var width = window.innerWidth;
				var height = window.innerHeight;
				renderer.setSize(width, height);
				rightCamera.aspect = width/height;
				rightCamera.updateProjectionMatrix();
				leftCamera.aspect = width/height;
				leftCamera.updateProjectionMatrix();

				cube.scale.y = Math.tan(rightCamera.fov * Math.PI / 180 * 0.65) * camDistCubeScale * 2 ;
     			cube.scale.x = cube.scale.y * rightCamera.aspect;
     			//
				div.style.left = (rightCurrentCamPosition*window.innerWidth/2);
				
				
				div.style.height = window.innerHeight;
				
			});

			window.addEventListener("orientationchange", function() {
			    var width = window.innerWidth;
				var height = window.innerHeight;
				renderer.setSize(width, (height));
				rightCamera.aspect = width/(height);
				rightCamera.updateProjectionMatrix();
				leftCamera.aspect = width/height;
				leftCamera.updateProjectionMatrix();
				//
				cube.scale.y = Math.tan(rightCamera.fov * Math.PI / 180 * 0.65) * camDistCubeScale * 2 ;
     			cube.scale.x = cube.scale.y * rightCamera.aspect;

				div.style.left = (rightCurrentCamPosition*window.innerWidth/2);
				
				
				div.style.height = window.innerHeight;
				
			}, false);
			//renderer to render the objects on the screen must set the size like the size of a camera on screen
			var renderer = new THREE.WebGLRenderer({ alpha: true,antialiasing: true});

			//add the renderer to the webpage
			webglContainer.appendChild(renderer.domElement);

			var geometry0 = new THREE.BoxGeometry(1,1,1);
			var geometry1 = new THREE.BoxGeometry(1,1,1);
			var geometryDevider = new THREE.BoxGeometry(.1,10,1);
			var geometry2 = new THREE.SphereGeometry( .07, 6	, 6 );
			//material for geometry
			var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 1} );
			var material1 = new THREE.MeshPhongMaterial( { color: 0xffffff,wireframe: true} );
			var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
			var cube = new THREE.Mesh(geometry0, material);
			var sphere = new THREE.Mesh(geometry2, material1);
			var rightCamMoveDestination = .5;
			var rightCurrentCamPosition = rightCamMoveDestination;
			var leftCamMoveDestination = -.5;
			var leftCurrentCamPosition = leftCamMoveDestination;
			var rightCamMoveDestination = .5;
			var rightCurrentCamPosition = rightCamMoveDestination;
			var tween = new TWEEN.Tween();
			var divSize = window.innerWidth*.01;
			var dirLight, dirLightHeper, hemiLight, hemiLightHelper;
			var cubeFrame = new THREE.Mesh();
			var circlegeometry = new THREE.CircleBufferGeometry( .085, 5 );
			var cirmaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );
			var circle = new THREE.Mesh( circlegeometry, material );
			var bgCubes= [];
			var bgStars=[];
			var colors = [];
			var camDistCubeScale = 1.5;
			var meshNEW = new THREE.Mesh();
			var dividerXcord = .5*window.innerWidth;
			var uniforms;
			var aboutmeOpen = false;
			
			init();

			function init() {

				leftCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
				leftCamera.position.z = 3;
				leftCamera.position.y = 10;
				rightCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
				rightCamera.position.z = 3;
				rightCamera.position.x = 99.93;

				for(x=0;x<25;x++)
				{
				    for(y=0;y<10;y++)
				    {
				    	for(z=0;z<1;z++)
				    	{
				        	var mesh = new THREE.Mesh( geometry1, 
				        	new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true , transparent :true ,wireframe: false} ) );
							mesh.position.x = (x*4)+50;
							mesh.position.y = ((y)*4)-10;
							mesh.position.z = (-(z+.15)*10)-10;
							mesh.material.opacity = .35;
							mesh.matrixAutoUpdate = true;
							bgCubes.push(mesh);
							scene.add( mesh );
				    	}
				    }
				}

				var starShape = new THREE.Shape();
				starShape.moveTo(0, 0);
				starShape.lineTo( -.025, .075 );
				starShape.lineTo( .05, 0.14 );
				starShape.lineTo( 0.125, .075 );
				starShape.lineTo( 0.1, 0 );
				starShape.lineTo(0, 0);
				// Create a new geometry by extruding the triangleShape
				// The option: 'amount' is how far to extrude, 'bevelEnabled: false' prevents beveling
				var extrudedGeometry = new THREE.ExtrudeGeometry(starShape, {amount: .045, bevelEnabled: false});
				var extrudedGeometry1 = new THREE.ExtrudeGeometry(starShape, {amount: .045, bevelEnabled: false});
				extrudedGeometry1.center();
				var explodeModifier = new THREE.ExplodeModifier();
				explodeModifier.modify( geometry2 );
				var numFaces = geometry2.faces.length;
				//
				extrudedGeometry1 = new THREE.BufferGeometry().fromGeometry( geometry2 );
				var colors = new Float32Array( numFaces * 3 * 3 );
				var displacement = new Float32Array( numFaces * 3 * 3 );
				var color = new THREE.Color();
				for ( var f = 0; f < numFaces; f ++ ) {
					var index = 9 * f;
					var h = 1;
					var s = 1;
					var l = 1;
					var a = .1;
					var d = .1 * ( 0.75 - Math.random() );
					for ( var i = 0; i < 3; i ++ ) {
						colors[ index + ( 3 * i )     ] = 1.0;
						colors[ index + ( 3 * i ) + 1 ] = 1;
						colors[ index + ( 3 * i ) + 2 ] = 1;
						colors[ index + ( 3 * i ) + 3] = .1;
						displacement[ index + ( 3 * i )     ] = d;
						displacement[ index + ( 3 * i ) + 1 ] = d;
						displacement[ index + ( 3 * i ) + 2 ] = d;
					}
				}
				extrudedGeometry1.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
				extrudedGeometry1.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );
				//
				uniforms = {
					amplitude: { value: 0.0 }
				};
				var shaderMaterial = new THREE.ShaderMaterial( {
					uniforms:       uniforms,
					transparent : true,
					vertexShader:   document.getElementById( 'vertexshader' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent
				});

				var geometryConstellationLine = new THREE.Geometry();
				for(i=0;i<8;i++)
				{
				    var meshConstellation = new THREE.Mesh( extrudedGeometry1, shaderMaterial );
					meshConstellation.position.x = Math.random() * 7 - (1);
					meshConstellation.position.y = Math.random() * 3 - (1);
					meshConstellation.position.x -=3;
					meshConstellation.position.z =0;
					meshConstellation.position.y +=9.85;
					geometryConstellationLine.vertices.push(new THREE.Vector3(meshConstellation.position.x,meshConstellation.position.y, meshConstellation.position.z));
					scene.add( meshConstellation );

				}
				var line = new THREE.Line(geometryConstellationLine, new THREE.LineBasicMaterial({ color: 0xffffffff }));
				scene.add(line);
				//loader
				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {
					console.log( item, loaded, total );
				};
				var texture = new THREE.Texture();
				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};
				var onError = function ( xhr ) {
				};
				// model
				var loader = new THREE.OBJLoader( manager );
				loader.load( 'Images/mountain.obj' , function ( object ) {

                    object.traverse( function ( child ) {

                    if ( child instanceof THREE.Mesh )
                    {
                    var  geometry = child.geometry;
                    material = child.material;
                     mesh = new THREE.Mesh(geometry, material);
                        scene.add(mesh);

                    var useWireFrame = true;
                        if (useWireFrame) {
                            mesh.traverse(function (child) {
                                if (child instanceof THREE.Mesh) 
                                {
                                child.material.wireframe = true;
                                child.material.color = new THREE.Color( 0xffffff  );
                                }
                            });
                        }

                    }
                    object.position.x = -.025;
					object.position.y = 9.78;
					object.position.z = 2.75;
					object.rotation.y = 180.65;
					object.scale.set(1,1, 1);
                    scene.add( object );
                    });
               });

				for(i=0;i<250;i++)
				{
				    var meshStar = new THREE.Mesh( extrudedGeometry, 
				    new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: false , transparent :true ,wireframe: false} ) );
					meshStar.position.x = Math.random() * 25 - (1);
					meshStar.position.y = Math.random() * 10 - (1);
					meshStar.position.z = Math.random() * 3 - 1;
					meshStar.rotation.z = Math.random() * 1 - 1;
					meshStar.material.opacity = .175*meshStar.position.y;
					meshStar.matrixAutoUpdate = true;
					meshStar.position.x -=10;
					meshStar.position.z -=2;
					meshStar.position.y +=7.5;
					bgStars.push(meshStar);
					scene.add( meshStar );
				}
				cube.position.x = 100;
				cube.scale.y = Math.tan(rightCamera.fov * Math.PI / 180 * 0.65) * camDistCubeScale * 2 ;
     			cube.scale.x = cube.scale.y * rightCamera.aspect;
				scene.add(cube);
				sphere.position.y = 10;
				menuControls();
				// LIGHTS
				var light = new THREE.DirectionalLight( 0xffbaf5 );//0x6ed5ef 0xffbaf5
				light.position.set( 120, -100, 1 );
				scene.add( light );
				var light = new THREE.DirectionalLight( 0x42D6F9);
				light.position.set( -100, 100, -1 );
				scene.add( light );
				var light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 20, 100 );
				scene.add( light );
			}

			function menuControls(){
				//this is the middleBAr
				div = document.getElementById("divider");
				
				div.style.left = (rightCurrentCamPosition*window.innerWidth/2);
				
				
				div.style.height = window.innerHeight;
				
			}

			function showDesign()
			{
				rightCamMoveDestination = 1;
				leftCamMoveDestination =0;
				var tweenRight = new TWEEN.Tween( { x: rightCurrentCamPosition, } )
					.to( { x: rightCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						rightCurrentCamPosition =  this.x ;
						if((((rightCurrentCamPosition)*window.innerWidth)-divSize*2)<window.innerWidth)
						{dividerXcord=((rightCurrentCamPosition)*window.innerWidth);}
					} )
					.start();
				var tweenLeft = new TWEEN.Tween( { x: leftCurrentCamPosition, } )
					.to( { x: leftCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						leftCurrentCamPosition =  this.x ;
					} )
					.start();
			}
			function showAbout()
			{
				rightCamMoveDestination = .5;
				leftCamMoveDestination =-.5;
				var tweenRight = new TWEEN.Tween( { x: rightCurrentCamPosition, } )
					.to( { x: rightCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						rightCurrentCamPosition =  this.x ;
						if((((rightCurrentCamPosition)*window.innerWidth)+(divSize*2))<window.innerWidth)
						{dividerXcord=((rightCurrentCamPosition)*window.innerWidth);}

					} )
					.start();
				var tweenLeft = new TWEEN.Tween( { x: leftCurrentCamPosition, } )
					.to( { x: leftCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						leftCurrentCamPosition =  this.x ;
					} )
					.start();
			}

			function showPress()
			{
				rightCamMoveDestination = .5;
				leftCamMoveDestination =-.5;
				var tweenRight = new TWEEN.Tween( { x: rightCurrentCamPosition, } )
					.to( { x: rightCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						rightCurrentCamPosition =  this.x ;
						if((((rightCurrentCamPosition)*window.innerWidth)+(divSize*2))<window.innerWidth)
						{dividerXcord=((rightCurrentCamPosition)*window.innerWidth);}

					} )
					.start();
				var tweenLeft = new TWEEN.Tween( { x: leftCurrentCamPosition, } )
					.to( { x: leftCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						leftCurrentCamPosition =  this.x ;
					} )
					.start();
			}
			function showGames()
			{
				rightCamMoveDestination = 0;
				leftCamMoveDestination =-1;
				var tweenRight = new TWEEN.Tween( { x: rightCurrentCamPosition, } )
					.to( { x: rightCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						rightCurrentCamPosition =  this.x ;
						if((((rightCurrentCamPosition)*window.innerWidth)+(divSize*2))<window.innerWidth)
						{dividerXcord=((rightCurrentCamPosition)*window.innerWidth);}

					} )
					.start();
				var tweenLeft = new TWEEN.Tween( { x: leftCurrentCamPosition, } )
					.to( { x: leftCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						leftCurrentCamPosition =  this.x ;
					} )
					.start();
			}

			function onDocumentMouseMove(event) {
				mouseX = event.clientX ;
				mouseY = event.clientY ;
			}
			function onDocumentTouchStart( event ) {
				if ( event.touches.length > 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}
			function onDocumentTouchMove( event ) {
				if ( event.touches.length == 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}
			var moveScreenRight = function(){

			};
			//threes logic
			var update = function(){
				var time = Date.now() * 0.001;
				cube.rotation.x +=.0002;
				cube.rotation.y +=.0002;
				meshNEW.rotation.y += .0002;

				renderer.setSize(window.innerWidth, window.innerHeight);
				for (var i = 0 ; i < bgCubes.length; i++) {
					bgCubes[i].rotation.x +=((.0003)*Math.random(1,5));
					bgCubes[i].rotation.y +=((.0003)*Math.random(1,5));

				}
				for (var i = 0 ; i < bgStars.length; i++) {
					bgStars[i].rotation.y = 1.0 + Math.sin( time * 0.35 );
				}
				div.style.left = dividerXcord+'px';
				TWEEN.update(  );
				uniforms.amplitude.value = 1.0 + Math.sin( time * 0.3 );
				
			};
			//this is where you put the objects to be rendered in scene
			var render = function(){
				 var SCREEN_W, SCREEN_H;
				 SCREEN_W = window.innerWidth;
				 SCREEN_H = window.innerHeight;
				 var left,bottom,width,height;
				 left = (leftCurrentCamPosition*SCREEN_W)+1; bottom = 1; width = SCREEN_W; height = SCREEN_H;
				 renderer.setViewport (left,bottom,width,height);
				 renderer.setScissor(left,bottom,width,height);
				 renderer.setScissorTest (true);
				 leftCamera.aspect = width/height;
				 leftCamera.updateProjectionMatrix();
				 renderer.render (scene,leftCamera);
				 left = (rightCurrentCamPosition*SCREEN_W)+1; bottom = 1; width = SCREEN_W; height = SCREEN_H;
				 renderer.setViewport (left,bottom,width,height);
				 renderer.setScissor(left,bottom,width,height);
				 renderer.setScissorTest (true);  // clip out "viewport"
				 rightCamera.aspect = width/height;
				 rightCamera.updateProjectionMatrix();
				 renderer.render (scene,rightCamera);
				 dividerXcord=((rightCurrentCamPosition)*window.innerWidth);
				 div.style.left = dividerXcord;
			};
			//run game loop
			var GameLoop = function(){
				requestAnimationFrame(GameLoop);
				update();
				render();
				//console.log('dafsdafds');
			};
			//call the gameloop
			GameLoop();