import Vue from 'vue'
import Vuex from 'vuex'
import RiskModule from './riskModule';
import UiModule from './uiModule';

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    uiModule: UiModule,
    riskModule: RiskModule
  }
})