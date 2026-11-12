#!/bin/bash
# Pre-cuts Pexels source clips (footage/raw) into 30fps H.264 shots used by the Remotion project.
# args per line: out id start dur crop_w_expr crop_x_center(0-1) out_w out_h
set -e
cd "$(dirname "$0")"
while read out id ss dur cx ow oh; do
  [ -z "$out" ] && continue
  src=footage/raw/$id.mp4
  read W H < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$src" | tr "," " ")
  # crop to target aspect, horizontal centre at cx
  ffmpeg -nostdin -v error -y -ss $ss -t $dur -i $src -an \
    -vf "crop='min(iw,ih*$ow/$oh)':'min(ih,iw*$oh/$ow)':'max(0,min(iw-min(iw,ih*$ow/$oh),iw*$cx-min(iw,ih*$ow/$oh)/2))':'(ih-min(ih,iw*$oh/$ow))/2',scale=$ow:$oh:flags=lanczos,fps=30,format=yuv420p" \
    -c:v libx264 -preset slow -crf 16 -movflags +faststart public/clips/$out.mp4
  echo "$out <- $id ($W x $H) ss=$ss dur=$dur"
done <<'LIST'
c01_fries     7490594  2.0 3.6 0.50 1080 1920
c02_couple    4915212  0.3 2.4 0.50 1080 1920
c03_zucchini  5644998  8.0 2.4 0.58 1080 1920
c04_sizzle    4702555  0.0 3.4 0.45 1080 960
c05_chicken   4064770  4.0 2.4 0.55 1080 1920
c06_fries2    7490594  9.0 2.0 0.40 1080 1920
c07_salmon    12409708 0.4 2.4 0.50 1080 1920
c08_veg       5866266  2.0 2.8 0.45 1080 1920
c09_cauli     4974557  0.5 3.8 0.50 1080 1920
c10_plating   7929017  0.0 10.0 0.50 1080 1350
LIST
