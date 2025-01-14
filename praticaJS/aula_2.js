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

for (let i = 0; i < lista.length; i++) {
    console.log(lista[i]);
}

lista.forEach((objeto) => console.log(objeto));
