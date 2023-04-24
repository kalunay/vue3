<template>
    <div>
      <my-input
        v-model="searchQuery"
      ></my-input>
      <div class="b-top-header">
        <my-button
          @click="showDialog"
        >
          Add post
        </my-button>      
        <my-select
          v-model="selectedSort"
          :options="sortOptions"
        ></my-select>
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
  
      <!-- <div ref="observer" class="observer"></div> -->

      <div v-intersection="loadMorePosts" class="observer"></div>
  
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
  
  export default {
    components: {
      PostList, PostForm
    },
    data(){
      return {
        posts: [],
        dialogVisible: false,
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
      }
    },
    methods: {
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
      async fetchPosts(){
        try {
          this.isPostLoading = true
          const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          })
          this.totalPage = Math.ceil(res.headers['x-total-count'] / this.limit)
          this.posts = res.data
        } catch (error) {
          console.log('Error')
        } finally{
          this.isPostLoading = false
        }
      },
      async loadMorePosts(){
        try {
          this.page += 1
          const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          })
          this.totalPage = Math.ceil(res.headers['x-total-count'] / this.limit)
          this.posts = [...this.posts, ...res.data]
        } catch (error) {
          console.log('Error')
        } finally{
        }
      }
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
      sortedPosts(){
        return [...this.posts].sort((post1,post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
      },
      sortedAndSearchedPosts(){
        return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
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
  