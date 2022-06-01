<div display = flex justtify-content = "center">
    <img src ="/tmp/car-rental.png" width= "150px">
</div>
<h2>API Rest para aluguel de veiculos</h2>
<br>
<h6>Principais Tecnologias Utilizadas</h6>
<ul>
    <li>Node.js</li>
    <li>SOLID</li>
    <li>Testes de Unidades e Integração</li>
    <li>Express</li>
    <li>TypeScript</li>
    <li>Docker</li>
    <li>Postgres</li>
    <li>TypeORM</li>
    <li>JWT(Json Web Token)</li>
</ul>
<h6>Siglas desta Documentação</h6>
<ul>
    <li>[ RF ] = Requisito Funcional </li>
    <li>[ RNF ] = Requisito Não Funcional</li>
    <li>[ RN ] = Regras de Negócios</li>
</ul>
<h6>Cadastro de Carros</h6>
<ul>
    <li>[ RF ] Deve ser possível cadastrar um novo carro.</li>
    <li>[ RF ] Deve ser possível listar todas as categorias.</li>
    <li>[ RN ] Não deve possível cadastrar um carro com uma placa já existente.</li>
    <li>[ RN ] Não é possível alterar a placa de um carro já cadastrado.</li>
    <li>[ RN ] O carro deve ser cadastrado, por padrão com disponibilidade.</li>
    <li>[ RN ] Não deve ser possível cadastrar um carro sem que o usuário seja um administrador.</li>
</ul>

<h6>Listagem de Carros</h6>
<ul>
    <li>[ RF ] Deve ser possível listar os carros disponíveis.</li>
    <li>[ RF ] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.</li>
    <li>[ RF ] Deve ser possível listar todos os carros disponíveis pelo nome da marca.</li>
    <li>[ RF ] Deve ser possível listar todos os carros disponíveis pelo nome do carro.</li>
    <li>[ RN ] Não é necessaio estar logado no sistema para listar os carros disponíveis.</li>
</ul>

<h6>Cadastro de Imagem do Carro</h6>
<ul>
    <li>[ RF ] Deve ser possível cadastrar a imagem do carro.</li>
    <li>[ RF ] Deve ser possível listar todos os carros.</li>
    <li>[ RNF ] Utilizar o Multer para upload dos arquivos.</li>
    <li>[ RN ] O usuário pode cadastrar mais de uma imagem para o mesmo carro.</li>
    <li>[ RN ] O usuário responsavel pelo cadastro deve ser um usuário administrador.</li>
</ul>

<h6>Cadastro de Especificações</h6>
<ul>
    <li>[ RF ] Deve ser possível cadastrar uma especificação para um carro.</li>
    <li>[ RF ] Deve ser possível listar todas as especificaçõoes.</li>
    <li>[ RF ] Deve ser possível listar todas as especificaçõoes.</li>
    <li>[ RN ] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.</li>
    <li>[ RN ] Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.</li>
    <li>[ RN ] Não deve ser possível cadastrar uma especificação sem que o usuário seja um administrador.</li>
</ul>

<h6>Aluguel de Carros</h6>
<ul>
    <li>[ RF ] Deve ser possível cadastrar um aluguel.</li>
    <li>[ RN ] O alugel deve ter duração mínima de 24 horas.</li>
    <li>[ RN ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.</li>
    <li>[ RN ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.</li>
    <li>[ RN ] Ao realizar um aluguel, o carro deve está indisponível para outro aluguel.</li>
</ul>
<h6>Devolução de um Carro</h6>
<ul>
    <li>Se o carro for devolvido com menos de 24hrs, deverá ser cobrado a diária completa.</li>
    <li>Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.</li>
    <li>Ao realizar a devolução, o usuário deverá está disponível para solicitar ourto aluguel.</li>
    <li>Ao realizar a devolução, deverá ser calculado o total do aluguel.</li>
    <li>Caso o horário da devolução seja superior ao horário previsto pela entrega, deve ser cobrado uma multa proporcional aos dias de atraso.</li>
    <li>Caso ocorra a cobraça de multa, deve ser cobrado junto com o valor do aluguel estipulado.</li>
    <li>O usuário deve está logado na aplicação.</li>
</ul>
<br>
<h6>Listagem de aluguel para Usuário</h6>
<ul>
    <li>Deve ser possível realizar a busca de todos os aluguéis para o usuário.</li>
    <li>O usuário deve estar logado na aplicação.</li>
</ul>
<br>
<h6>Recuperação de Senha </h6>
<ul>
    <li>Deve ser possível recuperar a senha informando o e-mail.</li>
    <li>O usuário deve receber um e-mail com um passo a passo para a recuperação sa senha.</li>
    <li>O usuário deve conseguir inserir uma nova senha.</li>
    <li>O usuário precisa informar uma nova senha.</li>
    <li>O link enviado para a recuperação deve expirar em 3 horas.</li>
</ul>