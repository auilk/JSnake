const canvas = document.getElementById("webgl-canvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

/** @type {WebGL2RenderingContext} */
const gl = canvas.getContext("webgl2");

if (!gl)
{
    throw new Error("Could not initialise WebGl2 context");
}

const vertexShaderSource = 
`   #version 300 es
    precision mediump float;
    
    in vec2 aPosition;
        
    void main()
    {
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`;

const fragmentShaderSource = 
`   #version 300 es
    precision mediump float;
    
    out vec4 FragColor;
    
    void main()
    {
        FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

gl.detachShader(shaderProgram, vertexShader);
gl.deleteShader(vertexShader);

gl.detachShader(shaderProgram, fragmentShader);
gl.deleteShader(fragmentShader);

const vertices = new Float32Array([
     0.0,  0.5,
    -0.5, -0.5,
     0.5, -0.5
]);

const VAO = gl.createVertexArray();
gl.bindVertexArray(VAO);

const VBO = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const aPosLoc = gl.getAttribLocation(shaderProgram, "aPosition");
gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, vertices.BYTES_PER_ELEMENT * 2, 0);
gl.enableVertexAttribArray(aPosLoc);

gl.clearColor(0.1, 0.1, 0.1, 1.0);

function GameLoop()
{
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(GameLoop);
}

function ResizeCallback()
{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", ResizeCallback);
GameLoop();