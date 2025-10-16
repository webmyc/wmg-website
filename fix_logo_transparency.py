#!/usr/bin/env python3
"""
Remove background from logo more aggressively and make it truly transparent
"""
from PIL import Image
import numpy as np

def fix_logo_transparency():
    input_path = "public/logo.png"
    output_path = "public/logo-transparent.png"
    
    try:
        # Open the image
        with Image.open(input_path) as img:
            print(f"Original image size: {img.size}")
            print(f"Original mode: {img.mode}")
            
            # Convert to RGBA if not already
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # Convert to numpy array for easier manipulation
            data = np.array(img)
            
            # Create a mask for the background
            # Look for dark green colors (the background)
            # Background color is approximately #0a1f1a (10, 31, 26)
            # But we need to be more aggressive about removing greens
            
            # Method 1: Remove pixels that are predominantly green and dark
            mask = (data[:, :, 1] > data[:, :, 0]) & (data[:, :, 1] > data[:, :, 2]) & (data[:, :, 1] < 100)
            
            # Method 2: Remove pixels that are very dark overall
            mask2 = np.sum(data[:, :, :3], axis=2) < 80
            
            # Combine both masks
            final_mask = mask | mask2
            
            # Set alpha channel to 0 for background pixels
            data[final_mask, 3] = 0
            
            # Convert back to PIL Image
            img = Image.fromarray(data, 'RGBA')
            
            # Save transparent version
            img.save(output_path, 'PNG')
            
            print("Logo background removal complete!")
            
            # Replace original with transparent version
            import os
            os.replace(output_path, input_path)
            print("Replaced original logo with transparent version!")
            
    except Exception as e:
        print(f"Error removing background: {e}")

if __name__ == "__main__":
    fix_logo_transparency()
