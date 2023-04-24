<template>
    <div>

        <!-- {{ $store.state.posts.limit }}

        {{ $store.state.likes }}
        {{ $store.getters.doubleLikes }}

        <my-button @click="$store.commit('iLikes')"> +1 </my-button>
        <my-button @click="$store.commit('dLikes')"> -1 </my-button> -->

      <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
      ></my-input>
      <div class="b-top-header">
        <!-- <my-button
          @click="showDialog"
        >
          Add post
        </my-button>       -->
        <!-- <my-select
          v-model="selectedSort"
          :options="sortOptions"
        ></my-select> -->
      </div>
  
      <my-dialog v-model:show="dialogVisible">
        <PostForm
          @create="createPost"
        />      
      </my-dialog>
      <PostList 
        :posts="sortedAndSearchedPosts" 
        @remove="removePost"
        v-if="!isPostLoading"
      />    
      <div v-else>Loading...</div>
  
      <div ref="observer" class="observer"></div>

      <!-- <div v-intersection="loadMorePosts" class="observer"></div> -->
  
      <div class="page">
        <div 
          v-for="pageNumber in totalPage" 
          :key="pageNumber" 
          class="page"
          :class="{
            'current-page': page === pageNumber
          }"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import PostList from '@/components/PostList.vue'
  import PostForm from '@/components/PostForm.vue'
  import axios from 'axios'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  
  export default {
    components: {
      PostList, PostForm
    },
    data(){
      return {
        dialogVisible: false,
      }
    },
    methods: {
        ...mapMutations({
            setPage: 'posts/setPage',
            setSearchQuery: 'post/setSearchQuery'
        }),
        ...mapActions({
            loadMorePosts: 'posts/loadMorePosts',
            fetchPosts: 'posts/fetchPosts'
        }),
      createPost(post){
        this.posts.push(post)
        this.dialogVisible = false
      },
      removePost(post){
        this.posts = this.posts.filter( p => p.id !== post.id )
      },
      showDialog(){
        this.dialogVisible = true
      },
      changePage(pageNumber){
        this.page = pageNumber
      },      
    },
    mounted() {
      this.fetchPosts()
  
      // let options = {
      //   rootMargin: "0px",
      //   threshold: 1.0,
      // };
  
      // let callback = (entries, observer) => {
      //   if(entries[0].isIntersecting && this.page < this.totalPage){
      //     this.loadMorePosts()
      //   }
      // }
  
      // let observer = new IntersectionObserver(callback, options);
      // observer.observe(this.$refs.observer)
  
  
    },
    computed: {
        ...mapState({
            posts: state => state.posts.posts,
            isPostLoading: state => state.posts.isPostLoading,
            selectedSort: state => state.posts.selectedSort,
            searchQuery: state => state.posts.searchQuery,
            page: state => state.posts.page,
            limit: state => state.posts.limit,
            totalPage: state => state.posts.totalPage,
            sortOptions: state => state.posts.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'posts/sortedPosts',
            sortedAndSearchedPosts: 'posts/sortedAndSearchedPosts'
        })
    },
    watch: {
      // selectedSort(newValue){
      //   this.posts.sort((post1, post2) => {
      //     return post1[newValue]?.localeCompare(post2[newValue])
      //   })
      // }
      // page(){
      //   this.fetchPosts()
      // }
    }
  }
  </script>
  
  <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .b-top-header {
    display: flex;
    justify-content: space-between;
  }
  
  .observer {
    height: 50px;
    background-color: antiquewhite;
  }
  
  </style>
  