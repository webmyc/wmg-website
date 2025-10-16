#!/usr/bin/env python3

from PIL import Image
import os

def create_transparent_logo(input_path, output_path):
    """Create a truly transparent version of the logo by removing background elements."""
    
    # Load the image and convert to RGBA
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size
    
    # Create a new image with transparent background
    transparent_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    
    # Get pixel data
    pixels = img.load()
    transparent_pixels = transparent_img.load()
    
    # Process each pixel
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Strategy: Keep only bright golden/yellow elements
            # Remove dark backgrounds and olive green backgrounds
            
            # Check if this is a golden/yellow element (bright yellow/gold colors)
            is_golden = (
                (r > 150 and g > 150 and b < 100) or  # Bright yellow/gold
                (r > 180 and g > 180 and b < 120) or  # Very bright yellow/gold
                (r > 200 and g > 200 and b < 140)     # Extremely bright yellow/gold
            )
            
            # Check if this is a dark background element
            is_dark_background = (
                (r < 40 and g < 40 and b < 40) or     # Very dark
                (r < 80 and g < 80 and b < 80) or     # Medium dark
                (g > r + 5 and g > b + 5 and g < 100 and r < 80 and b < 80)  # Dark olive green
            )
            
            # Keep the pixel if it's golden/bright, otherwise make it transparent
            if is_golden and not is_dark_background:
                transparent_pixels[x, y] = (r, g, b, a)
            elif r > 120 and g > 120 and b > 80:  # Keep other bright elements
                transparent_pixels[x, y] = (r, g, b, a)
            else:
                transparent_pixels[x, y] = (0, 0, 0, 0)  # Make transparent
    
    # Save the result
    transparent_img.save(output_path, 'PNG', optimize=True, compress_level=9)
    
    print(f"Transparent logo created: {output_path}")
    print(f"Size: {width}x{height}")
    print("✅ Logo processing complete!")

if __name__ == "__main__":
    input_path = 'img/Untitled design - 2025-10-16T230239.851.png'
    output_path = 'public/logo.png'
    
    if not os.path.exists(input_path):
        print(f"Error: Input file not found at {input_path}")
        exit(1)
    
    create_transparent_logo(input_path, output_path)
