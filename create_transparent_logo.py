#!/usr/bin/env python3

from PIL import Image
import numpy as np
import os

def create_transparent_logo(input_path, output_path):
    """Create a truly transparent version of the logo by removing all background elements."""
    
    # Load the image and convert to RGBA
    img = Image.open(input_path).convert('RGBA')
    data = np.array(img)
    
    # Get color channels
    r, g, b, a = data.T
    
    # Strategy: Keep only the golden/yellow elements and remove everything else
    # The golden elements should have high yellow content and be relatively bright
    
    # Create mask for golden elements (high yellow/bright colors)
    golden_mask = (
        (r > 150) & (g > 150) & (b < 100) |  # Bright yellow/gold
        (r > 180) & (g > 180) & (b < 120) |  # Very bright yellow/gold
        (r > 200) & (g > 200) & (b < 140)    # Extremely bright yellow/gold
    )
    
    # Alternative approach: Remove dark backgrounds more aggressively
    # Remove very dark pixels (background)
    dark_threshold = 40
    dark_mask = (r < dark_threshold) & (g < dark_threshold) & (b < dark_threshold)
    
    # Remove dark olive green backgrounds
    olive_mask = (g > r + 5) & (g > b + 5) & (g < 100) & (r < 80) & (b < 80)
    
    # Remove medium-dark backgrounds
    medium_dark_mask = (r < 80) & (g < 80) & (b < 80)
    
    # Combine all background masks
    background_mask = dark_mask | olive_mask | medium_dark_mask
    
    # Create final mask: keep golden elements OR bright elements, remove backgrounds
    keep_mask = golden_mask | ((r > 120) & (g > 120) & (b > 80))  # Keep bright elements
    
    # Set alpha to 0 for background pixels
    data[background_mask & ~keep_mask] = [0, 0, 0, 0]
    
    # Create result image
    result_img = Image.fromarray(data)
    
    # Save with maximum compression for web
    result_img.save(output_path, 'PNG', optimize=True, compress_level=9)
    
    print(f"Transparent logo created: {output_path}")
    print(f"Original size: {img.size}")
    print(f"New size: {result_img.size}")
    
    # Show some stats
    total_pixels = data.shape[0] * data.shape[1]
    transparent_pixels = np.sum(data[:, :, 3] == 0)
    opaque_pixels = total_pixels - transparent_pixels
    
    print(f"Transparent pixels: {transparent_pixels} ({transparent_pixels/total_pixels*100:.1f}%)")
    print(f"Opaque pixels: {opaque_pixels} ({opaque_pixels/total_pixels*100:.1f}%)")

if __name__ == "__main__":
    input_path = 'img/Untitled design - 2025-10-16T230239.851.png'
    output_path = 'public/logo.png'
    
    if not os.path.exists(input_path):
        print(f"Error: Input file not found at {input_path}")
        exit(1)
    
    create_transparent_logo(input_path, output_path)
    print("✅ Logo processing complete!")
