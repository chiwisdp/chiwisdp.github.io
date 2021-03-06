'use strict'
			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			//this is the scene for 3d objects
			var scene = new THREE.Scene();

			
			var mouseX = 0;
			var mouseY = 0;

			var  rightCamera, leftCamera;
			var div;
			var cubeScale = .8;
			var cubeScaleX = 1.2;
			//scene.background = new THREE.Color( 0xcccccc );
			//accounts for change of windows resize
			window.addEventListener('resize', function(){
				var width = window.innerWidth;
				var height = window.innerHeight;
				renderer.setSize(width, height);
				rightCamera.aspect = width/height;
				rightCamera.updateProjectionMatrix();
				leftCamera.aspect = width/height;
				leftCamera.updateProjectionMatrix();
				//cube.scale.set(cubeScaleX*(window.innerWidth/window.innerHeight),cubeScale*(window.innerWidth/window.innerHeight), cubeScaleX*(window.innerWidth/window.innerHeight));
				//cube scale

				cube.scale.y = Math.tan(rightCamera.fov * Math.PI / 180 * 0.65) * camDistCubeScale * 2 ;
     			cube.scale.x = cube.scale.y * rightCamera.aspect;
     			
     			//
				div.style.left = (rightCurrentCamPosition*window.innerWidth);
				div.style.top = "0px";
				div.style.width = divSize;
				div.style.height = window.innerHeight;

			});
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.addEventListener( 'touchstart', onDocumentTouchStart, false );
			document.addEventListener( 'touchmove', onDocumentTouchMove, false );
			//camera like unity 
			//var camera1= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
			
			//renderer to render the objects on the screen must set the size like the size of a camera on screen
			var renderer = new THREE.WebGLRenderer({ alpha: true,antialiasing: true});
			
			//add the renderer to the webpage
			document.body.appendChild(renderer.domElement);
			
			//implement orbit controls
			//controls = new THREE.OrbitControls(camera1, renderer.domElement);
			//create the shape
			var geometry0 = new THREE.BoxGeometry(1,1,1);
			var geometry1 = new THREE.BoxGeometry(1,1,1);
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
			var divSize = window.innerWidth*.02;
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

			var uniforms;
			init();

			function init() {

				leftCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
				leftCamera.position.z = 3;
				leftCamera.position.y = 10;


				//let fov = 2 * Math.atan( h / ( 2 * d ) ) * ( 180 / Math.PI );

				//let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
				rightCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
				rightCamera.position.z = 3;

				rightCamera.position.x = 99.93;
				
				for(x=0;x<25;x++)
				{
				    for(y=0;y<10;y++)
				    {
				    	for(z=0;z<1;z++)
				    	{
				        	//g.drawRect(x*width,y*height,width,height);
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
				/*//loader
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
				loader.load( 'Images/cubeframe.obj', function ( mesh ) {
					cubeFrame = mesh;
					cubeFrame.material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true , transparent :true ,wireframe: true});

					cubeFrame.position.x = 100;
					cubeFrame.position.z = 1.5;
					cubeFrame.material.opacity = .15;
					cubeFrame.scale.set(cubeScaleX*(window.innerWidth/window.innerHeight),cubeScale*(window.innerWidth/window.innerHeight), cubeScaleX*(window.innerWidth/window.innerHeight));
					//scene.add( cubeFrame );
				}, onProgress, onError );
				//



				//*/

				/*
				// particles
				var PI2 = Math.PI * 2;
				sprite = new THREE.TextureLoader().load( 'Images/disc.png' );
				var materialLines = new THREE.SpriteMaterial( {
					color: 0xffffff,
					opacity : .5,
					sprite : sprite,
					program: function ( context ) {
						context.beginPath();
						context.arc( 0, 0, 0.5, 0, PI2, true );
						context.fill();
					}
				} );
				var geometry = new THREE.Geometry();
				for ( var i = 0; i < 200; i ++ ) {
					particle = new THREE.Sprite( materialLines );
					particle.position.x = Math.random() * 2 - 1;
					particle.position.y = Math.random() * 2 - 1;
					particle.position.z = Math.random() * 2 - 1;
					particle.position.normalize();
					//particle.position.multiplyScalar( Math.random() * 10 + 450 );
					particle.scale.x = particle.scale.y = .05;
					console.log('i = ' + i + ' particle.position.y = ' +particle.position.y);
					particle.position.y +=10;
					particle.position.z -=1;
					scene.add( particle );
					//geometry.vertices.push( particle.position );
				}
				// lines
				var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.5 } ) );
				scene.add( line );
				*/
				// Create a 2D triangular shape
// The Shape() class has methods for drawing a 2D shape
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
					//color= Color.white;
					var d = .025 * ( 0.75 - Math.random() );
					for ( var i = 0; i < 3; i ++ ) {
						colors[ index + ( 3 * i )     ] = 1.0;
						colors[ index + ( 3 * i ) + 1 ] = 1;
						colors[ index + ( 3 * i ) + 2 ] = 1;
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
				//
				
				
			
				//console.log(' meshNEW.position.y = ' +meshNEW.position.y);
				//
				var geometryConstellationLine = new THREE.Geometry();
				
	

				for(i=0;i<8;i++)
				{
				    //g.drawRect(x*width,y*height,width,height);
				    
				    var meshConstellation = new THREE.Mesh( extrudedGeometry1, shaderMaterial );
					
					meshConstellation.position.x = Math.random() * 7 - (1);
					meshConstellation.position.y = Math.random() * 3 - (1);
					//meshConstellation.position.z = Math.random() * 3 - 1;
					
					
					meshConstellation.position.x -=3;
					meshConstellation.position.z =0;
					meshConstellation.position.y +=9.85;

					geometryConstellationLine.vertices.push(new THREE.Vector3(meshConstellation.position.x,meshConstellation.position.y, meshConstellation.position.z));
					
					//console.log('i = ' + i + ' meshConstellation.position.y = ' +meshConstellation.position.y);		
					scene.add( meshConstellation );
							
				}

				var line = new THREE.Line(geometryConstellationLine, new THREE.LineBasicMaterial({ color: 0xffffffff }));
				scene.add(line);

				//
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
                    //child.geometry.computeFaceNormals();
                    var  geometry = child.geometry;
                    //console.log(geometry);
                    //geometry.dynamic = true;
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
                   // object.position.y = 10;
                    scene.add( object );

                    });
               });
				//
				/*var loader = new THREE.ColladaLoader( manager );
				loader.load( 'Images/mountain.obj', function ( object ) {
				    object.scene.traverse( function(child) {
				        if( child instanceof THREE.Mesh ) {
				            child.material = new THREE.MeshBasicMaterial( { color: 0x009900, wireframe: true, vertexColors: THREE.VertexColors } ); 
				            child.position.x = -.025;
							child.position.y = 9.8;
							child.position.z = 2.75;
							child.rotation.y = 180.65;
							console.log( ' cubeFrame.position.z = ' +child.position.x);
							cubeFrame.scale.set(1,1, 1);
				            scene.add( child );
				        }
				    });
				}, onProgress, onError );*/


				//

				//

				for(i=0;i<250;i++)
				{
				    //g.drawRect(x*width,y*height,width,height);
				    
				    var meshStar = new THREE.Mesh( extrudedGeometry, 
				    new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: false , transparent :true ,wireframe: false} ) );
					
					meshStar.position.x = Math.random() * 25 - (1);
					meshStar.position.y = Math.random() * 10 - (1);
					meshStar.position.z = Math.random() * 3 - 1;
					meshStar.rotation.z = Math.random() * 1 - 1;
					//meshStar.rotation.y = Math.random() * 5 - 1;
					meshStar.material.opacity = .175*meshStar.position.y;
							
					meshStar.matrixAutoUpdate = true;
					meshStar.position.x -=10;
					meshStar.position.z -=2;
					meshStar.position.y +=7.5;
					bgStars.push(meshStar);
					//console.log('i = ' + i + ' meshStar.position.y = ' +meshStar.position.y);		
					scene.add( meshStar );
							
				}

				


				
				//scene.add( meshNew );

				

				//cube.scale.set(cubeScaleX*(window.innerWidth/window.innerHeight),cubeScale*(window.innerWidth/window.innerHeight), cubeScaleX*(window.innerWidth/window.innerHeight));
				cube.position.x = 100;
				cube.scale.y = Math.tan(rightCamera.fov * Math.PI / 180 * 0.65) * camDistCubeScale * 2 ;
     			cube.scale.x = cube.scale.y * rightCamera.aspect;
				//console.log('mesh.scale.y: '+mesh.scale.y+' rightCamera.aspect: '+rightCamera.aspect);
				

				
				scene.add(cube);
				sphere.position.y = 10;
				//scene.add(sphere);
				
				
				menuControls();
				//lights 

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
				//var light = new THREE.AmbientLight( 0xB6B6B6 );
				//scene.add( light );

				
			}

			function menuControls(){
				var b_r = document.getElementById( "b_r" );
				var b_m = document.getElementById( "b_m" );
				var b_l = document.getElementById( "b_l" );

				b_r.addEventListener( 'click', function() { visualizationType = 0; moveAllWayRight() } );
				b_m.addEventListener( 'click', function() { visualizationType = 1; moveAllWayMiddle() } );
				b_l.addEventListener( 'click', function() { visualizationType = 2; moveAllWayLeft() } );

				div = document.createElement("div");
				div.style.position = "absolute";
				div.style.left = (rightCurrentCamPosition*window.innerWidth);
				div.style.top = "0px";
				div.style.width = divSize;
				div.style.height = window.innerHeight;
				div.style.background = "white";
				

				document.body.appendChild(div);
			}

			function moveAllWayRight()
			{
				rightCamMoveDestination = 1;
				//tween = new TWEEN.Tween(currentPosition).to(backgroundMoveDestination, 2000);
				//tween.start();
				leftCamMoveDestination =0;
				var tweenRight = new TWEEN.Tween( { x: rightCurrentCamPosition, } )
					.to( { x: rightCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						rightCurrentCamPosition =  this.x ;

					} )
					.start();
				var tweenLeft = new TWEEN.Tween( { x: leftCurrentCamPosition, } )
					.to( { x: leftCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						leftCurrentCamPosition =  this.x ;
					} )
					.start();
				console.log('right');
			}
			function moveAllWayMiddle()
			{
				rightCamMoveDestination = .5;
				//tween = new TWEEN.Tween(currentPosition).to(backgroundMoveDestination, 2000);
				//tween.start();
				leftCamMoveDestination =-.5;
				var tweenRight = new TWEEN.Tween( { x: rightCurrentCamPosition, } )
					.to( { x: rightCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						rightCurrentCamPosition =  this.x ;

					} )
					.start();
				var tweenLeft = new TWEEN.Tween( { x: leftCurrentCamPosition, } )
					.to( { x: leftCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						leftCurrentCamPosition =  this.x ;
					} )
					.start();
				
				console.log('middle');
			}
			function moveAllWayLeft()
			{
				rightCamMoveDestination = 0;
				//tween = new TWEEN.Tween(currentPosition).to(backgroundMoveDestination, 2000);
				//tween.start();
				leftCamMoveDestination =-1;
				var tweenRight = new TWEEN.Tween( { x: rightCurrentCamPosition, } )
					.to( { x: rightCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						rightCurrentCamPosition =  this.x ;

					} )
					.start();
				var tweenLeft = new TWEEN.Tween( { x: leftCurrentCamPosition, } )
					.to( { x: leftCamMoveDestination }, 250 )
					.easing( TWEEN.Easing.Quadratic.InOut )
					.onUpdate( function () {
						leftCurrentCamPosition =  this.x ;
					} )
					.start();
				
				console.log('left ');
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
					//bgStars[i].rotation.z = 2.0 + Math.sin( time * 0.15 );
					bgStars[i].rotation.y = 1.0 + Math.sin( time * 0.15 );
					
					
				}

				TWEEN.update(  );
				
				uniforms.amplitude.value = 1.0 + Math.sin( time * 0.05 );
				//console.log('uniforms.amplitude.value: '+ uniforms.amplitude.value);
				
			};
			//this is where you put the objects to be rendered in scene
			var render = function(){
				//renderer.render(scene, camera1);
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
				 
				 if(rightCurrentCamPosition == 1)
				 {
				 	div.style.left = ((rightCurrentCamPosition)*window.innerWidth)-divSize;
				 }else if(rightCurrentCamPosition == 0){
					div.style.left = ((rightCurrentCamPosition)*window.innerWidth);
				 }else{
				 	div.style.left = ((rightCurrentCamPosition)*window.innerWidth);
				 }
				
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
		