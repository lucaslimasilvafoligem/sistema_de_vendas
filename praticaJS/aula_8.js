const lista = [
    { nome: 'Jose', idade: 11, doente: true },
    { nome: 'Lucas', idade: 12 },
    { nome: 'Lindomar', idade: 17 },
    { nome: 'Fernanda', idade: 119 }
];

const resultado1 = lista.some((objeto) => objeto.idade > 90);

const resultado2 = lista.every((objeto) => objeto.idade > 90)

console.log(resultado1);
console.log(resultado2);
