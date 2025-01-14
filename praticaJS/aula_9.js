const lista = [
    {
        nome: 'Jose',
        idade: 11,
        cartoes: ['2341', '5371']
    },
    {
        nome: 'Lucas',
        idade: 12,
        cartoes: ['2342']
    },
    {
        nome: 'Lindomar',
        idade: 17,
        cartoes: ['3341', '5313']
    },
    {
        nome: 'Fernanda',
        idade: 119,
        cartoes: ['3441', '5443']
    }
];

const cartoesMap = lista.map((cartao) => cartao.cartoes);

console.log(cartoesMap);

const cartoesFlatMap = lista.flatMap((cartao) => cartao.cartoes);

console.log(cartoesFlatMap);
