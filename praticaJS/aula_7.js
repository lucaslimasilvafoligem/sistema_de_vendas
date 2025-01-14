const lista = [
    { nome: 'Jose', idade: 11, doente: true },
    { nome: 'Lucas', idade: 12 },
    { nome: 'Lindomar', idade: 17 },
    { nome: 'Fernanda', idade: 119 }
];

lista.sort((a, b) => {
    if (a.nome.toUpperCase() < b.nome.toUpperCase()) {
        return -1
    }
    if (a.nome.toUpperCase() > b.nome.toUpperCase()) {
        return 1
    }
    return 0
});

console.log(lista);