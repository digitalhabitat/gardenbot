#!/bin/bash
set -e

echo "testigntesting"

cmd="python3 $HOME/.local/lib/python3.10/site-packages/wireviz/wireviz.py"

cd ./bot-notes/wire-system/wire-diagrams
for filename in *.yml
do 
echo "$filename"
$cmd $filename
done

for filename in *.gv *.png *.html *.tsv
do
echo "removing $filename"
rm $filename
done