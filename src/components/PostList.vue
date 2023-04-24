<template>
    <div v-if="posts.length > 0">
        <transition-group name="posts-list">
            <post-item 
                v-for="post in posts" 
                :post="post" 
                :key="post.id" 
                @remove="$emit('remove', post)"
            />
        </transition-group>
    </div>
    <h2 v-else>Empty</h2>
</template>
<script>
import PostItem from './PostItem.vue';
export default {
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    components: {
        PostItem
    }
}
</script>
<style>
.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 1s ease;
}
.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.posts-list-move {
  transition: transform 0.8s ease;
}


</style>