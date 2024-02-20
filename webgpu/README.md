# WebGPU on Deno

[【toranoana.deno#15】WebGPUで遊ぼう](https://speakerdeck.com/toranoana/toranoana-dot-deno-number-15-webgpudeyou-bou)

[https://deno.land/x/sdl2@0.9.0](https://deno.land/x/sdl2@0.9.0)

```shell
brew install sdl2 sdl2_image sdl2_ttf

sudo ln -s /opt/homebrew/lib/libSDL2.dylib /usr/local/lib/
sudo ln -s /opt/homebrew/lib/libSDL2_image.dylib /usr/local/lib/
sudo ln -s /opt/homebrew/lib/libSDL2_ttf.dylib /usr/local/lib/
```


```shell
export DENO_SDL2_PATH=/usr/local/lib

deno run --unstable --allow-ffi --allow-env hello.ts
```
