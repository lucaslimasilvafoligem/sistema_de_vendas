const lista = [
    { nome: 'Jose', idade: 11, doente: true },
    { nome: 'Lucas', idade: 12 },
    { nome: 'Lindomar', idade: 17 },
    { nome: 'Fernanda', idade: 119 }
];

const pessoa = {
    jose: { idade: 54 },
    joao: { idade: 65 },
    maria: { idade: 23 }
};

const pessoas = {
    ...lista.reduce((acc, objeto) => ({
        ...acc,
        [objeto.nome.toLowerCase()]: { idade: objeto.idade }
    }), {}),
    ...pessoa
};

console.log(pessoas.maria.idade);
