document.getElementById('confetti-button').addEventListener('click', function() {
  var duration = 5 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createConfetti() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return;
    }

    var particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    }));
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    }));

    requestAnimationFrame(createConfetti);
  }

  createConfetti();
});

var apiKey = 'AIzaSyC9O-IBhyS5pAgGmMCNZialqSKxnG86ZpM';

var map;
var drawingManager;
var placeIdArray = [];
var polylines = [];
var snappedCoordinates = [];

var intersections = [[42.36145629, -71.07445181], [42.36146502, -71.07900274], [42.36087206, -71.08230096], [42.36123832, -71.07914119], [42.36106859, -71.07877831], [42.3677931, -71.07995869], [42.36386103, -71.07835073], [42.36004405, -71.08370724], [42.36148929, -71.07975099], [42.36164426, -71.07982694], [42.3614931, -71.07993847], [42.36149706, -71.08013377], [42.36788591, -71.08521164], [42.36693066, -71.09619985], [42.36504024, -71.08625517], [42.36416458, -71.09710901], [42.36283862, -71.09175777], [42.36083639, -71.09601287], [42.36103792, -71.09555385], [42.36173896, -71.0939827], [42.36001814, -71.08764318], [42.36398945, -71.08741666], [42.3625879, -71.08816587], [42.35924659, -71.08716285], [42.36043868, -71.08639098], [42.36077889, -71.08536277], [42.36111129, -71.08439224], [42.36419688, -71.08120726], [42.36386553, -71.07854703], [42.36426214, -71.0817535], [42.36407009, -71.08015805], [42.36443817, -71.08312085], [42.36428417, -71.08193238], [42.36736422, -71.08409883], [42.36656372, -71.07787901], [42.36784564, -71.08788774], [42.36677739, -71.07953928], [42.36757063, -71.08574117], [42.36704697, -71.08163177], [42.36843838, -71.09194995], [42.36806001, -71.09077967], [42.36811381, -71.09213588], [42.36774522, -71.09095951], [42.36594784, -71.08443373], [42.3651509, -71.07820685], [42.36660023, -71.08820103], [42.36637994, -71.08813878], [42.36502987, -71.0772825], [42.36536277, -71.07986351], [42.36615959, -71.08607604], [42.36568655, -71.08240611], [42.36709428, -71.09661932], [42.36750069, -71.09639567], [42.36665497, -71.09686002], [42.36762865, -71.09427531], [42.36796113, -71.0938034], [42.36734041, -71.09464724], [42.36831597, -71.09285669], [42.36665646, -71.09424673], [42.36602888, -71.09264432], [42.36689112, -71.09484358], [42.36275628, -71.08450482], [42.36479939, -71.08940942], [42.36536302, -71.09088833], [42.36760961, -71.09667436], [42.36229499, -71.08373088], [42.36640652, -71.0936055], [42.36636516, -71.09350245], [42.36580054, -71.09207028], [42.36267567, -71.0843255], [42.36711591, -71.09541648], [42.36788701, -71.07453709], [42.3630241, -71.07832393], [42.36723852, -71.07772193], [42.36699032, -71.07541183], [42.36630382, -71.09178229], [42.36726773, -71.09123177], [42.3683819, -71.09059615], [42.36182617, -71.08620171], [42.36803902, -71.08394178], [42.36852219, -71.0877187], [42.36782632, -71.08228985], [42.3674531, -71.07938222], [42.36824992, -71.08558774], [42.36767329, -71.0811206], [42.36651658, -71.09652809], [42.36504305, -71.09708658], [42.36718454, -71.09365819], [42.36631436, -71.09451324], [42.36748863, -71.0932285], [42.36690156, -71.09401447], [42.36770852, -71.09266355], [42.36515981, -71.09329754], [42.36190796, -71.0871443], [42.36602569, -71.09375333], [42.36250115, -71.08708274], [42.36487711, -71.08106341], [42.36235619, -71.08517342], [42.36794544, -71.08565582], [42.36528903, -71.08458345], [42.36441034, -71.08478866], [42.36667964, -71.08426193], [42.36791688, -71.07756358], [42.36333101, -71.07863998], [42.36453844, -71.07836353], [42.36222638, -71.07887753], [42.36588711, -71.07803494], [42.36189797, -71.09688434], [42.36714144, -71.08805211], [42.36271809, -71.08993355], [42.3684318, -71.09437229], [42.36678705, -71.09236912], [42.36551112, -71.0941327], [42.36485442, -71.09260862], [42.36619672, -71.09576597], [42.36821129, -71.07985658], [42.36850471, -71.0821304], [42.36812968, -71.07922511], [42.36830836, -71.08057445], [42.36394291, -71.08340525], [42.3656976, -71.07665206], [42.36732493, -71.09254106], [42.3650926, -71.08274647], [42.36474226, -71.08000939], [42.36496698, -71.08176687], [42.36185324, -71.07967833], [42.36188165, -71.08008898], [42.361845, -71.0795753], [42.36311032, -71.0952787], [42.36298247, -71.09363471], [42.36220313, -71.08423969], [42.36321603, -71.09670052], [42.36203894, -71.08214476], [42.36833627, -71.09609233], [42.36771565, -71.09519035], [42.36016239, -71.09488308], [42.36139748, -71.09695362], [42.36033968, -71.08389874], [42.36000271, -71.08385407], [42.36244417, -71.09536466], [42.36389229, -71.0931579], [42.36385134, -71.08345873], [42.3661008, -71.0796952], [42.36687891, -71.08590311], [42.36639701, -71.08200134], [42.3638813, -71.09661458], [42.36255165, -71.09679367], [42.36335542, -71.08380073], [42.36487177, -71.09626706]];
var edges = [[7, 137], [23, 137], [20, 23], [20, 24], [24, 25], [25, 26], [26, 137], [26, 130], [65, 130], [65, 69], [21, 69], [21, 22], [22, 95], [93, 95], [78, 93], [24, 78], [7, 24], [25, 97], [69, 97], [7, 69], [22, 69], [22, 109], [16, 109], [16, 129], [19, 129], [7, 19], [19, 19], [16, 19], [7, 16], [18, 19], [18, 139], [139, 146], [131, 146], [128, 131], [128, 129], [7, 129], [129, 129], [113, 129], [68, 113], [63, 68], [62, 63], [7, 62], [62, 131], [70, 131], [70, 110], [7, 110], [62, 110], [46, 62], [43, 46], [43, 50], [48, 50], [44, 48], [44, 47], [7, 47], [45, 47], [45, 108], [108, 143], [101, 143], [101, 144], [142, 144], [106, 142], [7, 106], [106, 106], [44, 106], [7, 44], [44, 101], [43, 101], [7, 43], [43, 143], [49, 143], [7, 49], [49, 144], [38, 144], [33, 38], [33, 101], [7, 101], [33, 37], [37, 143], [7, 143], [35, 37], [35, 108], [7, 108], [35, 80], [80, 83], [83, 83], [79, 83], [79, 79], [7, 83], [68, 83], [68, 75], [75, 111], [57, 111], [42, 57], [42, 75], [7, 75], [38, 75], [38, 84], [84, 118], [118, 118], [116, 118], [116, 116], [81, 116], [79, 81], [7, 79], [79, 142], [36, 142], [34, 36], [34, 73], [73, 82], [82, 117], [102, 117], [102, 102], [117, 118], [7, 118], [28, 118], [28, 47], [47, 120], [74, 120], [71, 74]] // [[20, 23], [20, 24], [24, 25], [25, 26], [26, 137], [2, 137], [2, 23], [2, 7], [4, 7], [4, 23], [4, 24], [24, 78], [78, 93], [93, 95], [22, 95], [20, 22], [22, 109], [109, 129], [68, 129], [62, 68], [46, 62], [43, 46], [43, 101], [101, 144], [50, 144]]; // [[20,25], [20, 23], [20, 24], [24, 25], [25, 26], [26, 137], [23, 137], [7, 137], [7, 138], [23, 138], [137, 138], [2, 137], [2, 23], [2, 7], [3, 7], [1, 3], [1, 105], [23, 105], [3, 23], [105, 127], [125, 127], [9, 125], [8, 9], [8, 10], [10, 11], [11, 126], [23, 126], [126, 132], [65, 132], [65, 130], [23, 130], [65, 69], [61, 69], [23, 61], [61, 65], [20, 130], [20, 22], [22, 23], [22, 95], [93, 95], [78, 93], [23, 78], [24, 78], [23, 24], [25, 97], [23, 97], [26, 97], [26, 130], [97, 130], [95, 97], [23, 95], [21, 22], [21, 23], [21, 61], [22, 61], [22, 109], [23, 109], [62, 109], [23, 62], [21, 62], [62, 63], [23, 63], [46, 62], [23, 46], [45, 46], [23, 45], [45, 108], [23, 108], [108, 143], [23, 143], [49, 143], [23, 49], [46, 49], [43, 49], [23, 43], [43, 50], [23, 50], [50, 122], [23, 122], [99, 122], [23, 99], [99, 100], [23, 100], [100, 119], [23, 119], [32, 119], [23, 32], [29, 32], [23, 29], [29, 31], [23, 31], [31, 122], [122, 124], [23, 124], [32, 124], [96, 124], [23, 96], [27, 96], [23, 27], [27, 32], [32, 96], [96, 123], [23, 123], [30, 123], [23, 30], [27, 30], [28, 30], [23, 28], [104, 123], [23, 104], [28, 104], [28, 143], [101, 143], [23, 101], [43, 101], [101, 144], [23, 144], [50, 144], [142, 144], [23, 142], [48, 142], [106, 142], [23, 106], [44, 106], [23, 44], [44, 48], [23, 48], [48, 106], [106, 120], [23, 120], [47, 120], [23, 47], [6, 47], [6, 23], [6, 106], [34, 106], [23, 34], [34, 36], [23, 36], [36, 142], [38, 144], [23, 38], [33, 38], [23, 33], [33, 101], [46, 101], [49, 62], [21, 49], [21, 45], [42, 45], [23, 42], [33, 42], [33, 79], [23, 79], [79, 84], [23, 84], [38, 84], [84, 118], [23, 118], [116, 118], [23, 116], [81, 116], [23, 81], [79, 116], [79, 83], [23, 83], [37, 83], [23, 37], [33, 37], [37, 143], [35, 37], [23, 35], [35, 108], [35, 80], [23, 80], [80, 83], [115, 118], [23, 115], [115, 117], [23, 117], [5, 115], [5, 23], [5, 84], [5, 82], [23, 82], [36, 82], [73, 82], [23, 73], [34, 73], [34, 82], [82, 117], [102, 117], [23, 102], [73, 102], [73, 117], [63, 80], [63, 68], [23, 68], [63, 75], [23, 75], [42, 75], [42, 109], [16, 109], [16, 23], [16, 63], [63, 113], [113, 140], [23, 140], [42, 140], [41, 42], [23, 41], [41, 57], [23, 57], [55, 57], [23, 55], [55, 89], [23, 89], [89, 111], [23, 111], [75, 111], [55, 75], [55, 56], [23, 56], [56, 90], [23, 90], [87, 90], [23, 87], [55, 87], [54, 55], [23, 54], [54, 90], [58, 90], [23, 58], [67, 90], [23, 67], [58, 67], [59, 67], [23, 59], [59, 68], [59, 92], [23, 92], [92, 113], [23, 113], [68, 113], [16, 68], [16, 129], [23, 129], [129, 131], [23, 131], [15, 131], [15, 23], [131, 146], [23, 146], [107, 146], [23, 107], [107, 136], [23, 136], [17, 136], [17, 23], [17, 18], [18, 23], [18, 139], [23, 139], [139, 146], [128, 139], [23, 128], [19, 139], [19, 23], [19, 129], [16, 19], [16, 17], [17, 135], [23, 135], [19, 135], [19, 109], [109, 137], [7, 20], [7, 23], [20, 91], [89, 91], [87, 89], [54, 56], [39, 41]]; // pairs of indexs of intersections
var initialPathCoordinates = []; // initial path
var initialPathIndexs = []; // initial path indexs
var initialPathEdges = []; // initial path edges
var notFoundEdges = new Set();

