import Vue from 'vue'
import Vuex from 'vuex'
import RiskModule from './riskModule';

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    riskModule: RiskModule
  }
})