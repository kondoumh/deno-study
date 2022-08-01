# deno-wasm-example

Install compiler

```shell
rustup target add wasm32-unknown-unknown
```

Install GC

```shell
cargo install wasm-gc
```

Build

```shell
cargo build --target wasm32-unknown-unknown
```

Apply gc

```shell
wasm-gc target/wasm32-unknown-unknown/debug/deno_wasm_example.wasm
```

Execute

```
deno run --allow-read main.ts
```
