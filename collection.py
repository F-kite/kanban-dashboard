import os

def merge_web_files(directory, output_file, extensions, exclude_dirs=None):
    if exclude_dirs is None:
        exclude_dirs = ['.venv', 'node_modules', '__pycache__', 'dist', 'build']

    print(f"Начинаем сборку файлов с расширениями: {', '.join(extensions)}")
    print(f"Сканируемая директория: {directory}")
    print(f"Исключаемые директории (по подстроке в пути): {', '.join(exclude_dirs)}")
    print("-" * 30)

    count = 0
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk(directory):
            current_dir_path = os.path.abspath(root)

            should_exclude = False
            for exclude in exclude_dirs:

                path_parts = set(root.replace(directory, '').split(os.sep))
                if exclude in path_parts:
                    should_exclude = True
                    break

            if should_exclude:
                dirs[:] = []
                continue

            files.sort()
            for file in files:
                if any(file.lower().endswith(ext) for ext in extensions):
                    filepath = os.path.join(root, file)
                    relative_filepath = os.path.relpath(filepath, directory)
                    try:
                        with open(filepath, 'r', encoding='utf-8') as infile:
                            print(f"  [+] Добавляем файл: {relative_filepath}")
                            outfile.write(f'# Содержимое файла: {relative_filepath.replace(os.sep, "/")}\n')
                            outfile.write(f'# {"-" * (len(relative_filepath) + 18)}\n\n')
                            outfile.write(infile.read())
                            outfile.write('\n\n\n\n')
                            count += 1
                    except Exception as e:
                        print(f'  [!] Не удалось прочитать файл {relative_filepath}: {e}')

    print("-" * 30)
    print(f"Сборка завершена. Всего файлов добавлено: {count}")
    print(f"Результат сохранен в файл: {output_file}")


if __name__ == "__main__":
    directory_to_scan = r'E:\Projects\Develop\kanban-dashboard\server'

    output_filename = 'combined_frontend_code.txt'

    file_extensions = ['.html','.js', '.ts', ".jsx", ".tsx"]

    merge_web_files(
        directory=directory_to_scan,
        output_file=output_filename,
        extensions=file_extensions
    )
