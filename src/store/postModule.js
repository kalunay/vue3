import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPage: 0,
        sortOptions: [
          {value: 'title', name:'Name'},
          {value: 'body', name:'Description'},
        ]
    }),
    getters: {
        sortedPosts(state){
            return [...state.posts].sort((post1,post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters){
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts){
            state.posts = posts
        },
        setIsPostLoading(state, bool){
            state.isPostLoading = bool
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery
        },
        setPage(state, page){
            state.page = page
        },
        setTotalPage(state, totalPage){
            state.totalPage = totalPage
        }         
    },
    actions: {
        async fetchPosts({state, commit}){
            try {
              commit('setIsPostLoading', true)
              const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                  _page: state.page,
                  _limit: state.limit
                }
              })

              commit('setTotalPage', Math.ceil(res.headers['x-total-count'] / state.limit))
              commit('setPosts', res.data)
            } catch (error) {
              console.log(error)
            } finally{
                commit('setIsPostLoading', false)
            }
        },
        async loadMorePosts({state, commit}){
            try {
              commit('setPage', state.page + 1)
              const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                  _page: state.page,
                  _limit: state.limit
                }
              })
              commit('setTotalPage', Math.ceil(res.headers['x-total-count'] / state.limit))
              commit('setPosts', [...state.posts, ...res.data])
            } catch (error) {
              console.log(error)
            } finally{
            }
        }
    },
    namespaced: true
}