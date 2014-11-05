var app = angular.module("sistemaDePedidos", []);
app.controller("sistemaDePedidosCtrl", function($scope, $http, SistemaDePedidosAPIFactory, SistemaDePedidosAPIConstructor) {
    $scope.hoje = new Date();
    $scope.titulo = "Sistema de pedidos";        
    $scope.message = "Faca seu pedido!";
    $scope.produtos = [];
    $scope.quantidade;
    $scope.pedido = {};
/*        cpf: "06655522233",
        quantidade: 0,
        item: { 
            id: 1,
            descricao: "agua",
            preco: 4
        }
    };
*/    $scope.valor;
    $scope.detalhes = {};
    $scope.cpf = undefined;
    $scope.setTotal = function() {
        $scope.valor = $scope.quantidade * $scope.pedido.produto.preco;
    };
    $scope.carregarProdutos = function() {
        //SistemaDePedidosAPIFactory.getCardapio().success(function (data, status) {
        SistemaDePedidosAPIConstructor.getCardapio().success(function (data, status) {
            $scope.produtos = data;
            delete $scope.pedido;
        });
    };
    $scope.adicionarPedido = function() {
        $http.post("http://172.16.200.237:3412/pedidos", $scope.pedido);
    };
    $scope.carregarDetalhesDoProduto = function() {
        $http.get("http://172.16.200.237:3412/item/1").success(function(data, status) {
            $scope.detalhes = data;
        });
    };
    $scope.carregarProdutos()
    $scope.carregarDetalhesDoProduto()
});
app.filter("cpf", function() {
    return function(input) {
        if(!input) return input;
        return input.substring(0,3)+"."+input.substring(3,6)+"."+input.substring(6,9)+"-"+input.substring(9,11);

    } 
});
app.factory("SistemaDePedidosAPIFactory", function ($http){
    var _getCardapio = function () {
        return $http.get("http://172.16.200.237:3412/cardapio");
    };
    return {
        getCardapio: _getCardapio
    };
});
app.service("SistemaDePedidosAPIConstructor", function ($http) {
    this.getCardapio = function () {
        return $http.get("http://172.16.200.237:3412/cardapio");
    };
});