var adjEdges = [] // edgeindex -> list of edgeindexs that share a intersection with it. 
var probabilities = [] // edge index -> probability
const T = 1; // number of seconds to time evolve
const pswitch = (T / (4*240.0)) + 0.0; // probability of switching to adjacent edge 
const pfind = (T / 240.0) + 0.0;

var initialTime = 64350;
var finalTime = 64380;
var currentTime = 55900;
var delay = 10;

var l1 = 0;
var l2 = 0;
var curEdge = 0;

$(function(){
  setInterval(mainFunc, T * 1000);
  });
  
  function mainFunc() {
    
    if (temperf < delay) {
      temperf += 1;
      return;
    }
    if (temperf == delay) {
      geoFindMe()
    }
    // stuff you want to do every second
    
    closestEdgeNumber();
    updateProbs();
    console.log(probabilities);
    console.log(l1 + ', ' + l2)
    clear();
    render();
    
  }

function lineToPoint(x1, y1, x2, y2) {
  let my_A = y2 - y1;
  let my_B = x1 - x2;
  let numerator = Math.abs(my_A * l1 + my_B * l2 + y1 * (x2 - x1) - x1 * (y2 - y1));
  return numerator / Math.sqrt(my_A * 2 + my_B * 2);
}

function closestEdgeNumber(){
  let lineDists = [];
  let distsOnly = [];
  for (let cter = 0; cter < edges.length; cter++) {
    let e = edges[cter];
    let [p1, p2] = e;
    let [x1, y1] = intersections[p1];
    let [x2, y2] = intersections[p2];
    let v1 = [l1 - x1, l2 - y1];
    let v2 = [x2 - x1, y2 - y1];
    let v3 = [l1 - x2, l2 - y2];
    let v4 = [x1 - x2, y1 - y2];
    if (v1[0] * v2[0] + v1[1] * v2[1] > 0 && v3[0] * v4[0] + v3[1] * v4[1] > 0) {
      let my_D = lineToPoint(x1, y1, x2, y2);
      lineDists.push([cter, my_D]);
      distsOnly.push(my_D);
    }
  }
  let val = distsOnly.indexOf(Math.min(...distsOnly));
  curEdge = lineDists[val];
}


