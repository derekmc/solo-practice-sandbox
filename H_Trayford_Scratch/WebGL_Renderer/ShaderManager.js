//ShaderManager.js
import DefaultTileShader from './DefaultTileShader.js';
import DefaultSpriteShader from './DefaultSpriteShader.js';
/**
 * Abstracts the compiling and linking of shader programs
 * @typedef {Object} ShaderManager
 * @param {WebGLRenderingContext} gl The context for rendering to the canvas.
 * @param {Boolean} rotationAllowed true if any sprite will rotate around the z-axis (in/out of screen), false otherwise.
 */
function ShaderManager(gl, rotationAllowed) {
    const DEFAULT_TILE = new DefaultTileShader();
    const DEFAULT_SPRITE = new DefaultSpriteShader();

    const programs = {defaultTile:null, defaultSprite:null};
    const locations = {defaultTile:{}, defaultSprite:{}};//other program locations can be added and will look like name:{}

    /**
     * @description Provides a default tile shader which samples the supplied image and outputs appropriate color
     * @returns {WebGLProgram} The fully compiled and built gl program which is the default shader for rendering tile layers.
     */
    this.getDefaultTileShader = function() {
        if(programs.defaultTile === null) {
            buildDefaultTileProgram();
        }

        return programs.defaultTile;
    };

    /**
     * @description Provides a default shader for drawing sprites which samples the supplied image atlas and outputs appropriate color.
     * @returns {WebGLProgram} The fully compiled and built gl program which is the default shader for rendering sprites.
     */
    this.getDefaultSpriteShader = function() {
        if(programs.defaultSprite === null) {
            buildDefaultSpriteProgram(rotationAllowed);
        }

        return programs.defaultSprite;
    };

    /**
     * @description Compiles and links a shader program built from the shader strings provided.
     * @param {string} name The name of this program which will be used to retrieve this program later.
     * @param {string} vertexShaderString The string representing the vertex shader which will be compiled and linked into a shader program.
     * @param {string} fragmentShaderString The string representing the fragment shader which will be compiled and linked into a shader program.
     * @param {Array<String>} attributes An array of strings listing each attribute whose WebGL location is being requested.
     * @param {Array<String>} uniforms An array of strings listing each uniform whose WebGL location is being requested.
     * @returns {Boolean} true if the shader was successfully compiled and linked, false otherwise.
     */
    this.addShader = function(name, vertexShaderString, fragmentShaderString, attributes, uniforms) {
        programs[name] = getWebGLProgram(vertexShaderString, fragmentShaderString);
        setLocations(programs[name], attributes, uniforms);
        return (programs[name] != null);
    };

    /**
     * @description Gets the named shader program. Builds the default tile or or sprite shader if that is the requested shader and it hasn't
     * yet been built.
     * @param {string} name The name of the shader program provided when the shader was added.  
     * Use 'defaultTile' to get the default tile shader.  Use 'defaultSprite' to get the default sprite shader.
     * @returns {Boolean|undefined} The named shader or undefined if the requested (non-default) shader doesn't exist.
     */
    this.getShaderByName = function(name = 'defaultTile') {
        if((name === 'defaultTile') && (programs[name] === undefined)) {
            buildDefaultTileProgram();
        } else if((name === 'defaultSprite') && (programs[name] === undefined)) {
            buildDefaultSpriteProgram(rotationAllowed);
        }

        return programs[name];
    };

    /**
     * @description gets the locations of the attributes and uniforms for the named shader.
     * @param {string} name The name of the shader program provided when creating the shader of interest.  
     * Use 'defaultTile' to get the default tile shader.  Use 'defaultSprite' to get the default sprite shader.
     * @returns The WebGL locations for each uniform and attribute for the shader whose name is provided.
     */
    this.getLocations = function(name = 'defaultTile') {
        if((name === 'defaultTile') && (locations[name] === undefined)) {
            buildDefaultTileProgram();
        } else if((name === 'defaultSprite') && (locations[name] === undefined)) {
            buildDefaultSpriteProgram(rotationAllowed);
        }

        return locations[name];
    };

    this.setAttribData = function(buffer, data, location, elementCount = 2, drawHint = gl.STATIC_DRAW, type = gl.FLOAT, stride = 0, offset = 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, drawHint);

        gl.vertexAttribPointer(
            location, //Attribute location
            elementCount, //number of elements per attribute
            type, //Type of the elements
            gl.FALSE, //Is data normalized?
            stride * Float32Array.BYTES_PER_ELEMENT, //Stride
            offset * Float32Array.BYTES_PER_ELEMENT //Offset into buffer for first element of this type
        );

        gl.enableVertexAttribArray(location);
    }

    /** 
     * @description The default tile vertex shader as a string.
     * @returns {string} A string which can be used as a default vertex shader for drawing a tile layer
     */
    const getDefaultTileVertexShaderString = function() {
        //TODO: Can we remove the delta uniform and still allow a moving camera?
        return `
        precision mediump float;

        uniform vec2 delta;

        attribute vec2 vertPosition;
        attribute vec2 aTextureCoord;

        varying vec2 vTextureCoord;

        void main() {
            gl_Position = vec4(vertPosition.x + delta.x, vertPosition.y + delta.y, 0.0, 1.0);
            vTextureCoord = aTextureCoord;
        }
        `;
    };

    /** 
     * @description The default tile fragment shader as a string.
     * @returns {string} A string which can be used as a default fragment shader for drawing a tile layer
     */
    const getDefaultTileFragmentShaderString = function() {
        //this is the fragment shader used for the background and tile layers

        return `
        precision mediump float;

        varying vec2 vTextureCoord;

        uniform sampler2D sampler;

        void main(void) {
            gl_FragColor = texture2D(sampler, vTextureCoord);
        }
        `;
    };

    /** 
     * @description The default sprite vertex shader as a string.
     * @returns {string} A string which can be used as a default vertex shader for drawing a sprite
     */
    const getDefaultSpriteVertexShaderString = function() {
        return `
            precision mediump float;

            attribute vec2 deltaPos;
            attribute vec2 vertPosition;
            attribute vec2 aTextureCoord;
            attribute float bright;

            varying vec2 vTextureCoord;
            varying float brightness;

            void main() {
                gl_Position = vec4(vertPosition.x + deltaPos.x, vertPosition.y + deltaPos.y, 0.0, 1.0);
                vTextureCoord = aTextureCoord;
                brightness = bright;
            }
        `;
    }

    /** 
     * @description The default sprite fragment shader as a string.
     * @returns {string} A string which can be used as a default fragment shader for drawing a sprite
     */
    const getDefaultSpriteFragShaderString = function() {
        return `
            precision mediump float;

            varying vec2 vTextureCoord;
            varying float brightness;

            uniform sampler2D sampler;

            void main(void) {
                gl_FragColor = texture2D(sampler, vTextureCoord);
                gl_FragColor.r = clamp(gl_FragColor.r + brightness, 0.0, 1.0);
                gl_FragColor.g = clamp(gl_FragColor.g + brightness, 0.0, 1.0);
                gl_FragColor.b = clamp(gl_FragColor.b + brightness, 0.0, 1.0);
            }
        `;
    }

    //------Build a program using the two shaders--------//
    /**
     * @description Compiles and links the default tile shader.  Also sets the locations of the attributes and uniforms.
     */
    const buildDefaultTileProgram = function() {
        programs.defaultTile = getWebGLProgram(DEFAULT_TILE.getVertexString(), DEFAULT_TILE.getFragmentString());
        setLocations(DEFAULT_TILE);
    };

    /**
     * @description Compiles and links the default sprite shader.  Also sets the locations of the attributes and uniforms.
     * @param {Boolean} canRotate If false, uses a simpler shader which does not make rotation calculations.
     */
    const buildDefaultSpriteProgram = function(canRotate) {
        programs.defaultSprite = getWebGLProgram(DEFAULT_SPRITE.getVertexString(canRotate), DEFAULT_SPRITE.getFragmentString());
        setLocations(DEFAULT_SPRITE)
    };

    /**
     * @description Compiles and links the provided vertex and fragment shader strings to create a shader program.
     * @param {string} vertShader A string representing the vertex shader which will be used to compile and link into a shader program.
     * @param {string} fragShader A string representing the fragment shader which will be used to compile and link into a shader program.
     * @returns {WebGLProgram|null} A properly compiled and linked shader program or null if there was a problem with either step.
     */
    const getWebGLProgram = function(vertShader, fragShader) {
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(vertexShader, vertShader);
        gl.shaderSource(fragmentShader, fragShader);

        gl.compileShader(vertexShader);
        if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error('Error compiling Vertex Shader', gl.getShaderInfoLog(vertexShader));
            return null;
        }

        gl.compileShader(fragmentShader);
        if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Error compiling Fragment Shader', gl.getShaderInfoLog(fragmentShader));
            return null;
        }

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);
        if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Error linking program', gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    };

    /**
     * @description Gets the WebGL locations for all listed attributes and uniforms and saves them to the locations object for later use.
     * @param {ShaderObject} shaderObject The shader object whose locations are being set.
     */
    const setLocations = function(shaderObject) {
        locations[shaderObject.name] = shaderObject.getUniformLocations();
        Object.assign(locations[shaderObject.name], shaderObject.getAttributeLocations());
    };
}

export default ShaderManager;
