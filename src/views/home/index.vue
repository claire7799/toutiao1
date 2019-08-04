<template>
        <el-container class="wrapper">
            <el-aside :width="isCollapse?'64px':'200px'" class="aside" >
                <div class="logo" :class="{miniLogo:isCollapse}"></div>
                  <el-menu
                    :default-active="$route.path"
                     background-color="#002033"
                    text-color="#fff"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    router
                    active-text-color="#ffd04b">
                    <el-menu-item index="/">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="/article">
                    <i class="el-icon-document"></i>
                    <span slot="title">内容管理</span>
                    </el-menu-item>
                    <el-menu-item index="/image">
                    <i class="el-icon-picture"></i>
                    <span slot="title">素材管理</span>
                    </el-menu-item>
                    <el-menu-item index="/publish">
                    <i class="el-icon-upload"></i>
                    <span slot="title">发布文章</span>
                    </el-menu-item>
                    <el-menu-item index="/comment">
                    <i class="el-icon-chat-dot-round"></i>
                    <span slot="title">评论管理</span>
                    </el-menu-item>
                    <el-menu-item index="/fans">
                    <i class="el-icon-present"></i>
                    <span slot="title">粉丝管理</span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                    <i class="el-icon-setting"></i>
                    <span slot="title">个人设置</span>
                    </el-menu-item>
                 </el-menu>

            </el-aside>
            <el-container>
            <el-header>

                <span class="el-icon-s-fold" @click="toggoleMenu()"></span>
                <span class="text">江苏传智播客科技教育有限公司</span>

                <el-dropdown>
                    <span class="el-dropdown-link">
                    <img src="../../assets/images/avatar.jpg" alt="">
                     当前用户姓名
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <i class="el-icon-setting"></i>
                            个人设置
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <i class="el-icon-unlock"></i>
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            </el-container>
        </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    toggoleMenu () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less">
.wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    .el-aside {
    background: #002033;
    .logo{
        width: 100%;
        height: 60px;
        background: #002244 url(../../assets/images/logo_admin.png) no-repeat center/140px auto;
    }
    .miniLogo{
        background-image:url(../../assets/images/logo_admin_01.png);
        background-size: 36px;
    }
    .el-menu{
    border-right: none;
    }
    }
    .el-header{
        border-bottom: 1px solid #DDDDDD;
        line-height: 60px;
        .el-icon-s-fold{
            font-size: 26px;
            vertical-align: middle;
        }
        .text{
            vertical-align: middle;
            margin-left: 10px;
        }
        .el-dropdown{
            float:right;
            img{
                width:30px;
                height: 30px;
                vertical-align: middle;
                margin-right: 10px;
            }
        }
    }
}
</style>