function updateProbs() {
  probabilities[curEdge] *= (1 - pfind);
  normalizeProbabilities();
  timeEvolveProbabilities();
}


var temperf = 0;

function rgbToHex(r, g, b) {
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  // Ensure that the input values are within the valid range (0-255)
  
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  // Convert each component to a hexadecimal string and concatenate them
  var hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  // Add leading zeros if necessary (e.g., "00", "0A", "1F")
  while (hex.length < 6) {
      hex = '0' + hex;
  }

  // Prepend '#' to the hex code
  return '#' + hex;
}

function findColor(prob){
  const r = prob*254;
  const b = (1-prob)*254;
  return rgbToHex(r, r, b)
}

function clear() {
  for (var i = 0; i < polylines.length; ++i) {
    polylines[i].setMap(null);
  }
  polylines = [];
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

function render() {
  maxProb = 0;
  minProb = 1;
  for (var p of probabilities) {
    maxProb = Math.max(maxProb, p);
    minProb = Math.min(minProb, p);
  }

  colors = []
  for (var p of probabilities) {
    colors.push(findColor((p - minProb) / (maxProb - minProb) + 0.0));
  }

  // console.log(colors);


  temperf += 1;
  for (var stuff = temperf%20; stuff < temperf%20 + 1; stuff++) {
    var ps = [];
    var n1 = edges[stuff][0];
    var n2 = edges[stuff][1];
    var s1 = intersections[n1][0] + ',' + intersections[n1][1];
    var s2 = intersections[n2][0] + ',' + intersections[n2][1];
    
    ps = [s1, s2] // comma sep lat and long
    $.get('https://roads.googleapis.com/v1/snapToRoads', {
      interpolate: true,
      key: apiKey,
      path: ps.join('|')
    }, function(data) {
      processSnapToRoadResponse(data);
      if (stuff % 5 == 2) {
        console.log(colors[stuff]);
      }
      // drawSnappedPolyline("#Ff00FF");
      drawSnappedPolyline(colors[stuff]);
      
    });
    
    // sleep(1000);
    // snappedCoordinates = []
    // polylines = []
    // clear();
  }
  
}


function initialize() {
  
  probabilities = [];
  for (let i = 0; i < edges.length; i++) {
    probabilities.push(0);
  }
  console.log(probabilities)
  var temper = 0;
  for (let e of edges) {
    let [x, y] = e;
    let cur = [];
    for (let p_cter = 0; p_cter < edges.length; p_cter++) {
        let p = edges[p_cter];
        let [x1, y1] = p;
        if ((x1 === x && y1 !== y) || (x1 !== x && y1 === y) || (x1 === y && y1 !== x) || (x1 !== y && y1 === x)) {
            cur.push(p_cter);
        }
    }
    adjEdges.push(cur);
    temper = Math.max(cur.length, temper)
}
console.log("AGJOIDSJFPOI");
console.log(adjEdges);
console.log(temper)



  var mapOptions = {
    zoom: 17,
    center: {lat: 42.36032485961914, lng: -71.08727264404297,}
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Adds a Places search box. Searching for a place will center the map on that
  // location.
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      document.getElementById('bar'));
  var autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autoc'));
  autocomplete.bindTo('bounds', map);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
  });

  // Enables the polyline drawing control. Click on the map to start drawing a
  // polyline. Each click will add a new vertice. Double-click to stop drawing.
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYLINE,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYLINE
      ]
    },
    polylineOptions: {
      strokeColor: '#FF0000',
      strokeWeight: 2,
      strokeOpacity: 0.3,
    }
  });
  drawingManager.setMap(map);

  // Snap-to-road when the polyline is completed.
  drawingManager.addListener('polylinecomplete', function(poly) {
    var path = poly.getPath();
    polylines.push(poly);
    placeIdArray = [];
    runSnapToRoad(path);
  });


  // Clear button. Click to remove all polylines.
  document.getElementById('clear').addEventListener('click', function(event) {
    event.preventDefault();
    for (var i = 0; i < polylines.length; ++i) {
      polylines[i].setMap(null);
    }
    polylines = [];
    return false;
  });
}

