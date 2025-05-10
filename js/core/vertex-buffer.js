import WebGLContext from "./webgl-context.js";

class VertexBuffer
{
    #buffer;
    #gl;

    constructor(data, drawMode)
    {
        this.#gl = WebGLContext.Get();

        this.#CreateBuffer(data, drawMode);
    }

    #CreateBuffer(data, drawMode)
    {
        this.#buffer = this.#gl.createBuffer();
        this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#buffer);
        this.#gl.bufferData(this.#gl.ARRAY_BUFFER, data, drawMode);
    }

    Bind()
    {
        this.#gl.bindBuffer(this.#buffer);
    }

    Unbind()
    {
        this.#gl.bindBuffer(0);
    }

    Delete()
    {
        this.#gl.deleteBuffer(this.#buffer);
    }
}

export default VertexBuffer;