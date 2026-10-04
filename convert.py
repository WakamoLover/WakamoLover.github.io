import os
from PIL import Image

folder_path = "./public/media/ref"

for filename in os.listdir(folder_path):
    if filename.lower().endswith(".png"):
        png_path = os.path.join(folder_path, filename)
        webp_path = os.path.join(folder_path, f"{os.path.splitext(filename)[0]}.webp")
        
        with Image.open(png_path) as img:
            img.save(webp_path, "WEBP", quality=80)
        print(f"Conversion completed: {webp_path}")
        
        os.remove(png_path)
        print(f"Existing PNG deleted: {png_path}")

print("WebP conversions are done!")

## python convert.py