function getFirstWord(a) {
    return a.split(/ +/)[0].length;
}
function getUserNamings(a) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}
function getAllProductNames(a) {
    var _a;
    return ((_a = a === null || a === void 0 ? void 0 : a.products) === null || _a === void 0 ? void 0 : _a.map(prod => prod === null || prod === void 0 ? void 0 : prod.name)) || [];
}
function hey1(a) {
    return "hey! i'm " + a.name();
}
hey1({ name: () => "roma", cuteness: 100 });
hey1({ name: () => "vasya", coolness: 100 });
class Animal {
    constructor(name, b) {
        this.n = '';
        this.n = name;
        this.b = b;
    }
    name() {
        return this.n;
    }
}
class Cat extends Animal {
    constructor(name, b) {
        super(name, b);
        this.b = false;
    }
}
class Dog extends Animal {
    constructor(name, b) {
        super(name, b);
        this.b = 0;
    }
}
function hey2(abstractPet) {
    return "hey! i'm " + abstractPet.name();
}
const a = new Cat("myavchik", true);
const b = new Dog("gavchik", 333);
hey2(a);
hey2(b);
function hey(a) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness));
}
hey({ name: () => "roma", type: "cat", cuteness: 100 });
hey({ name: () => "vasya", type: "dog", coolness: 100 });
function stringEntries(a) {
    return Array.isArray(a) ? a : Object.keys(a);
}
async function world(a) {
    return "*".repeat(a);
}
const hello = async () => {
    return await world(10);
};
hello().then(r => console.log(r)).catch(e => console.log("fail"));
export {};
//# sourceMappingURL=index.js.map