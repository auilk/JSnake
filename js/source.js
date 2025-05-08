const canvas = document.getElementById("webgl-canvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

/** @type {WebGL2RenderingContext} */
const gl = canvas.getContext("webgl2");

if (!gl)
{
    throw new Error("Could not initialise WebGl2 context");
}

function ResizeCallback()
{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

window.addEventListener("resize", ResizeCallback);