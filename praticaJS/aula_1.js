const lista = [
    {
        nome: 'Jose',
        idade: 11
    },
    {
        nome: 'Lucas',
        idade: 12
    },
    {
        nome: 'Lindomar',
        idade: 17
    },
    {
        nome: 'Fernanda',
        idade: 119
    }
]

const converterObjetoEmIdades = (objeto) => {
    return objeto.idade;
}

const converterObjetoEmNomes = (objeto) => {
    return objeto.nome;
}

const converterObjetoEmNomeEIdade = (objeto) => {
    return { 
        nome: objeto.nome,
        idade: objeto.idade,
        nomeIdade: `${objeto.nome} + ${objeto.idade}`
    }
}

const converterObjetoEmNomeEIdadeOtimizado = (objeto) => {
    return { 
        ...objeto,
        nomeIdade: `${objeto.nome} + ${objeto.idade}`
    }
}

console.log(lista.map(converterObjetoEmNomeEIdadeOtimizado));