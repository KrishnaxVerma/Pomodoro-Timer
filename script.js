let run=false;
let workdur, breakdur;
function play(event){
    event.preventDefault();
    s=Number(document.getElementById('wsec').value);
    m=Number(document.getElementById('wmin').value);
    h=Number(document.getElementById('whrs').value);
    workdur=3600*h+60*m+s;
    s=Number(document.getElementById('bsec').value);
    m=Number(document.getElementById('bmin').value);
    h=Number(document.getElementById('bhrs').value);
    breakdur=3600*h+60*m+s;
    run=true;
    timer();
}

document.getElementById('myform').addEventListener('submit', play);

function timeconvert(sec){
    let h=Math.floor(sec/3600);
    let m= Math.floor((sec/60) % 60);
    let s=sec%60;
    let hrs = (h < 10) ? "0" + h : h;
    let min = (m < 10) ? "0" + m : m;
    let secStr = (s < 10) ? "0" + s : s;

    return `${hrs}:${min}:${secStr}`;
}

async function timer() {
    while(run){

        let start=0;
        await new Promise((resolve)=>{
            let workinterval=setInterval(() => {
                document.getElementById('title').innerHTML="Work"
                document.getElementById('time').innerHTML=timeconvert(start);

                if(start==workdur){
                    clearInterval(workinterval);
                    resolve();
                }
                start++;
            }, 1000);
        })
        
        start=0;
        await new Promise((resolve)=>{
            let breakinterval=setInterval(() => {
                document.getElementById('title').innerHTML="Break"
                document.getElementById('time').innerHTML=timeconvert(start);

                if(start==breakdur){
                    clearInterval(breakinterval);
                    resolve();
                }
                start++;
            }, 1000);
        })

    }
}