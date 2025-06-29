sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("brgaap.app.controller.Main", {

        _aTableSearchFilters: [],

        onInit: function () {
            const oModel = this.getView().getModel();
            if (oModel) {
                oModel.attachRequestCompleted(function() {
                    console.log("Dados da API carregados:", oModel.getData());
                }.bind(this));
            }
        },

        onSearch: function (oEvent) {
            const sQuery = oEvent.getSource().getValue();
            this._aTableSearchFilters = [];

            if (sQuery) {
                this._aTableSearchFilters.push(
                    new Filter("title", FilterOperator.Contains, sQuery)
                );
            }

            this._applyTableFilters();
        },

        _applyTableFilters: function () {
            const oTable = this.byId("tasksTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(this._aTableSearchFilters);
        },

        onItemPress: function (oEvent) {
            const oContext = oEvent.getSource().getBindingContext();
            const oSelectedItem = oContext.getObject();
            const sPath = oContext.getPath();
            const iIndex = sPath.substring(1); // Pega o índice do item no array (ex: /0, /1)

            console.log("Linha selecionada:", oSelectedItem);
            MessageToast.show("Navegando para detalhes de: " + oSelectedItem.title);

            // NAVEGAÇÃO PARA A TELA DE DETALHES
            this.getOwnerComponent().getRouter().navTo("detail", {
                id: iIndex // Passa o índice do item como parâmetro 'id' na URL
            });
        },

        onDetailEditPress: function (oEvent) {
            const oContext = oEvent.getSource().getBindingContext();
            const oItem = oContext.getObject();
            const sPath = oContext.getPath();
            const iIndex = sPath.substring(1);

            console.log("Detalhes/Editar item pelo botão:", oItem);
            MessageToast.show("Navegando para detalhes/editar de: " + oItem.title);

            this.getOwnerComponent().getRouter().navTo("detail", {
                id: iIndex
            });
        }
    });
});