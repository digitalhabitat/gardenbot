#!/bin/bash
set -e

# This script was use as vscode Task, to generate new .svg diagrams with wireviz
##wv_cli.py

err() {
  echo "[ERROR] [$(date +'%Y-%m-%dT%H:%M:%S%z')]: $*" >&2
}

cmd="wireviz -f ghst"

# Define the source directories
dirSource="/workspaces/gardenbot/systems/wire-system/wireviz"

printf "Source Directory: $dirSource\n"

# Check if the source directory exists
if [ ! -d "$dirSource" ]; then
    err "Source directory $dirSource does not exist."
    exit 1
fi

for file in $dirSource/*.yml; do

    # Filter out non-matching glob https://mywiki.wooledge.org/BashPitfalls#line-57
    [ -e "$file" ] || continue

    # Extract the filename without the path
    filename=$(basename "$file")

    # Check if the file exists in target directory
    echo "File $filename detected"
    $cmd $file

done

# Loop through files in source directory
for file in $dirSource/*.gv $dirSource/*.png; do

    # Filter out non-matching glob https://mywiki.wooledge.org/BashPitfalls#line-57
    [ -e "$file" ] || continue

    # Extract the filename without the path
    filename=$(basename "$file")

    # Check if the file exists in target directory
    if [ "$file" ]; then
        echo "Removing file $filename"
        rm $file
    fi
done