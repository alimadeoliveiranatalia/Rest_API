<div display = flex justtify-content = "center">
    <img src ="/tmp/car-rental.png" width= "150px">
</div>
<h2>API Rest para aluguel de veiculos</h2>
<br>
<h4>Principais Tecnologias Utilizadas</h4>
<ul>
    <li>Node.js</li>
    <li>Express</li>
    <li>TypeScript</li>
    <li>Docker</li>
    <li>Postgres</li>
    <li>TypeORM</li>
    <li>JWT(Json Web Token)</li>
</ul>
<h4>Siglas desta Documentação</h4>
<ul>
    <li>[ RF ] = Requisito Funcional </li>
    <li>[ RNF ] = Requisito Não Funcional</li>
    <li>[ RN ] = Regras de Negócios</li>
</ul>
<h4>Cadastro de Carros</h4>
<ul>
    <li>[ RF ] Deve ser possível cadastrar um novo carro.</li>
    <li>[ RF ] Deve ser possível listar todas as categorias.</li>
    <li>[ RN ] Não deve possível cadastrar um carro com uma placa já existente.</li>
    <li>[ RN ] Não é possível alterar a placa de um carro já cadastrado.</li>
    <li>[ RN ] O carro deve ser cadastrado, por padrão com disponibilidade.</li>
    <li>[ RN ] Não deve ser possível cadastrar um carro sem que o usuário seja um administrador.</li>
</ul>

<h4>Listagem de Carros</h4>
<ul>
    <li>[ RF ] Deve ser possível listar os carros disponíveis.</li>
    <li>[ RF ] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.</li>
    <li>[ RF ] Deve ser possível listar todos os carros disponíveis pelo nome da marca.</li>
    <li>[ RF ] Deve ser possível listar todos os carros disponíveis pelo nome do carro.</li>
    <li>[ RN ] Não é necessaio estar logado no sistema para listar os carros disponíveis.</li>
</ul>

<h4>Cadastro de Imagem do Carro</h4>
<ul>
    <li>[ RF ] Deve ser possível cadastrar a imagem do carro.</li>
    <li>[ RF ] Deve ser possível listar todos os carros.</li>
    <li>[ RNF ] Utilizar o Multer para upload dos arquivos.</li>
    <li>[ RN ] O usuário pode cadastrar mais de uma imagem para o mesmo carro.</li>
    <li>[ RN ] O usuário responsavel pelo cadastro deve ser um usuário administrador.</li>
</ul>

<h4>Cadastro de Especificações</h4>
<ul>
    <li>[ RF ] Deve ser possível cadastrar uma especificação para um carro.</li>
    <li>[ RF ] Deve ser possível listar todas as especificaçõoes.</li>
    <li>[ RF ] Deve ser possível listar todas as especificaçõoes.</li>
    <li>[ RN ] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.</li>
    <li>[ RN ] Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.</li>
    <li>[ RN ] Não deve ser possível cadastrar uma especificação sem que o usuário seja um administrador.</li>
</ul>

<h4>Aluguel de Carros</h4>
<ul>
    <li>[ RF ] Deve ser possível cadastrar um aluguel.</li>
    <li>[ RN ] O alugel deve ter duração mínima de 24 horas.</li>
    <li>[ RN ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.</li>
    <li>[ RN ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.</li>
</ul>