// Snap a user-created polyline to roads and draw the snapped path
function runSnapToRoad(path) {
  var pathValues = []; // list of strings
  for (var i = 0; i < path.getLength(); i++) {
    pathValues.push(path.getAt(i).toUrlValue());
  }

  // initialPathCoordinates = pathValues; // list of lists 

  for (var s of pathValues) {
    var s1 = s.split(',')
    initialPathCoordinates.push([parseFloat(s1[0]), parseFloat(s1[1])]);
  }
  console.log("INTIAL PATH COORDS")
  console.log(initialPathCoordinates);



  pathCoordinatesToEdges();


  $.get('https://roads.googleapis.com/v1/snapToRoads', {
    interpolate: true,
    key: apiKey,
    path: pathValues.join('|')
  }, function(data) {
    processSnapToRoadResponse(data);
    drawSnappedPolyline('#bc6cFF');
  });

  computeInitialProbabilities();

}

function pathCoordinatesToEdges() {
  for (var c1 of initialPathCoordinates) {
      var bestindex = 0;
      for (let i = 0; i < intersections.length; i++) {
          var curDistance = (intersections[i][0] - c1[0]) ** 2 + (intersections[i][1] - c1[1]) ** 2;
          var bestDistance = (intersections[bestindex][0] - c1[0]) ** 2 + (intersections[bestindex][1] - c1[1]) ** 2;
          if (curDistance <= bestDistance) {
              bestindex = i;
          }
      }
      initialPathIndexs.push(bestindex);
  }
  console.log("INITIAL PATH INDEXS")
  console.log(initialPathIndexs)

  // generate edges
  for (let i = 1; i < initialPathIndexs.length; i++) {
    var i1 = initialPathIndexs[i-1];
    var i2 = initialPathIndexs[i];
    var i3 = Math.min(i1, i2);
    var i4 = Math.max(i1, i2);
    
    // (i3, i4) is an edge. 
    // find which edge it is
    var e1 = -1;
    for (var j = 0; j < edges.length; j++) {
      if (edges[j][0] == i3 && edges[j][1] == i4) {
        e1 = j;
      }
    }

    if (e1 < 0) {
      // console.log("Not an edge" + i3 + ' ' + i4);
      
      notFoundEdges.add(`${i3}_${i4}`)
    } else {
      initialPathEdges.push(e1);
    }
}
console.log("INTIAL PATH EDGES")
console.log(initialPathEdges);
console.log("NOT FOUND: ")
console.log(notFoundEdges);

}


