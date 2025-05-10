class WebGLContext
{
    /**@type {WebGL2RenderingContext} */
    static #context;

    static CreateContext(canvas)
    {
        this.#context = canvas.getContext("webgl2");
        if (!this.#context)
        {
            throw new Error("Could not initialise WebGl2 context");
        }

        return this.#context;
    }

    static Get()
    {
        return this.#context;
    }
}

export default WebGLContext;