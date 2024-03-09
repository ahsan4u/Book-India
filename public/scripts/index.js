// home content scroll boxes {
const scrollBoxes = document.querySelectorAll('.scroll');
scrollBoxes.forEach((scrollBox, index)=> {
    const leftArrows = document.querySelectorAll('.left-arrow');
    leftArrows[index].addEventListener('click', (a)=> {
        let count =0;
        const intervalId =setInterval( function () {
            count -= 0.1;
            scrollBox.scrollBy(count, 0);
            if(count <= -6.2){ clearInterval(intervalId); }
        }, 2);
    });
});
scrollBoxes.forEach((scrollBox, index)=> {
    const rightArrows = document.querySelectorAll('.right-arrow');
    rightArrows[index].addEventListener('click', (a)=> {
        let count =0;
        const intervalId =setInterval( function () {
            count += 0.1;
            scrollBox.scrollBy(count, 0);
            if(count > 7.1){ clearInterval(intervalId); }
        }, 2);
    });
});
// }

