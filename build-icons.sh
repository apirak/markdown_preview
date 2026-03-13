#!/bin/bash
# Build icons for Tauri app

cd "$(dirname "$0")/src-tauri/icons"

echo "🔨 Building macOS .icns..."
mkdir -p icon.iconset
sips -z 16 16 128x128.png --out icon.iconset/icon_16x16.png
sips -z 32 32 128x128.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32 128x128.png --out icon.iconset/icon_32x32.png
sips -z 64 64 128x128.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128 128x128.png --out icon.iconset/icon_128x128.png
sips -z 256 256 128x128.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256 128x128.png --out icon.iconset/icon_256x256.png
sips -z 512 512 128x128.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512 128x128.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 128x128.png --out icon.iconset/icon_512x512@2x.png
iconutil -c icns icon.iconset -o icon.icns
rm -rf icon.iconset
echo "✅ icon.icns created!"

echo "🔨 Building other PNG sizes..."
sips -z 32 32 128x128.png --out 32x32.png
sips -z 256 256 128x128.png --out 128x128@2x.png
echo "✅ PNG icons created!"

echo ""
echo "⚠️  For .ico (Windows), use online tool:"
echo "   https://convertio.co/en/png-ico/"
echo "   Upload 128x128.png and download icon.ico"
echo ""
echo "🚀 Done! Run 'pnpm tauri:dev' to test"
