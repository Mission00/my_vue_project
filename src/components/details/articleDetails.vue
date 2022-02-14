<template>
    <div class="articles-area">
        <el-card style="text-align: left;width: 990px;margin: 35px auto 0 auto">
            <div>
            <span style="font-size: 20px"><strong>{{article.articleTitle}}</strong></span>
            <el-divider content-position="left">{{article.articleDate}}</el-divider>
            <div class="markdown-body">
                <div v-html="article.articleContentHtml"></div>
            </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            article:{},
        }
    },
    created(){
        this.getArticleById()
    },
    methods:{
        getArticleById(){
            var id = this.$route.query.id
            console.log(id)
            
            this.$axios.get('/getArticle',{
                params:{
                    id:id
                }
            }).then(resp=>{
                if(resp.status==200){
                    this.article = resp.data
                    console.log(this.article)
                }
            })
        }
    }
}
</script>

<style>

</style>