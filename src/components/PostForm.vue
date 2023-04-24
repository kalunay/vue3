<template>
    <form action="" @submit.prevent>
      <my-input 
      v-model="post.title" 
      v-focus
      type="text"
      />
      <my-input 
      v-model="post.body" 
      v-focus
      type="text"
      />
      <button @click="createPost">Add</button>
    </form>
</template>
<script>
export default {
    data(){
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPost(){
            this.post.id = Date.now()
            this.$emit('create', this.post)
            this.post = {
                'title': '',
                'body': ''
            }
        }
    }
}
</script>
<style>

</style>