import axios from 'axios'
import { ref, onMounted } from 'vue'

export default function usePosts(limit) {
    const posts = ref([])
    const totalPage = ref(0)
    const isPostLoading = ref(true)
    const fetching = async() => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            })
            totalPage.value = Math.ceil(res.headers['x-total-count'] / limit)
            posts.value = res.data
          } catch (error) {
            console.log('Error')
          } finally{
            isPostLoading.value = false
          }
    },
    onMounted(fetching)
    return {
        posts, isPostLoading, totalPage
    }
}