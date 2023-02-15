// 1. 

function getFirstWord(a: string) {
  return a.split(/ +/)[0].length;
}

// 2. 

function getUserNamings(a: { name: string, surname: string }) {
  return {
    fullname: a.name + " " + a.surname,
    initials: a.name[0] + "." + a.surname[0]
  };
}

// 3. 

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a?: { products?: { name: string }[] }) {
  return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...

type animal1 = { name: () => string, coolness: number };
type animal2 = { name: () => string, cuteness: number };

function hey1(a: animal1 | animal2): string {
  return "hey! i'm " + a.name();
}
hey1({ name: () => "roma", cuteness: 100 })
hey1({ name: () => "vasya", coolness: 100 })

// 4.2
class Animal {
  n = '';
  b: boolean | number;
  constructor(name: string, b: boolean | number) {
    this.n = name;
    this.b = b;
  }
  name(): string {
    return this.n;
  }
}

class Cat extends Animal {
  b = false;
  constructor(name: string, b: boolean) {
    super(name, b);
  }
}
class Dog extends Animal {
  b = 0;
  constructor(name: string, b: number) {
    super(name, b);
  }
}

function hey2(abstractPet: Animal) {
  return "hey! i'm " + abstractPet.name();
}
const a = new Cat("myavchik", true)
const b = new Dog("gavchik", 333)
hey2(a)
hey2(b)

// 4.3
type cat = { name: () => string, type: string, cuteness: number, coolness?: number };
type dog = { name: () => string, type: string, coolness: number, cuteness?: number };

function hey(a: cat | dog) {
  return "hey! i'm " + a.name()
    + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness))
}
hey({ name: () => "roma", type: "cat", cuteness: 100 })
hey({ name: () => "vasya", type: "dog", coolness: 100 })

// 5.

// google for Record type
function stringEntries(a: []) {
  return Array.isArray(a) ? a : Object.keys(a)
}

// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a: number) {
  return "*".repeat(a)
}
const hello = async () => {
  return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))