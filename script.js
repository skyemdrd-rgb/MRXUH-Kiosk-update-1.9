

window.addEventListener('load', () => {

  /* =========================================
     ELEMENTS
  ========================================= */

  const app = document.getElementById('app');
  const loader = document.getElementById('loader');

  const screens =
    document.querySelectorAll('.screen');

  const mapImage =
    document.getElementById('mapImage');

  const marker =
    document.getElementById('marker');

  const destinations =
    document.getElementById('destinations');

  const floor4Btn =
    document.getElementById('floor4');

/* =========================
     4K RESPONSIVE SCALE
  ========================= */

  function scaleApp(){

  const baseWidth = 1920;
  const baseHeight = 1080;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const scaleX = windowWidth / baseWidth;
  const scaleY = windowHeight / baseHeight;

  // ✅ FIX: use MIN to fit entire UI
  const scale = Math.min(scaleX, scaleY);

  app.style.width = baseWidth + 'px';
  app.style.height = baseHeight + 'px';

  app.style.transform = `scale(${scale})`;
  app.style.transformOrigin = 'top left';

  const scaledWidth = baseWidth * scale;
  const scaledHeight = baseHeight * scale;

  // ✅ PERFECT CENTERING
  app.style.position = 'absolute';
  app.style.left = ((windowWidth - scaledWidth) / 2) + 'px';
  app.style.top = ((windowHeight - scaledHeight) / 2) + 'px';
}

  /* =========================================
   START SCALING
========================================= */

scaleApp();

window.addEventListener(
  'resize',
  scaleApp
);

  /* =========================================
     SCREEN NAVIGATION
  ========================================= */

  window.showScreen = function(id){

    const target =
      document.getElementById(id);

    if(!target) return;

    screens.forEach(screen => {
      screen.classList.remove('active');
    });

    target.classList.add('active');
  };

  window.goHome = function(){
    showScreen('homeScreen');
  };

  window.goGuide = function(){
    showScreen('guideScreen');
  };

  window.goStart = function(){
    showScreen('startScreen');
  };

  /* =========================================
     MAP STATE
  ========================================= */

  let currentMap = 'new';
  let currentFloor = 1;

  /* =========================================
     MAP DATA
  ========================================= */

  const floors = {

    old: {

      1:{
        image:'map/old-building-map.webp',

        destinations:[

  { name:'Admin Office', x:36, y:85 },

  { name:'ATM', x:54, y:93 },

  { name:'Business Office', x:47, y:86 },

  { name:'Chapel', x:39, y:69 },

  { name:'Dietary', x:34, y:31 },

  { name:'Doctors Quarter', x:76, y:56 },

  { name:'Dorms', x:78, y:80 },

  { name:'Drug Testing Lab', x:38, y:48 },

  { name:'ER', x:20, y:74 },

  { name:'HR Office', x:61, y:38 },

  { name:'Laboratory', x:44, y:49 },

  { name:'Medical Imaging', x:30, y:58 },

  { name:'Medical Record', x:68, y:66 },

  { name:'Medical Social Service', x:26, y:60 },

  { name:'MIS', x:61, y:18 },

  { name:'MSC Entrance', x:74, y:6 },

  { name:'OPD', x:28, y:84 },

  { name:'Pharmacy', x:49, y:76 },

  { name:'Photocopy', x:73, y:66 },

  { name:'Purchasing Office', x:39, y:10 },

  { name:'Training Room', x:70, y:18 }

]
      },

      2:{
        image:'map/old-building-2nd-floor.webp',

        destinations:[

          { name:'PICU', x:30, y:35 },
          { name:'ICU', x:30, y:55 },
          { name:'OR', x:12, y:85 },
          { name:'Gastrointestinal Center', x:18, y:75 },
          { name:'Bridge to new building', x:88, y:10 }

        ]
      },

      3:{
        image:'map/old-building-3rd-floor.webp',

        destinations:[]
      }

    },

    new: {

      1:{
        image:'map/msc-map.webp',

        destinations:[

  { name:'ACES', x:23, y:50 },

  { name:'Cancer Center', x:87, y:74 },

  { name:'Canteen', x:25, y:24 },

  { name:'Cardiovascular Center', x:40, y:76 },

  { name:'Cashier Satellite', x:74, y:53 },

  { name:'Elevator', x:61, y:61 },

  { name:'Eye Surgi Center', x:22, y:36 },

  { name:'Hemodialysis Center', x:40, y:50 },

  { name:'Kraft & Kettle', x:80, y:53 },

  { name:'Med Express', x:50, y:76 },

  { name:'Rehabilitation Center', x:43, y:36 },

  { name:'Sleep Lab', x:30, y:76 }


        ]
      },

      2:{
        image:'map/msc-2nd-floor.webp',

        destinations:[

          { name:'DR Clinics', x:15, y:42 },
          { name:'Elevator', x:64, y:45 }

        ]
      },

      3:{
        image:'map/msc-3rd-floor.webp',

        destinations:[

    

        ]
      },

      4:{
        image:'map/msc-4th-floor.webp',

        destinations:[

          { name:'Hearing Center', x:45, y:18 }

        ]
      }

    }

  };

  /* =========================================
     RENDER DESTINATIONS
  ========================================= */

  function renderDestinations(){

    const data =
      floors[currentMap][currentFloor];

    if(!data) return;

    /* MAP IMAGE */

    mapImage.classList.remove(
      'map-fade'
    );

    void mapImage.offsetWidth;

    mapImage.src = data.image;

    mapImage.classList.add(
      'map-fade'
    );

    /* CLEAR DESTINATIONS */

    destinations.innerHTML = '';

    /* CREATE BUTTONS */

    data.destinations.forEach(item => {

      const button =
        document.createElement('div');

      button.className =
        'destination';

      button.innerText =
        item.name;

      button.onclick = () => {
        showWaypoint(item.x, item.y);
      };

      destinations.appendChild(
        button
      );

    });

  }

  /* =========================================
     WAYPOINT
  ========================================= */

  window.showWaypoint = function(x, y){

  marker.style.display = 'none';

  marker.classList.remove('marker');

  void marker.offsetWidth;

  marker.classList.add('marker');

  marker.style.display = 'block';

  marker.style.left = `${x}%`;
  marker.style.top = `${y}%`;

};

  /* =========================================
     FLOOR CHANGE
  ========================================= */

  window.changeFloor = function(floor){

    currentFloor = floor;

    /* OLD BUILDING HAS NO 4F */

    if(
      currentMap === 'old' &&
      currentFloor === 4
    ){
      currentFloor = 1;
    }

    /* TOGGLE 4F BUTTON */

    if(floor4Btn){

      floor4Btn.style.display =
        currentMap === 'new'
        ? 'block'
        : 'none';
    }

    /* RESET MARKER */

    marker.style.display =
      'none';

    renderDestinations();
  };

  /* =========================================
     SWITCH MAP
  ========================================= */

  window.switchMap = function(){

    currentMap =
      currentMap === 'new'
      ? 'old'
      : 'new';

    if(
      currentMap === 'old' &&
      currentFloor === 4
    ){
      currentFloor = 1;
    }

    changeFloor(currentFloor);
  };

  /* =========================================
     IDLE TIMER
  ========================================= */

  const screensaver =
  document.getElementById('screensaver');

let screensaverTimer;

function showScreensaver() {
  goHome();
  screensaver.style.display = 'block';
}

function hideScreensaver() {
  screensaver.style.display = 'none';
}

function resetScreensaver() {

  clearTimeout(screensaverTimer);

  screensaverTimer = setTimeout(() => {
    showScreensaver();
  }, 180000);

}

document.addEventListener('click', () => {
  hideScreensaver();
  resetScreensaver();
});

document.addEventListener('touchstart', () => {
  hideScreensaver();
  resetScreensaver();
});

/* START WITH SCREENSAVER */
showScreensaver();
resetScreensaver();
  /* =========================================
     INIT
  ========================================= */

  renderDestinations();

  loader.style.display = 'none';

  document.addEventListener(
  'gesturestart',
  e => e.preventDefault()
);

document.addEventListener(
  'dblclick',
  e => e.preventDefault()
);

if('serviceWorker' in navigator){

  window.addEventListener('load', () => {

    navigator.serviceWorker.register('sw.js')
      .then(() => {

        console.log('Service Worker Registered');

      });

  });

}



});

function goBackToDepartment(){

    window.location.href = "../index.html";

}

function openDoctorDirectory(specialty, department) {

    window.location.href =
        "doctor-directory/doctor-directory.html?specialty=" +
        encodeURIComponent(specialty) +
        "&department=" +
        encodeURIComponent(department);

}