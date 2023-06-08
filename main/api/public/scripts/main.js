document.addEventListener("DOMContentLoaded", () => {
    
    // Animation Section for Pointer

    let pointer = document.getElementById("pointer-follow");

    // Event Listener for Mouse Movements
    document.addEventListener("mousemove", (e) => {
        pointer.style.top = e.pageY + "px";
        pointer.style.left = e.pageX + "px";
    });

    // Event Listener for Touch Movements
    document.addEventListener("touchmove", (e) => {
        pointer.style.top = e.pageY + "px";
        pointer.style.left = e.pageX + "px";
    });

});