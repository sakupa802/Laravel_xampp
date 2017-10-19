import Vue from 'vue';
import Vuex from 'vuex'
window.Vue = Vue;
import VueRouter from 'vue-router'
import http from './services/http'
require('./bootstrap')
Vue.use(VueRouter)
Vue.use(Vuex)

//状態管理
const store = new Vuex.Store({
	state: {
		user: {},//ログインユーザー
		authenticated: false,//ログイン状態
	},
	mutations: {
		// Userの書き換え
		setUser: function (state, payload) {
			state.user = payload,
			state.authenticated = true;
		}
	},
	actions: {
		// User情報をAPIから取得
		GET_USER: function (commit) {
			// return axios.get('/api/wow/getcurrentuser', res => {
			// 	// ここからコミット 引数の commit を使う
			// 	console.log(res)
			// 	commit('setUser', res.data.user)
			// }, error => {
			// })

			return axios.get('/api/wow/getcurrentuser', {})
			.then(res => {
				// ここからコミット 引数の commit を使う
				this.commit('setUser', res.data.user)
			}).catch(error => {
				console.log(error);
			});
		},
		//ログイン成功するとstateに保持
		LOGIN: function(commit, login_param) {
			return axios.post('/api/wow/signin', login_param, res => {
				commit('setUser', res.data.user)
			}, error => {
				//console.log(res)
			})
		},
		LOGOUT: function (commit) {
			localStorage.removeItem('jwt-token')
			this.state.authenticated = false;
		}
	},
	getters: {
		// User をそのまま使用
		user: function (state) { return state.user },
		authenticated: function (state) { return state.authenticated }
	}
})

//ルーティング
const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/', component: require('./components/Index.vue') },
		{ path: '/wow/login', component: require('./components/wow/Login.vue') },
		//↓ログインチェック有無をmetaに追加
		{ path: '/wow', component: require('./components/wow/Dashboard.vue'), meta: { requiresAuth: true }},
	]
})

//ログインチェック
router.beforeEach((to, from, next) => {
	http.init()//JWTokenヘッダ付与
	
	if (to.matched.some(record => record.meta.requiresAuth) && !store.state.authenticated) {//JWTチェック
		store.dispatch('GET_USER').then(res => {//API叩いてユーザーチェック
			
			if(store.state.authenticated){
				next();
			}else{
				next({ path: '/wow/login', query: { redirect: to.fullPath }});
			}
		}, error => {
			next({ path: '/wow/login', query: { redirect: to.fullPath }});
		})

	} else {
		next();
	}
});

const app = new Vue({
	store: store,
	router,
	el: '#app',
	created () {
		// userStore.init()
	}
})