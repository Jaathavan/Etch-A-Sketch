const gridLayout = document.getElementById('grid-container');

let mouseDown = false;

//check is mouse down and update mouseDown value
document.body.onmousedown = () => {
    mouseDown = true;
};

//check if mouse is up and updates mousDown value
document.body.onmouseup = () => {
    mouseDown = false;
};

//changes color of root element
function changeColor() {
    let root = document.documentElement;
    root.style.setProperty('--grid-color', document.getElementById("colorpicker").value)
}

//darken and blend colors
const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

let checkBox = document.querySelector('#check');

function createGrid(num) {
    gridLayout.style.setProperty('--grid', num)
    for (let i=0; i < (num**2); i++) {
        let gridBox = document.createElement("div");
        gridLayout.appendChild(gridBox).className = "grid-item";
        gridBox.addEventListener('mouseover', () => {
            if (mouseDown === true) {
                if (checkBox.checked) {
                    let randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
                    gridBox.style.backgroundColor = randomColor;
                }
                else if ([...gridBox.style].some(k => k.startsWith("background") && Boolean(gridBox.style[k]))) {
                    gridBox.style.backgroundColor = pSBC( -0.5, gridBox.style.backgroundColor);
                }
                else {
                    gridBox.style.backgroundColor = document.getElementById("colorpicker").value;
                }
            }
        })
        gridBox.addEventListener('mousedown', () => {
            if (checkBox.checked) {
                let randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
                gridBox.style.backgroundColor = randomColor;
            }
            else if ([...gridBox.style].some(k => k.startsWith("background") && Boolean(gridBox.style[k]))) {
                gridBox.style.backgroundColor = pSBC( -0.5, gridBox.style.backgroundColor);
            }
            else {
                gridBox.style.backgroundColor = document.getElementById("colorpicker").value;
            }
        })
    }
}

createGrid(16);

const rangeInputs = document.querySelectorAll('input[type="range"]');
const numberInput = document.querySelector('input[type="number"]');

function handleInputChange(e) {
  let target = e.target;
  if (e.target.type !== 'range') {
    target = document.getElementById('range');
  } 
  const min = target.min;
  const max = target.max;
  const val = target.value;
  
  const gridItems = document.querySelectorAll('.grid-item');

  if (gridItems.length > 0) {
    gridItems.forEach (g => {
        g.remove();
    })
  }
  
  createGrid(val);

  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange);
})

numberInput.addEventListener('input', handleInputChange);