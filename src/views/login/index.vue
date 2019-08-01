<template>
    <div class="container">
        <el-card class="card">
            <img src="../../assets/images/logo_index.png">
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='less'>
.container{
    position: absolute;
    width: 100%;
    height: 100%;
    background:url(../../assets/images/login_bg.jpg) no-repeat center / cover
}
.card{
    position: absolute;
    width: 400px;
    height: 300px;
    left: 50%;
    top:50%;
    transform: translate(-50%,-60%);
    img{
        display: block;
        width: 300px;
        margin:0 auto;
    }
}

</style>
