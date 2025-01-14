const lista = [
    {
        nome: 'Jose',
        idade: 11,
        doente: true
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

const filtrarPessoa = (pessoa) => pessoa.idade > 20 || pessoa.doente;

const listaFiltrada = lista.filter(filtrarPessoa);

console.log(lista);

console.log(listaFiltrada);
