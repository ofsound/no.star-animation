(function () {
	
	var LENGTH = 5000, VELOCITY = 1;
	var camera, scene, renderer, timer, count = 0, deg = 0, spiralParticles = [], curveSpiralParticles = [];
	var random = Math.random, abs = Math.abs, sin = Math.sin, cos = Math.cos;
	var mouseX = 0, mouseY = 0, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2;
	
	var count = 20000;

	// var socket = io.connect('http://localhost:3000');

	var frame = 0;

	function init() {

		
		camera = new THREE.Camera(450, window.innerWidth / window.innerHeight, 1, 10000);
		// camera.position.z = 2000;
		// camera.position.z = 1000;
		// camera.position.z = 1400;
		camera.position.z = 1000;


	    scene = new THREE.Scene();
		
		for (var i = 0; i < LENGTH; i++) {
			
			
			var colorRandom = Math.random();

			if ( colorRandom > .66 ) {
				var myColor = '0xFFFFFF';
			} else if ( colorRandom > .3 ) {
				var myColor = '0xBEBEBE';
			} else {
				var myColor = '0xEFEFEF';
			}

			var curveParticle = curveSpiralParticles[i] = new THREE.Particle(new THREE.ParticleCircleMaterial({
				color: myColor,
				opacity: .4
			}));



			curveParticle.position.x = 220 * Math.random() - 220;
			curveParticle.position.y = 220 * Math.random() - 220;
			curveParticle.position.z = -1800 + i * 3.8;


			// var factor = Math.random() * 7.5;  // 3.5
			var factor = Math.random() * 3.5;  // 3.5
			curveParticle.scale.x =  0 + factor;
			curveParticle.scale.y = 0 + factor;



			scene.addObject(curveParticle);
		}
		
	    renderer = new THREE.CanvasRenderer();
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    
	    document.body.appendChild(renderer.domElement);
	
		document.addEventListener('mousemove', function (event) {
			
			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;
			
		}, false);
		
		
		document.addEventListener('dblclick', function () {
			
			startStop();
			
		}, false);
	}
	

	
	function deg2Rad(deg) {
		
		return deg * (Math.PI / 180);
		
	}
	
	function startStop() {
		
		var player = document.getElementById('player');
		
		if (timer) {
			timer = clearInterval(timer);
			player.pause();
		} else {
			timer = setInterval(loop, 1000 / 60);
			player.play();
		}
		
	}
	

	var angle = 2; 

	function loop() {
		
		// camera.position.x += (mouseX - camera.position.x) * 0.004;
		// camera.position.y += (- mouseY - camera.position.y) * 0.004;



		camera.position.x = 15 * Math.cos( angle );  
		camera.position.y = 15 * Math.sin( angle );
		
		angle += .0002;
		// angle += .0002;

		// camera.position.z += .3;


		// camera.rotation.z +=1 ;
		
		var rad = deg2Rad(deg * VELOCITY) + 3.14 * 2;

		for (var i = 0; i < curveSpiralParticles.length; i++) {
			
			var curveParticle = curveSpiralParticles[i];
			curveParticle.position.x += cos(rad + (i * 0.2	)) * .3;
			curveParticle.position.y += sin(rad + (i * 0.2	)) * .3;


		}

		// console.log  (  );

		if ( sin( rad + ( LENGTH * .02 ))  < 0 ) {

			camera.position.z += -.8 * sin( rad + ( LENGTH * .02 ) );

			// console.log (  sin( rad + ( LENGTH * .02 ))  );
			// camera.position.z += 1;
			// camera.position.z += 10;

		}
		
		// count += .15;
		count += .05;
		// count += .5;
		
		deg = (count) % 360;




		if ( count < 30000 ) {
		  renderer.render(scene, camera);

			// socket.emit('render-frame', {
			// 	frame: frame++,
			// 	file: document.querySelector('canvas').toDataURL()
			// });


		}


		
	    
		


	      
	
	}

	function fakeLoop() {
		
		// camera.position.x += (mouseX - camera.position.x) * 0.3;
		// camera.position.y += (- mouseY - camera.position.y) * 0.3;
		
		var rad = deg2Rad(deg * VELOCITY) + 3.14 * 2;

		for (var i = 0; i < curveSpiralParticles.length; i++) {
			
			var curveParticle = curveSpiralParticles[i];
			curveParticle.position.x += cos(rad + (i * 0.20000)) * .5;
			curveParticle.position.y += sin(rad + (i * 0.20000)) * .5;
		}
		
		count += .03;
		
		deg = (count + 10) % 360;
		
	
	}
	
	init();


	counter = 1
	// while(counter <= 11500)
	while(counter <= 20000)
	// while(counter <= 7000)
	{
	  fakeLoop();

	  counter = counter + 1
	 }


	startStop();
	
})();