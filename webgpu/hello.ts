import {
  EventType,
  Window,
  WindowBuilder,
} from "https://deno.land/x/sdl2@0.9.0/mod.ts";

const win: Window = new WindowBuilder("Hello, World!", 800, 600).build();
const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  console.error("No adapter found");
  Deno.exit(1);
}

const device = await adapter.requestDevice();
const surface: Deno.UnsafeWindowSurface = win.windowSurface();

const context = surface.getContext("webgpu");
context.configure({
  device, format: navigator.gpu.getPreferredCanvasFormat(), width: 800, height: 600
});

for await (const event of win.events(false)) {
  if (event.type === EventType.Quit) break;

  const r = Math.sin(Date.now() / 1000) / 2 + 0.5;
  const g = Math.sin(Date.now() / 1000 + 2) / 2 + 0.5;
  const b = Math.sin(Date.now() / 1000 + 4) / 2 + 0.5;

  const textureView = context.getCurrentTexture().createView();
  const renderPassDescriptor: GPURenderPassDescriptor = {
    colorAttachments: [
      {
        view: textureView,
        clearValue: { r, g, b, a: 1.0 },
        loadOp: "clear",
        storeOp: "store",
      },
    ],
  };
  
  const commandEncoder = device.createCommandEncoder();
  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
  passEncoder.end();

  device.queue.submit([commandEncoder.finish()]);
  surface.present();
}
