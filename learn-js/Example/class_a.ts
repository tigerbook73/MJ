class A {
  public static count = 0;

  public name;

  constructor(name: string) {
    A.count++;

    this.name = name;
  }
}

A.count = 0;
