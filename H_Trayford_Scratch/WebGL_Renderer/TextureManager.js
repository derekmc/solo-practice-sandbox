//TextureManager.js
/**
 * 
 * @param {WebGLRenderingContext} gl The WebGL context retrieved from the canvas object
 */
function TextureManager(gl) {
    const TEX_LIST = [
        gl.TEXTURE0,
        gl.TEXTURE1,
        gl.TEXTURE2,
        gl.TEXTURE3,     
        gl.TEXTURE4,
        gl.TEXTURE5,
        gl.TEXTURE6,
        gl.TEXTURE7,
    ];

    let texIndex = 0;

    /**
     * @description Converts an HTMLImageElement (or HTMLCanvasElement) to a texImage2D
     * @param {HTMLImageElement or HTMLCanvasElement} image The image which will be used as a WebGL Texture.
     * @returns {Number} The number which represents the location of where this texture was bound.
     */
    this.setUpTexture = function(image) {
        // Tell WebGL we want to affect texture unit 0
        const currentTexure = TEX_LIST[texIndex];
        texIndex++;

        gl.activeTexture(currentTexure);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);


        //The tiles image is non-power of 2 dimensions, so WebGL1 can't do some things. Turn those things off
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

//        return (texIndex - 1);//this was the functioning return statement.
        return currentTexure;//I think this is semantically correct.  I also think it will turn out to be the same as texIndex - 1
    }
}

export default TextureManager;