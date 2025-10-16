#!/usr/bin/env python3

from PIL import Image
import os

def create_favicon_from_logo(input_path, output_dir='public'):
    """Create favicon files from the logo in multiple sizes."""
    
    # Load the logo
    logo = Image.open(input_path).convert('RGBA')
    
    # Define favicon sizes
    sizes = [
        (16, 16, 'favicon-16x16.png'),
        (32, 32, 'favicon-32x32.png'),
        (48, 48, 'favicon-48x48.png'),
        (192, 192, 'android-chrome-192x192.png'),
        (512, 512, 'android-chrome-512x512.png'),
        (180, 180, 'apple-touch-icon.png')
    ]
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    for size, size, filename in sizes:
        # Resize the logo
        favicon = logo.resize((size, size), Image.Resampling.LANCZOS)
        
        # Save as PNG
        output_path = os.path.join(output_dir, filename)
        favicon.save(output_path, 'PNG', optimize=True)
        print(f"Created {filename} ({size}x{size})")
    
    # Create ICO file (16x16, 32x32, 48x48)
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = []
    for size, _ in ico_sizes:
        resized = logo.resize((size, size), Image.Resampling.LANCZOS)
        ico_images.append(resized)
    
    ico_path = os.path.join(output_dir, 'favicon.ico')
    ico_images[0].save(ico_path, format='ICO', sizes=ico_sizes)
    print(f"Created favicon.ico with multiple sizes")
    
    # Create SVG favicon (simple version)
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <circle cx="512" cy="512" r="500" fill="none" stroke="#d4af37" stroke-width="20"/>
  <!-- Simplified tree and figures for SVG -->
  <path d="M512 200 L512 800" stroke="#d4af37" stroke-width="15"/>
  <path d="M400 300 L624 300 M400 400 L624 400 M400 500 L624 500 M400 600 L624 600" stroke="#d4af37" stroke-width="10"/>
  <circle cx="512" cy="300" r="8" fill="#d4af37"/>
  <circle cx="512" cy="400" r="8" fill="#d4af37"/>
  <circle cx="512" cy="500" r="8" fill="#d4af37"/>
  <circle cx="512" cy="600" r="8" fill="#d4af37"/>
</svg>'''
    
    svg_path = os.path.join(output_dir, 'favicon.svg')
    with open(svg_path, 'w') as f:
        f.write(svg_content)
    print(f"Created favicon.svg")
    
    print(f"\n✅ All favicon files created in {output_dir}/")
    print("Files created:")
    for _, _, filename in sizes:
        print(f"  - {filename}")
    print("  - favicon.ico")
    print("  - favicon.svg")

if __name__ == "__main__":
    input_path = 'img/Untitled design - 2025-10-16T230239.851.png'
    
    if not os.path.exists(input_path):
        print(f"Error: Input file not found at {input_path}")
        exit(1)
    
    create_favicon_from_logo(input_path)

