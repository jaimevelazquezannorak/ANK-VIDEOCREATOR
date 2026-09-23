# Render final de RelensSales: 4K maestro + 1080p, con música.
# El FFmpeg que trae Remotion no arranca en este equipo, así que Remotion solo
# saca fotogramas y la codificación y la mezcla las hace el FFmpeg del sistema.
# Uso: powershell -File scripts/render-relens.ps1
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

$frames = "out/relens_frames"
$music = "public/exam/aylex-little-step.mp3"
$fps = 30

if (Test-Path $frames) { Remove-Item -Recurse -Force $frames }
$props = Join-Path $env:TEMP "relens-props.json"
'{"music":false}' | Set-Content -Path $props -Encoding ascii
npx remotion render RelensSales $frames --props=$props --sequence --scale=2 --image-format=jpeg --jpeg-quality=100 --log=error
if ($LASTEXITCODE -ne 0) { throw "Remotion no pudo renderizar los fotogramas" }

$count = (Get-ChildItem $frames -Filter *.jpeg).Count
$seconds = $count / $fps
$fadeOut = $seconds - 3
$audio = "atrim=0:$seconds,loudnorm=I=-14:TP=-1.0:LRA=11,afade=t=in:d=0.6,afade=t=out:st=${fadeOut}:d=3"

ffmpeg -y -hide_banner -loglevel error -framerate $fps -i "$frames/element-%04d.jpeg" -i $music `
  -map 0:v -map 1:a -af $audio `
  -c:v libx264 -preset slow -crf 14 -profile:v high -pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 `
  -c:a aac -b:a 320k -ar 48000 -shortest -movflags +faststart out/relens_sales_es_4k.mp4
if ($LASTEXITCODE -ne 0) { throw "FFmpeg falló en el 4K" }

ffmpeg -y -hide_banner -loglevel error -i out/relens_sales_es_4k.mp4 `
  -vf "scale=1920:1080:flags=lanczos" `
  -c:v libx264 -preset slow -crf 16 -profile:v high -pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 `
  -c:a copy -movflags +faststart out/relens_sales_es.mp4
if ($LASTEXITCODE -ne 0) { throw "FFmpeg falló en el 1080p" }

Remove-Item -Recurse -Force $frames
Get-Item out/relens_sales_es_4k.mp4, out/relens_sales_es.mp4 | ForEach-Object { "{0}  {1:N1} MB" -f $_.Name, ($_.Length / 1MB) }
