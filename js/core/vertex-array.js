import VertexBuffer from "./vertex-buffer.js";
import WebGLContext from "./webgl-context.js";

class VertexArray
{
    #vertexArray;
    #buffers;
    #gl;

    constructor()
    {
        this.#buffers = new Map();
        this.#gl = WebGLContext.Get();

        this.#CreateVertexArray();
    }

    #CreateVertexArray()
    {
        this.#vertexArray = this.#gl.createVertexArray()
        this.#gl.bindVertexArray(this.#vertexArray);
    }

    AddStaticVBO(nameID, data)
    {
        this.#buffers.set(nameID, new VertexBuffer(data, this.#gl.STATIC_DRAW));
    }

    Bind()
    {
        this.#gl.bindVertexArray(this.#vertexArray);
    }

    Unbind()
    {
        this.#gl.bindVertexArray(0);
    }

    DeleteBuffer(nameID)
    {
        this.#buffers.delete(nameID);
    }

    Delete()
    {
        this.#gl.deleteVertexArray(this.#vertexArray);
    }
}

export default VertexArray;