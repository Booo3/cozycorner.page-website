// Use window.onload, NOT DOMContentLoaded. 
// This ensures images are fully sized before doing math.
window.onload = () => {
    const col1 = document.getElementById('col1');
    const col2 = document.getElementById('col2');

    // 1. Clone the content directly into the columns
    col1.innerHTML += col1.innerHTML;
    col2.innerHTML += col2.innerHTML;

    // 2. Get exact pixel math (Divided by 2 because we doubled the content)
    // We add 10px (half your 20px gap) to account for the space between the original and clone
    const halfHeight1 = (col1.scrollHeight / 2) + 10; 
    const halfHeight2 = (col2.scrollHeight / 2) + 10;

    let y1 = 0;
    let y2 = halfHeight2; // Start col2 halfway down so it can scroll upwards smoothly

    // Adjust these to make it faster/slower
    const speed1 = 0.8; 
    const speed2 = 0.8; 

    function animate() {
        // --- COLUMN 1 (SCROLLING UP) ---
        y1 += speed1;
        // The Modulo (%) is the magic trick. 
        // If y1 is 1000.5 and halfHeight is 1000, y1 becomes 0.5. No pixel dropped!
        y1 = y1 % halfHeight1; 
        col1.style.transform = `translate3d(0, -${y1}px, 0)`;

        // --- COLUMN 2 (SCROLLING DOWN) ---
        y2 -= speed2;
        if (y2 <= 0) {
            // Add halfHeight to whatever is left over to preserve sub-pixels
            y2 += halfHeight2; 
        }
        col2.style.transform = `translate3d(0, -${y2}px, 0)`;

        // Run at monitor refresh rate
        requestAnimationFrame(animate);
    }

    // Start the loop
    requestAnimationFrame(animate);
};