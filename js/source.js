import VertexBuffer from "./core/vertex-buffer.js";
import WebGLContext from "./core/webgl-context.js";
import Shader from "./graphics/shader.js";

const canvas = document.getElementById("webgl-canvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const gl = WebGLContext.CreateContext(canvas);

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

const shader = new Shader(vertexShaderSource, fragmentShaderSource);
shader.Bind();

const vertices = new Float32Array([
     0.0,  0.5,
    -0.5, -0.5,
     0.5, -0.5
]);

const VAO = gl.createVertexArray();
gl.bindVertexArray(VAO);

const VBO = new VertexBuffer(vertices, gl.STATIC_DRAW);

gl.vertexAttribPointer(0, 2, gl.FLOAT, false, vertices.BYTES_PER_ELEMENT * 2, 0);
gl.enableVertexAttribArray(0);

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