function normalizeProbabilities() {
  var s = 0;
  for (var s1 of probabilities) {
    s += s1;
  }

  s = 1.0 / s;

  for (let i = 0; i < probabilities.length; i++) {
    probabilities[i] *= s;
  }
}

function timeEvolveProbabilities() {
  // for every state, some change go to an adjacent state. 
  newProbabilities = [];
  // console.log(probabilities.length);
  // console.log(edges.length)
  for (let i = 0; i < edges.length; i++) {
    newProbabilities.push(probabilities[i]);
    // go from this to an adjacent edge
  }

  for (let i = 0; i < edges.length; i++) {
    for (var j of adjEdges[i]) {
      var delta = probabilities[i] * pswitch;
      newProbabilities[i] -= delta;
      newProbabilities[j] += delta;
    }
  }
  probabilities = newProbabilities;
}

function computeInitialProbabilities() {
  // given edges, initial, final, and current time.
  // initialize all the probabilities
  // time evolve initial conditions.

  initialTime = getCurrentTime() - 5;
  finalTime = getCurrentTime() - 2;
  
  console.log(probabilities);

  var iterations = Math.ceil((finalTime - initialTime) / T); // iteration number [0, iterations)
  var numEdges = initialPathEdges.length;
  var timePerEdge = Math.ceil(iterations / numEdges);
  
  for (var i = 0; i < timePerEdge * numEdges; i++) {
    if (i % timePerEdge == 0) {
      // add next edge
      probabilities[initialPathEdges[Math.floor(i / timePerEdge)]] += 1.0 / (numEdges + 0.0);
    }
    // time evolve
    timeEvolveProbabilities();
  }
  currentTime = getCurrentTime();

  for (var i = 0; i < Math.floor((currentTime - finalTime) / T); i++) {
    timeEvolveProbabilities();
  }

  s = 0;
  for (var s1 of probabilities) {
    s += s1;
  }

  console.log(probabilities);
  console.log(s);

}

