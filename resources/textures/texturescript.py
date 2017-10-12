import os

textures = []

def sorted_list(path):
    mtime = lambda f: os.stat(os.path.join(path, f)).st_mtime
    return list(sorted(os.listdir(path), key=mtime))

files = sorted_list(".")

for filename in files:
    if filename.endswith(".jpg") or filename.endswith(".png") or filename.endswith(".jpeg") or filename.endswith(".tif"):
        texturetuple = ["", "./resources/textures/"+filename]
        textures.append(texturetuple)

for tuple in textures:
    print tuple