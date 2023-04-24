<template>
    <div class="post">
        <div><b>Name:</b> {{ post.title }}</div>
        <div><b>Description:</b> {{ post.body }}</div>
        <my-button 
        @click="$emit('remove', post)"
        class="btn">Delete</my-button>
        <my-button @click="$router.push(`/posts/${post.id}`)" class="btn">Open</my-button>
    </div>
</template>

<script>
export default{
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>
<style>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin: 15px 0;
}
</style>