// Store snapped polyline returned by the snap-to-road service.
function processSnapToRoadResponse(data) {
  snappedCoordinates = [];
  placeIdArray = [];
  for (var i = 0; i < data.snappedPoints.length; i++) {
    var latlng = new google.maps.LatLng(
        data.snappedPoints[i].location.latitude,
        data.snappedPoints[i].location.longitude);
    snappedCoordinates.push(latlng);
    placeIdArray.push(data.snappedPoints[i].placeId);
  }
}

// Draws the snapped polyline (after processing snap-to-road response).
function drawSnappedPolyline(col) {
  var snappedPolyline = new google.maps.Polyline({
    path: snappedCoordinates,
    strokeColor: col, // col, // previously add8e6
    strokeWeight: 4,
    strokeOpacity: 0.8,
  });

  snappedPolyline.setMap(map);
  polylines.push(snappedPolyline);
}

function handleTimeSubmit(timeValue1, timeValue2) {
  // This function handles the submission of the time value
  initialTime = convertToSeconds(timeValue1)
  finalTime = convertToSeconds(timeValue2)
}

function getCurrentTime(){
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  return (currentHour*60+currentMinute) * 60;
}

function convertToSeconds(timeString) {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(':').map(Number);
  // Calculate the total seconds
  const totalSeconds = (hours * 60 + minutes) * 60;
  console.log(totalSeconds)
  return totalSeconds;
}

function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  mapLink.href = "";
  mapLink.textContent = "";

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    l1 = latitude;
    l2 = longitude;

    status.textContent = "";
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector("#find-me").addEventListener("click", geoFindMe);

$(document).ready(function() {
  $('#submitTime').click(function() { // Event listener for the submit button
    var timeValue1 = $('#timeInput1').val(); // Get the value from the time input field
    var timeValue2 = $('#timeInput2').val();
    handleTimeSubmit(timeValue1, timeValue2); // Call the JavaScript function with the time value
  });
});

$(window).load(initialize);