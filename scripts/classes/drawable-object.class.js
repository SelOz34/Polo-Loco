/**
 * Base class for everything that can be drawn onto the canvas.
 */
class DrawableObject {
    x = 0;
    y = 0;
    width = 100;
    height = 100;
    img;
    imageCache = {};
    currentImage = 0;
    offset = { top: 0, right: 0, bottom: 0, left: 0 };


    /**
     * Loads a single image and sets it as the current image.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Preloads several images into the image cache.
     * @param {string[]} paths - Paths to the image files.
     */
    loadImages(paths) {
        paths.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws the current image onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
     */
    draw(ctx) {
        if (this.img && this.img.complete && this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }


    /**
     * Returns the hitbox of the object, reduced by its offsets.
     * @returns {{left: number, right: number, top: number, bottom: number}} The hitbox edges.
     */
    getHitbox() {
        return {
            left: this.x + this.offset.left,
            right: this.x + this.width - this.offset.right,
            top: this.y + this.offset.top,
            bottom: this.y + this.height - this.offset.bottom
        };
    }


    /**
     * Checks whether this object overlaps with another object.
     * @param {DrawableObject} other - The object to check against.
     * @returns {boolean} True if both hitboxes overlap.
     */
    isColliding(other) {
        const a = this.getHitbox();
        const b = other.getHitbox();
        return a.right > b.left && a.left < b.right && a.bottom > b.top && a.top < b.bottom;
    }
}
