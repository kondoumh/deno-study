Deno 2.2 OpenTelemetry
========================

Start LGTM Stack container.

```shell
docker run --name lgtm -p 3000:3000 -p 4317:4317 -p 4318:4318 --rm -ti \
    -v "$PWD"/lgtm/grafana:/data/grafana \
    -v "$PWD"/lgtm/prometheus:/data/prometheus \
    -v "$PWD"/lgtm/loki:/data/loki \
    -e GF_PATHS_DATA=/data/grafana \
    docker.io/grafana/otel-lgtm:0.8.1
```

Start endpoint API
```shell
OTEL_DENO=true OTEL_SERVICE_NAME=svc-a deno run --unstable-otel --allow-net service_a.ts
```

Start backend API

```shell
OTEL_DENO=true OTEL_SERVICE_NAME=svc-b deno run --unstable-otel --allow-net service_b.ts
```

call front API

```shell
curl --dump-header - http://localhost:3001
```