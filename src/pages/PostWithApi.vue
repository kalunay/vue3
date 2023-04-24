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
  import { ref } from 'vue'
  
  export default {
    components: {
      PostList, PostForm
    },
    data(){
      return {
        dialogVisible: false,
        sortOptions: [
          {value: 'title', name:'Name'},
          {value: 'body', name:'Description'},
        ]
      }
    },
    setup(props){

      const { posts, totalPage, isPostLoading } = usePosts(10)
      const { sortedPosts,selectedSort } = userSorted(posts)
      const { searchQuery, sortedAndSearchedPosts } = useSearch(sortedPosts)

        return { 
            posts,
            totalPage,
            isPostLoading, 
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts
        }
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
  