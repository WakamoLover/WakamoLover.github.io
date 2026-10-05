import os

# 1. 설정
IMAGE_DIR = './public/media/ref'  # 이미지가 들어있는 최상위 폴더 경로
SOURCE_DIR = './src'          # 소스 코드가 들어있는 폴더 경로
PREFIX = 'ref_'             # 접두사
START_INDEX = 100001          # 시작 번호
ALLOWED_EXTS = {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'}
CODE_EXTS = {'.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.css', '.md'}

def rename_images_and_update_refs(dry_run=True):
    if not os.path.exists(IMAGE_DIR):
        print(f"Error: {IMAGE_DIR} is not found.")
        return

    image_files = []
    for root, _, files in os.walk(IMAGE_DIR):
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext in ALLOWED_EXTS:
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, IMAGE_DIR).replace('\\', '/')
                image_files.append((full_path, rel_path, f, ext))

    image_files.sort(key=lambda x: x[1])

    renamed_map = {}
    rel_path_map = {}
    file_rename_list = []
    current_idx = START_INDEX

    for full_path, rel_path, filename, ext in image_files:
        name_without_ext = os.path.splitext(filename)[0]

        if name_without_ext.startswith(PREFIX) and name_without_ext[len(PREFIX):].isdigit():
            continue

        new_filename = f"{PREFIX}{current_idx}{ext.lower()}"
        new_full_path = os.path.join(os.path.dirname(full_path), new_filename)

        new_filename = f"{PREFIX}{current_idx}{ext.lower()}"
        new_full_path = os.path.join(os.path.dirname(full_path), new_filename)
        
        rel_dir = os.path.dirname(rel_path)
        new_rel_path = f"{rel_dir}/{new_filename}" if rel_dir else new_filename

        renamed_map[filename] = new_filename
        rel_path_map[rel_path] = new_rel_path
        file_rename_list.append((full_path, new_full_path))
        
        current_idx += 1

    if not file_rename_list:
        print("No image file to change.")
        return

    print(f"=== {len(file_rename_list)} image target mappings ===")
    for old_rel, new_rel in rel_path_map.items():
        print(f"  {old_rel} -> {new_rel}")

    if dry_run:
        print("\n[Dry-Run] Real file changes are not performed. Run with dry_run=False to apply changes.")
        return

    print("\n--- Source Code Update ---")
    for root, _, files in os.walk(SOURCE_DIR):
        for file in files:
            if os.path.splitext(file)[1].lower() in CODE_EXTS:
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    new_content = content
                    
                    for old_rel, new_rel in rel_path_map.items():
                        if old_rel in new_content:
                            new_content = new_content.replace(old_rel, new_rel)

                    for old_name, new_name in renamed_map.items():
                        if old_name in new_content:
                            new_content = new_content.replace(old_name, new_name)

                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated: {file_path}")
                except Exception as e:
                    print(f"Failed to process file ({file_path}): {e}")

    print("\n--- Image File Rename ---")
    for old_path, new_path in file_rename_list:
        os.rename(old_path, new_path)
        print(f"Renamed Completed: {os.path.basename(old_path)} -> {os.path.basename(new_path)}")

if __name__ == '__main__':
    rename_images_and_update_refs(dry_run=True)  # Set dry_run=False to apply changes

## python rename_image.py