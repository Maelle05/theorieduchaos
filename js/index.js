
let r1 = 200;
let r2 = 200;
let m1 = 20;
let m2 = 20;
let a1 = 3.14/2;
let a2 = 3.14/2;
let a1_v = 0;
let a2_v = 0;
let g = 1; 
let points = [];

function addpoints(x,y) {
  if (points.length > 100) {
    points.shift()
    points.push([x,y]);
  }else{
    points.push([x,y]);
  }
}

const width = window.innerWidth
const heigt = window.innerHeight

function setup() {
  // size(600,600);
  const canvas = createCanvas(width, heigt);  
  canvas.parent('canvasContener');
}

function draw() { 

  //-g = gravity --> formule acceleration a1 et a2 double pendule
  // decomposition du calcul

  let num1 = -g * (2 * m1 + m2) * sin(a1) ; 
  let num2 = -m2 * g * sin( a1 - 2 * a2) ;
  let num3 = -2 * sin(a1 - a2) * m2 ;
  let num4 = a2_v*a2_v*r2 + a1_v*a1_v * r1 * cos(a1 -a2) ;
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2)) ;
  let a1_a =  ( num1 + num2 + num3 * num4) / den ;                         // acceleration 1 


  num1 = 2 * sin(a1-a2) ;
  num2 = (a1_v*a1_v*r1*(m1+m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v*a2_v*r2*m2*cos(a1-a2);
  den = r2 * (2 *  m1 + m2 - m2 * cos(2 * a1 - 2 * a2)) ;

  let a2_a = (num1*(num2+num3+num4)) / den;                         // acceleration 2

  background(255);
  stroke(0);
  strokeWeight(2);

  translate(width/2 , heigt/3)
  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);

  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);

  line(0,0,x1,y1);
  fill(0)
  ellipse(x1,y1,m1,m1)
  line(x1,y1,x2,y2);
  fill(0)
  ellipse(x2,y2,m2,m2)

  addpoints(x2,y2)

  for (let i = 0; i < points.length ; i++) {
    ellipse(points[i][0],points[i][1],5,5)
  }

  // console.log(points)
  
  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;
  

}

