"use strict";
//	build scene
let loaded = 0;
const viewer = document.querySelector('.viewer');
const loader = document.querySelector('h2 span');
const images = [];
for (let i = 1; i <= 120; ++i) {
    const img = new Image();
    img.src = `//s3-us-west-2.amazonaws.com/s.cdpn.io/68939/360-${('00' + i).slice(-3)}.jpg`;
    img.onload = () => loader.innerText = `${Math.round(++loaded / 120 * 360)}˚`;
    images.push(img);
    viewer.appendChild(img);
}

const threshold = 5;
const total = images.length - 1;
let frame = 0;
const impetus = new Impetus({
    source: document,
    update(x) {
        // console.log(x)
        images[frame].classList.remove('active');
        frame = Math.floor(-x / threshold) % total;
        frame = frame <= 0 ? total + frame : frame;
        images[frame].classList.add('active');
    }
});
images[frame].classList.add('active');
//	cursor
addEventListener('mousedown', e => document.body.style.cursor = 'grabbing');
addEventListener('mouseup', e => document.body.style.cursor = 'grab');