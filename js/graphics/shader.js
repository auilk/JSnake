import WebGlContext from "../core/webgl-context.js";

class Shader
{
    #program;
    #gl;

    constructor(vertSource, fragSource)
    {
        this.#gl = WebGlContext.Get();

        const vertexShader = this.#CreatShader(this.#gl.VERTEX_SHADER ,vertSource);
        const fragmentShader = this.#CreatShader(this.#gl.FRAGMENT_SHADER, fragSource);

        this.#program = this.#CreateProgram(vertexShader, fragmentShader);

        this.#gl.detachShader(this.#program, vertexShader);
        this.#gl.deleteShader(vertexShader);

        this.#gl.detachShader(this.#program, fragmentShader);
        this.#gl.deleteShader(fragmentShader);
    }

    #CreatShader(type, source)
    {
        const shader = this.#gl.createShader(type);
        this.#gl.shaderSource(shader, source);
        this.#gl.compileShader(shader);

        if (!this.#gl.getShaderParameter(shader, this.#gl.COMPILE_STATUS))
        {
            const infoLog = this.#gl.getShaderInfoLog(shader);
            switch (type)
            {
                case this.#gl.VERTEX_SHADER:
                    console.error(`Vertex shader failed to compile:\n${infoLog}`);
                case this.#gl.FRAGMENT_SHADER:
                    console.error(`Fragment shader failed to compile:\n${infoLog}`);
            }
        }

        return shader;
    }

    #CreateProgram(vertexShader, fragmentShader)
    {
        const program = this.#gl.createProgram();
        this.#gl.attachShader(program, vertexShader);
        this.#gl.attachShader(program, fragmentShader);
        this.#gl.linkProgram(program);

        if(!this.#gl.getProgramParameter(program, this.#gl.LINK_STATUS))
        {
            const infoLog = this.#gl.getProgramInfoLog(program);
            console.error(`Program failed to link: ${infoLog}`);
        }

        return program;
    }

    Bind()
    {
        this.#gl.useProgram(this.#program);
    }

    Unbind()
    {
        this.#gl.useProgram(0);
    }

    Delete()
    {
        this.#gl.deleteProgram(this.#program);
    }
}

export default Shader;