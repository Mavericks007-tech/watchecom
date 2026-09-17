#!/usr/bin/env bash
# Converts raw ezgif PNG exports into renumbered WebP sequences in public/frames.
# Frame ranges exclude shots where third-party branding is readable (see README).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/frames"

# name | source folder | first index | last index | crop (x y w h, or "none")
convert_seq() {
  local name="$1" src="$2" first="$3" last="$4" crop="$5"
  rm -rf "$OUT/$name"; mkdir -p "$OUT/$name"
  local files=() n=0
  while IFS= read -r f; do files+=("$f"); done < <(ls "$ROOT/$src"/*.png | sort)
  for ((i = first; i <= last; i++)); do
    n=$((n + 1))
    local args=(-quiet -q 80 -m 6)
    [[ "$crop" != "none" ]] && args+=(-crop $crop)
    cwebp "${args[@]}" "${files[$((i - 1))]}" -o "$OUT/$name/$(printf %04d $n).webp"
  done
  echo "$name: $n frames"
}

convert_seq hero  "hero section"      1  50 none
convert_seq m1    "middle section 1 " 17 47 "0 0 720 520"
convert_seq m2    "middle section 2"  1  34 none
convert_seq final "last section"      1  80 none
du -sh "$OUT"/*
