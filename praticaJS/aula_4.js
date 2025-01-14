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

const buscarPessoa = (pessoa) => pessoa.idade > 16

const novaPessoa = lista.find(buscarPessoa);

console.log(novaPessoa);
