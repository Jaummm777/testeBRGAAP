sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent" // Para navegar de volta
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("brgaap.app.controller.Detail", {
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            // Quando a rota 'detail' é acessada, este método é chamado.
            // Ele pega o 'id' dos argumentos da URL e faz o binding da view com o item correto do modelo.
            this.getView().bindElement({
                path: "/" + oEvent.getParameter("arguments").id // Ex: /1, /2 (o ID do item na URL)
            });
        },

        onNavBack: function () {
            // Função para voltar para a tela anterior (lista)
            const oHistory = sap.ui.core.routing.History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1); // Volta para a página anterior no histórico do navegador
            } else {
                // Se não houver histórico, navega para a rota principal
                this.getOwnerComponent().getRouter().navTo("main", {}, true);
            }
        }
    });
});