// cc -c -o add.o add.c
// cc -shared -W -o libadd.dylib add.o
int add(int a, int b) {
  return a + b;
}
