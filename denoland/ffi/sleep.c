// cc -c -o sleep.o sleep.c
// cc -shared -W -o sleep.dylib sleep.o
#include <time.h>

int sleep(unsigned int ms) {
  struct timespec ts;
  ts.tv_sec = ms / 1000;
  ts.tv_nsec = (ms % 1000) * 1000000;
  nanosleep(&ts, NULL);
}
