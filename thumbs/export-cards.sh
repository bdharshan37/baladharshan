#!/bin/bash
# Renders each card in cards.html to a 2400x1720 (2x) JPG in ./cards
cd "$(dirname "$0")"; mkdir -p cards
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for id in workflows slack ai-assistant protect conditional-access circuit defender mobile-framework ux-strategy research-priority; do
  "$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=1200,860 \
    --virtual-time-budget=6000 --screenshot="cards/$id.png" "file://$PWD/cards.html#$id" >/dev/null 2>&1
  sips -s format jpeg -s formatOptions 93 "cards/$id.png" --out "cards/$id.jpg" >/dev/null 2>&1 && rm "cards/$id.png"
done; ls cards
